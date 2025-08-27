/* eslint-disable react/prop-types */
import { Link } from 'react-router';
import DefaultProfilePIcture from '../profile/DefaultProfilePIcture';

const FriendsList = ({
  myConnections,
  activeConnections,
  handleInitiateChat,
  isSmall,
}) => {
  return (
    <div className="w-full flex items-center gap-5 overflow-x-auto my-5 p-5 no-scrollbar bg-slate-100 ">
      {activeConnections?.length > 0
        ? activeConnections?.map((connection) => (
            <div key={connection?._id} className="bg-white p-3">
              {isSmall ? (
                <Link to={`/chats/${connection?.myConnection?.uid}`}>
                  <div className="avatar online cursor-pointer">
                    <div className="w-12 rounded-full">
                      {connection?.myConnection?.profilePicture ? (
                        <img src={connection?.myConnection?.profilePicture} />
                      ) : (
                        <DefaultProfilePIcture />
                      )}
                    </div>
                  </div>
                </Link>
              ) : (
                <div
                  onClick={() => handleInitiateChat(connection?.myConnection)}
                  className="avatar online cursor-pointer"
                >
                  <div className="w-12 rounded-full">
                    {connection?.myConnection?.profilePicture ? (
                      <img src={connection?.myConnection?.profilePicture} />
                    ) : (
                      <DefaultProfilePIcture />
                    )}
                  </div>
                </div>
              )}
              <p className="mt-2 font-semibold text-sm">
                {connection?.myConnection?.name}
              </p>
            </div>
          ))
        : myConnections?.map((connection) => (
            <div key={connection?._id} className="bg-white p-3">
              {isSmall ? (
                <Link to={`/chats/${connection?.myConnection?.uid}`}>
                  {' '}
                  <div className="avatar offline cursor-pointer">
                    <div className="w-12 rounded-full">
                      {connection?.myConnection?.profilePicture ? (
                        <img src={connection?.myConnection?.profilePicture} />
                      ) : (
                        <DefaultProfilePIcture />
                      )}
                    </div>
                  </div>
                </Link>
              ) : (
                <div
                  onClick={() => handleInitiateChat(connection?.myConnection)}
                  className="avatar offline cursor-pointer"
                >
                  <div className="w-12 rounded-full">
                    {connection?.myConnection?.profilePicture ? (
                      <img src={connection?.myConnection?.profilePicture} />
                    ) : (
                      <DefaultProfilePIcture />
                    )}
                  </div>
                </div>
              )}
              <p className="mt-2 font-semibold text-sm">
                {connection?.myConnection?.name}
              </p>
            </div>
          ))}
    </div>
  );
};

export default FriendsList;
