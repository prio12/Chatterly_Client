/* eslint-disable react/prop-types */
import { IoIosCall, IoIosVideocam, IoMdMore } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import DefaultProfilePIcture from '../profile/DefaultProfilePIcture';
import { useState } from 'react';

const ChatBoxHeader = ({ selectedUserData, activeConnections }) => {
  const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);

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
        <div className="flex items-center justify-center text-xl bg-blue-100 rounded-full w-10 h-10 text-blue-500 hover:bg-blue-500 hover:text-white">
          <IoIosCall />
        </div>
        <div className="flex items-center justify-center text-xl bg-blue-100 rounded-full w-10 h-10 text-blue-500 hover:bg-blue-500 hover:text-white">
          <IoIosVideocam />
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
              <button className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors">
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
