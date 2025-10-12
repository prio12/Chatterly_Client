/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router';
import DefaultProfilePIcture from '../profile/DefaultProfilePIcture';
import { useEffect, useState } from 'react';

const FriendsList = ({
  myConnections = [],
  activeConnections = [],
  handleInitiateChat,
  isSmall,
  filteredFriendsList = [],
}) => {
  const [margedConnections, setMargedConnections] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const activeIds = new Set(
      activeConnections.map((con) => con?.myConnection?._id)
    );

    const margedConn = [
      ...activeConnections.map((conn) => ({ ...conn, status: 'active' })),
      ...myConnections.filter(
        (conn) => !activeIds.has(conn?.myConnection?._id)
      ),
    ];

    if (margedConn?.length) {
      setMargedConnections(margedConn);
    }
  }, [activeConnections, myConnections]);

  const handleOpenChat = (user) => {
    if (isSmall) {
      navigate(`/chats/${user?.uid}`);
    } else {
      handleInitiateChat(user);
    }
  };

  useEffect(() => {
    if (filteredFriendsList?.length > 0) {
      setMargedConnections(filteredFriendsList);
    }
  }, [filteredFriendsList]);

  return (
    <div className="w-full flex items-center gap-5 overflow-x-auto my-5 p-5 no-scrollbar bg-slate-100 ">
      {margedConnections?.map((conn) => (
        <div key={conn?.myConnection?._id}>
          <div
            className={`avatar  cursor-pointer ${
              conn?.status === 'active' ? 'online' : 'offline'
            }`}
            onClick={() => handleOpenChat(conn?.myConnection)}
          >
            <div className="w-12 rounded-full">
              {conn?.myConnection?.profilePicture ? (
                <img src={conn?.myConnection?.profilePicture} />
              ) : (
                <DefaultProfilePIcture />
              )}
            </div>
          </div>
          <p className="text-xs">{conn?.myConnection?.name}</p>
        </div>
      ))}
    </div>
  );
};

export default FriendsList;
