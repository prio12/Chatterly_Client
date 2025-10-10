import { useSelector } from 'react-redux';
import DefaultProfilePIcture from '../profile/DefaultProfilePIcture';
import { formatDistanceToNow } from 'date-fns';
import { useEffect, useRef } from 'react';
import { LiaCheckDoubleSolid, LiaCheckSolid } from 'react-icons/lia';

/* eslint-disable react/prop-types */
const ChatMessages = ({ message }) => {
  const { currentUser } = useSelector((state) => state.loggedInUser);

  const isMe = message?.sender?.uid === currentUser;
  const seenStatus = message?.seenBy.some((user) => user?.uid !== currentUser);

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
          <div className="chat-bubble bg-blue-500 text-white relative flex items-end gap-5">
            <p>{message?.text}</p>

            {/* Sent */}
            {!seenStatus && message?.status === 'sent' && (
              <span>
                <LiaCheckSolid />
              </span>
            )}

            {/* Delivered */}
            {!seenStatus && message?.status === 'delivered' && (
              <span>
                {' '}
                <LiaCheckDoubleSolid />
              </span>
            )}

            {/* Seen */}
            {seenStatus && (
              <span>
                <LiaCheckDoubleSolid className="text-cyan-200" />
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
