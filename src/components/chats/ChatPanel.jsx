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

  const loaderRef = useRef(null);
  const [page, setPage] = useState(1);
  const limit = 7;

  const { data, isLoading, isError, isFetching } = useGetMessagesQuery(
    {
      user1: userProfile?.payload._id || loggedInUserId,
      user2: selectedUserData?._id || clickedUser?._id,
      page,
      limit,
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
  }, [conversationId, socket]);

  useEffect(() => {
    if (!data?.messages) return;
    setMessages((prev) => {
      // avoid duplicate messages when switching pages
      const ids = new Set(prev.map((m) => m._id));
      const newOnes = data.messages.filter((m) => !ids.has(m._id));
      return [...prev, ...newOnes]; // prepend older messages
    });
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

  //observing loaderRef to implement infinite scroller

  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && data?.hasMore && !isFetching) {
          setPage((prev) => prev + 1);
        }
      },
      {
        threshold: 0,
      }
    );

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [data?.hasMore, isFetching]);

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
        <div
          ref={loaderRef}
          className="h-10 flex justify-center bg-green-500 items-center"
        >
          {/* {isFetching && (
              <span className="text-gray-500">Loading more...</span>
            )} */}
        </div>
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
