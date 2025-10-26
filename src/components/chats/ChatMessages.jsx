/* eslint-disable no-undef */
import { useSelector } from 'react-redux';
import DefaultProfilePIcture from '../profile/DefaultProfilePIcture';
import { formatDistanceToNow } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { LiaCheckDoubleSolid, LiaCheckSolid } from 'react-icons/lia';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';

/* eslint-disable react/prop-types */
const ChatMessages = ({ message }) => {
  const { currentUser } = useSelector((state) => state.loggedInUser);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

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
          {/* CHANGED: Removed border, kept clean icon design */}
          <div className="relative group">
            <div
              onClick={() => setIsOptionsOpen(!isOptionsOpen)}
              className="chat-bubble bg-gray-200 text-black cursor-pointer hover:bg-gray-300 transition-colors"
            >
              <p>{message?.text}</p>
            </div>
            {/* CHANGED: Clean icon without border/background */}
            {isOptionsOpen && (
              <div className="absolute top-1/2 -translate-y-1/2 -right-10 flex items-center gap-2 z-10">
                <button className="p-1 hover:scale-125 transition-transform">
                  <MdDelete className="text-red-500 text-xl" />
                </button>
              </div>
            )}
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
          {/* CHANGED: Removed border, kept clean icon design */}
          <div className="relative group">
            <div className="chat-bubble bg-blue-500 text-white flex items-end gap-2">
              <p
                onClick={() => setIsOptionsOpen(!isOptionsOpen)}
                className="cursor-pointer flex-1"
              >
                {message?.text}
              </p>

              {/* Sent */}
              {!seenStatus && message?.status === 'sent' && (
                <span className="flex-shrink-0">
                  <LiaCheckSolid />
                </span>
              )}

              {/* Delivered */}
              {!seenStatus && message?.status === 'delivered' && (
                <span className="flex-shrink-0">
                  <LiaCheckDoubleSolid />
                </span>
              )}

              {/* Seen */}
              {seenStatus && (
                <span className="flex-shrink-0">
                  <LiaCheckDoubleSolid className="text-cyan-200" />
                </span>
              )}
            </div>
            {/* CHANGED: Clean icons without border/background */}
            {isOptionsOpen && (
              <div className="absolute top-1/2 -translate-y-1/2 -left-20 flex items-center gap-2 z-10">
                <button className="p-1 hover:scale-125 transition-transform">
                  <MdModeEditOutline className="text-blue-500 text-xl" />
                </button>
                <button className="p-1 hover:scale-125 transition-transform">
                  <MdDelete className="text-red-500 text-xl" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
