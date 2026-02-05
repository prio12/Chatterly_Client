/* eslint-disable react/prop-types */
import { IoIosCall, IoIosVideocam, IoMdMore } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import DefaultProfilePIcture from '../profile/DefaultProfilePIcture';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useDeleteAllMessagesMutation } from '../../redux/api/messaging/messagingApi';

const ChatBoxHeader = ({
  selectedUserData,
  activeConnections,
  conversationId,
}) => {
  const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);
  const [deleteAllMessages] = useDeleteAllMessagesMutation();

  const { userProfile } = useSelector((state) => state.chat);

  const handleDeleteAllMessages = async () => {
    const confirmed = window.confirm(
      "Are you sure to deleted all messages? It can't be undone"
    );

    if (confirmed) {
      try {
        const response = await deleteAllMessages({
          userId: userProfile?._id,
          uid: userProfile?.uid,
          conversationId: conversationId,
        });

        if (response?.data?.success) {
          setIsMoreOptionsOpen(false);
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.message);
        setIsMoreOptionsOpen(false);
      }
    }
  };

  const handleComingSoonFeature = (featureName) => {
    toast(`${featureName} feature coming soon! 🚀`, {
      icon: '⏳',
      duration: 2000,
    });
  };

  //figuring out if the selected user is online
  let onlineStatus = activeConnections?.some((connection) =>
    connection?.myConnection?.uid.includes(selectedUserData?.uid)
  );

  return (
    <div className="flex items-center justify-between border-b pb-5">
      <div className="flex items-center gap-3">
        <div className="avatar">
          <div className="w-14 rounded-full">
            {selectedUserData?.profilePicture ? (
              <img src={selectedUserData?.profilePicture} />
            ) : (
              <DefaultProfilePIcture />
            )}
          </div>
        </div>
        <div>
          <h5 className=" font-bold">{selectedUserData?.name}</h5>
          {onlineStatus ? (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <p className="text-sm">Online</p>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <p className="text-sm">Offline</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 cursor-pointer">
        {/* Audio Call - Coming Soon */}
        <div
          onClick={() => handleComingSoonFeature('Audio Call')}
          className="relative flex items-center justify-center text-xl bg-gray-100 rounded-full w-10 h-10 text-gray-400 cursor-not-allowed opacity-60"
          title="Coming Soon"
        >
          <IoIosCall />
          <span className="absolute -top-1 -right-1 bg-yellow-400 text-xs px-1.5 py-0.5 rounded-full text-gray-800 font-semibold text-[10px]">
            Soon
          </span>
        </div>

        {/* Video Call - Coming Soon */}
        <div
          onClick={() => handleComingSoonFeature('Video Call')}
          className="relative flex items-center justify-center text-xl bg-gray-100 rounded-full w-10 h-10 text-gray-400 cursor-not-allowed opacity-60"
          title="Coming Soon"
        >
          <IoIosVideocam />
          <span className="absolute -top-1 -right-1 bg-yellow-400 text-xs px-1.5 py-0.5 rounded-full text-gray-800 font-semibold text-[10px]">
            Soon
          </span>
        </div>

        <div className="relative">
          <div
            onClick={() => setIsMoreOptionsOpen(!isMoreOptionsOpen)}
            className="flex items-center justify-center text-xl bg-blue-100 rounded-full w-10 h-10 text-blue-500 hover:bg-blue-500 hover:text-white"
          >
            <IoMdMore />
          </div>

          {/* Delete All Messages Option */}
          {isMoreOptionsOpen && (
            <div
              className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-2
             px-3 w-48 z-20 cursor-pointer"
            >
              <button
                onClick={handleDeleteAllMessages}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
              >
                <MdDelete className="text-xl" />
                <span className="text-sm font-medium">Delete all messages</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBoxHeader;
