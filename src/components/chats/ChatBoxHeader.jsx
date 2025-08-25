/* eslint-disable react/prop-types */
import { IoIosCall, IoIosVideocam, IoMdMore } from 'react-icons/io';
import DefaultProfilePIcture from '../profile/DefaultProfilePIcture';

const ChatBoxHeader = ({ selectedUserData, activeConnections }) => {
  //figuring out if the selected user is online
  let onlineStatus = activeConnections?.some((connection) =>
    connection?.myConnection?.uid.includes(selectedUserData?.uid)
  );
  return (
    <div className="flex items-center justify-between border-b pb-5">
      <div className="flex items-center gap-5">
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
      <div className="flex items-center gap-3 cursor-pointer">
        <div className="flex items-center justify-center text-xl bg-blue-100 rounded-full w-10 h-10 text-blue-500 hover:bg-blue-500 hover:text-white">
          <IoIosCall />
        </div>
        <div className="flex items-center justify-center text-xl bg-blue-100 rounded-full w-10 h-10 text-blue-500 hover:bg-blue-500 hover:text-white">
          <IoIosVideocam />
        </div>
        <div className="flex items-center justify-center text-xl bg-blue-100 rounded-full w-10 h-10 text-blue-500 hover:bg-blue-500 hover:text-white">
          <IoMdMore />
        </div>
      </div>
    </div>
  );
};

export default ChatBoxHeader;
