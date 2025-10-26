/* eslint-disable no-undef */
import { useSelector } from 'react-redux';
import DefaultProfilePIcture from '../profile/DefaultProfilePIcture';
import { formatDistanceToNow } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { LiaCheckDoubleSolid, LiaCheckSolid } from 'react-icons/lia';
import { MdDelete, MdModeEditOutline, MdClose } from 'react-icons/md';
import { useEditMessageMutation } from '../../redux/api/messaging/messagingApi';
import toast from 'react-hot-toast';

/* eslint-disable react/prop-types */
const ChatMessages = ({ message }) => {
  const { currentUser } = useSelector((state) => state.loggedInUser);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedMessage, setEditedMessage] = useState('');

  const [editMessage] = useEditMessageMutation();

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

  const handleEditMessage = async (message) => {
    if (message?.sender?.uid !== currentUser) return;

    const trimmedEditedMessage = editedMessage.trim();
    if (trimmedEditedMessage === message?.text) {
      return setIsEditModalOpen(false);
    }

    try {
      const response = await editMessage({
        message,
        editedMessage: trimmedEditedMessage,
      }).unwrap();

      if (response?.success) {
        setIsEditModalOpen(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

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
          <div className="relative group">
            <div
              onClick={() => setIsOptionsOpen(!isOptionsOpen)}
              className="chat-bubble bg-gray-200 text-black cursor-pointer hover:bg-gray-300 transition-colors"
            >
              <p>{message?.text}</p>
            </div>
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
            {isOptionsOpen && (
              <div className="absolute top-1/2 -translate-y-1/2 -left-20 flex items-center gap-2 z-10">
                {/* CHANGED: Added onClick to open edit modal */}
                <button
                  onClick={() => {
                    setIsEditModalOpen(true);
                    setIsOptionsOpen(false);
                  }}
                  className="p-1 hover:scale-125 transition-transform"
                >
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

      {/* ADDED: Edit Message Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 animate-fadeIn">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">
                Edit Message
              </h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <MdClose className="text-2xl" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <textarea
                onChange={(e) => setEditedMessage(e.target.value)}
                defaultValue={message?.text}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows="4"
                placeholder="Edit your message..."
              />
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-200">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={editedMessage.trim().length === 0}
                onClick={() => handleEditMessage(message)}
                className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors ${
                  editedMessage.trim().length === 0 &&
                  'bg-gray-500 hover:bg-gray-700 cursor-not-allowed'
                }`}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
