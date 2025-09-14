import { useSelector } from 'react-redux';
import DefaultProfilePIcture from '../profile/DefaultProfilePIcture';
import { formatDistanceToNow } from 'date-fns';
import { useEffect, useRef } from 'react';

/* eslint-disable react/prop-types */
const ChatMessages = ({ message }) => {
  const { currentUser } = useSelector((state) => state.loggedInUser);

  const isMe = message?.sender?.uid === currentUser;

  // Example status logic
  // const status = message?.seen ? 'seen' : 'delivered';

  // Converts createdAt timestamp into a human-readable relative time format.
  const timeAgo = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  // 🔹 Ref for auto-scrolling to bottom
  const messageEndRef = useRef(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  return (
    <div>
      {!isMe ? (
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              {message?.sender?.profilePicture ? (
                <img alt="profile" src={message?.sender?.profilePicture} />
              ) : (
                <DefaultProfilePIcture />
              )}
            </div>
          </div>
          <div className="chat-header">
            <time className="text-xs opacity-50 ml-2">
              {timeAgo(message?.updatedAt)}
            </time>
          </div>
          <div className="chat-bubble bg-gray-200 text-black">
            {message?.text}
          </div>
        </div>
      ) : (
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              {message?.sender?.profilePicture ? (
                <img alt="profile" src={message?.sender?.profilePicture} />
              ) : (
                <DefaultProfilePIcture />
              )}
            </div>
          </div>
          <div className="chat-header">
            <time className="text-xs opacity-50 ml-2">
              {timeAgo(message?.updatedAt)}
            </time>
          </div>
          <div className="chat-bubble bg-blue-500 text-white relative">
            {message?.text}
            <div className="absolute right-1 bottom-[-18px] flex items-center gap-1 text-xs opacity-70">
              <span>{message?.time || '12:46'}</span>
              {/* {status === 'seen' ? (
                <CheckCheck className="w-4 h-4 text-blue-500" />
              ) : (
                <Check className="w-4 h-4 text-gray-400" />
              )} */}
            </div>
          </div>
        </div>
      )}

      {/* 🔹 Invisible div used for auto scroll */}
      <div ref={messageEndRef} />
    </div>
  );
};

export default ChatMessages;
