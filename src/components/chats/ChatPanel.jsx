/* eslint-disable react/prop-types */
import { Link, useLocation, useParams } from 'react-router';
import ChatBoxHeader from './ChatBoxHeader';
import ChatFooter from './ChatFooter';
import ChatMessages from './ChatMessages';
import { useUserInfoByUidQuery } from '../../redux/api/users/usersApi';
import { useSelector } from 'react-redux';
import { useGetMessagesQuery } from '../../redux/api/messaging/messagingApi';
import DefaultProfilePIcture from '../profile/DefaultProfilePIcture';
import { CiLock } from 'react-icons/ci';
import { useContext, useEffect, useRef, useState } from 'react';
import SocketContext from '../../context/SocketContext';
import TypingIndicator from './TypingIndicator';

const ChatPanel = ({ selectedUserData, loggedInUserId }) => {
  //getting the uid from url
  const { uid } = useParams();
  const { pathname } = useLocation();
  const isChatPage = pathname.startsWith('/chats');

  const { activeConnections, myConnections } = useSelector(
    (state) => state.chat
  );
  const { userProfile } = useSelector((state) => state.chat);
  const socket = useContext(SocketContext);

  const { currentUser } = useSelector((state) => state.loggedInUser);

  //fetching loggedInUser data
  const { data: loggedInUserData } = useUserInfoByUidQuery(currentUser, {
    skip: !currentUser,
  });
  const loggedInUser = loggedInUserData?.user;

  //fetching the data of the user who was clicked to chat
  const { data: clickedUserData } = useUserInfoByUidQuery(uid, { skip: !uid });

  const clickedUser = clickedUserData?.user;

  const { data, isLoading, isError } = useGetMessagesQuery(
    {
      user1: loggedInUser?._id || loggedInUserId,
      user2: selectedUserData?._id || clickedUser?._id,
    },
    {
      skip: !selectedUserData?._id && !clickedUser?._id,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    }
  );

  let isConnected = myConnections?.some((connection) =>
    connection?.myConnection?.uid.includes(
      selectedUserData?.uid || clickedUser?.uid
    )
  );

  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const messageEndRef = useRef(null);

  useEffect(() => {
    setConversationId(data?.conversationId);
  }, [data?.conversationId]);
  // 🔹 Ref for auto-scrolling to bottom

  useEffect(() => {
    if (!conversationId) return;
    socket.emit('joinedRoom', conversationId);

    //emitting event to let server know that messages are read
    socket.emit('messagesRead', {
      conversationId,
      userId: userProfile?.payload._id || loggedInUserId,
    });

    return () => socket.emit('leaveRoom', conversationId);
  }, [conversationId, socket, loggedInUserId, userProfile?.payload._id]);

  //initially setting all messages
  useEffect(() => {
    const filteredMessages = data?.messages?.filter(
      (m) => !m?.deletedBy.includes(userProfile?.payload._id)
    );

    setMessages(filteredMessages);
  }, [data?.messages, userProfile?.payload._id]);

  //listen to the event newMessage by socket.io and update the Ui
  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    };

    socket.on('newMessage', handleNewMessage);

    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, [socket, messages]);

  //listen to the editedEvent by socket.io and update the ui
  useEffect(() => {
    if (!socket) return;
    const updateMessageUi = ({ updatedMessage }) => {
      setMessages((prev) =>
        prev.map((m) => (m._id === updatedMessage._id ? updatedMessage : m))
      );
    };

    socket.on('messageEdited', updateMessageUi);
    return () => socket.off('messageEdited', updateMessageUi);
  }, [socket]);

  //listen to messageDeleted event  and update the Ui
  useEffect(() => {
    if (!socket) return;

    const updateMessageUi = ({ updatedMessage }) => {
      //set the updated message first after deleting
      setMessages((prev) =>
        prev?.map((m) => (m?._id === updatedMessage?._id ? updatedMessage : m))
      );

      //now after update the  message , filter out based on the deletedBy
      setMessages((prev) =>
        prev?.filter((m) => !m?.deletedBy?.includes(userProfile?.payload._id))
      );
    };

    socket.on('messageDeleted', updateMessageUi);

    return () => {
      socket.off('messageDeleted', updateMessageUi);
    };
  }, [socket, userProfile?.payload._id]);

  //listen to deletedAllMessages event by socket.io and  set the message array to empty
  useEffect(() => {
    if (!socket) return;
    const updateMessageUi = (conversation) => {
      if (conversation?._id !== conversationId) return;
      setMessages([]);
    };
    socket.on('deletedAllMessages', updateMessageUi);

    return () => {
      socket.off('deletedAllMessages', updateMessageUi);
    };
  }, [socket, conversationId]);

  //listen to messagesReadUpdate event by socket.io and update messages's seenBy
  useEffect(() => {
    const handleMessagesReadUpdate = ({
      conversationId: incomingConvoId,
      userId,
    }) => {
      if (incomingConvoId === conversationId) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.seenBy.some((u) => u._id === userId)
              ? msg
              : { ...msg, seenBy: [...msg.seenBy, { _id: userId }] }
          )
        );
      }
    };

    socket.on('messagesReadUpdate', handleMessagesReadUpdate);
    return () => socket.off('messagesReadUpdate', handleMessagesReadUpdate);
  }, [conversationId, socket]);

  useEffect(() => {
    socket.on('messagesDeliveredUpdate', ({ userId, conversationIds }) => {
      const myConversationIsExit = conversationIds.includes(conversationId);

      if (
        !myConversationIsExit ||
        userId === userProfile?.payload._id ||
        loggedInUserId
      ) {
        return;
      }

      setMessages((prev) =>
        prev.map((msg) =>
          msg?.status === 'sent' ? { ...msg, status: 'delivered' } : msg
        )
      );
    });
  }, [socket, conversationId, userProfile?.payload._id, loggedInUserId]);

  selectedUserData?._id || clickedUser?._id;

  useEffect(() => {
    socket.on('userTyping', ({ userId }) => {
      const isTypingIndicatorReceiver =
        (selectedUserData?._id || clickedUser?._id) === userId;

      if (isTypingIndicatorReceiver) {
        setIsTyping(true);
      }
    });
    socket.on('userStopTyping', ({ userId }) => {
      const isTypingIndicatorReceiver =
        (selectedUserData?._id || clickedUser?._id) === userId;
      if (isTypingIndicatorReceiver) {
        setIsTyping(false);
      }
    });

    return () => {
      socket.off('userTyping');
      socket.off('userStopTyping');
    };
  }, [socket, selectedUserData?._id, clickedUser?._id]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  let messageContent;

  if (isLoading) {
    messageContent = <div>Loading...</div>;
  }

  if (!isLoading && isError) {
    <div>
      <h5>Something Went wrong!!</h5>
    </div>;
  }

  if (!isLoading && !isError && messages?.length === 0) {
    messageContent = (
      <div className=" mt-24 text-center">
        <div>
          <div className="avatar">
            <div className="w-20 rounded-full">
              {selectedUserData?.profilePicture ||
              clickedUser?.profilePicture ? (
                <img
                  src={
                    selectedUserData?.profilePicture ||
                    clickedUser?.profilePicture
                  }
                />
              ) : (
                <DefaultProfilePIcture />
              )}
            </div>
          </div>
          <h5 className="text-xl font-semibold">
            {selectedUserData?.name || clickedUser?.name}
          </h5>
          <p className="text-sm">{selectedUserData?.email} </p>
          {isConnected ? (
            <p className="text-xs my-1">
              You are connected with{' '}
              {selectedUserData?.name || clickedUser?.name}
            </p>
          ) : (
            <p className="text-xs my-1">
              You are not connected with{' '}
              {selectedUserData?.name || clickedUser?.name}
            </p>
          )}
          <Link
            className="btn  btn-md md:btn-sm rounded-md bg-blue-100 text-blue-500
               hover:bg-blue-500 hover:text-white my-2"
            to={`/profile/${selectedUserData?.uid || clickedUser?.uid}`}
          >
            View Profile
          </Link>
          <p className="mt-3 text-xs">
            <CiLock className="inline text-xs" /> Messages and calls are
            secured. Only people in this chat can read and listen to them
          </p>
        </div>
      </div>
    );
  }

  if (!isLoading && !isError && messages?.length > 0) {
    messageContent = messages.map((message) => (
      <ChatMessages
        key={message?._id}
        message={message}
        loggedInUserId={loggedInUserId}
      />
    ));
  }

  return (
    <div
      className={`${
        isChatPage ? 'h-[var(--chat-height)]' : 'h-3/4'
      }   flex flex-col`}
    >
      <div className="h-20 bg-white  p-4">
        <ChatBoxHeader
          conversationId={conversationId}
          selectedUserData={selectedUserData || clickedUser}
          activeConnections={activeConnections}
        />
      </div>
      <div className="flex-1 overflow-y-auto bg-white p-4">
        {messageContent}
        <div className="mt-5">
          {isTyping && (
            <TypingIndicator
              selectedUserData={selectedUserData || clickedUser}
              isChatPanel={true}
            />
          )}
        </div>
        <div ref={messageEndRef} />
      </div>
      <div className="h-20 bg-white  p-4">
        <ChatFooter
          selectedUserData={selectedUserData || clickedUser}
          loggedInUserId={loggedInUserId || userProfile?.payload._id}
        />
      </div>
    </div>
  );
};

export default ChatPanel;
