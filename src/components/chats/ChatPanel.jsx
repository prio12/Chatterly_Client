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
import { useContext, useEffect, useState } from 'react';
import SocketContext from '../../context/SocketContext';

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

  //fetching the data of the user who was clicked to chat
  const { data: clickedUserData } = useUserInfoByUidQuery(uid, { skip: !uid });

  const clickedUser = clickedUserData?.user;

  const { data, isLoading, isError } = useGetMessagesQuery(
    {
      user1: userProfile?.payload._id || loggedInUserId,
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

  useEffect(() => {
    setConversationId(data?.conversationId);
  }, [data?.conversationId]);

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

  useEffect(() => {
    setMessages(data?.messages);
  }, [data?.messages]);

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    };

    socket.on('newMessage', handleNewMessage);

    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, [socket, messages]);

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
      <ChatMessages key={message?._id} message={message} />
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
          selectedUserData={selectedUserData || clickedUser}
          activeConnections={activeConnections}
        />
      </div>
      <div className="flex-1 overflow-y-auto bg-white p-4">
        {messageContent}
      </div>
      <div className="h-20 bg-white  p-4">
        <ChatFooter
          selectedUserData={selectedUserData || clickedUser}
          loggedInUserId={loggedInUserId}
        />
      </div>
    </div>
  );
};

export default ChatPanel;
