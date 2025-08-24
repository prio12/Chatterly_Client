import { useSelector } from 'react-redux';
import ChatBoxHeader from '../components/chats/ChatBoxHeader';
import ChatFooter from '../components/chats/ChatFooter';
import ChatLists from '../components/chats/ChatLists';
import ChatMessages from '../components/chats/ChatMessages';
import SearchBox from '../components/chats/SearchBox';
import useBreakpoint from '../hooks/useBreakpoint';
import { useUserInfoByUidQuery } from '../redux/api/users/usersApi';
import { useGetMyConnectionsQuery } from '../redux/api/connections/connectionsApi';
import { Link } from 'react-router';
import { FaHandPointRight } from 'react-icons/fa';
import DefaultProfilePIcture from '../components/profile/DefaultProfilePIcture';
import { useContext, useEffect, useState } from 'react';
import ChatsSmallScreenFallback from '../components/chats/ChatsSmallScreenFallback';
import SocketContext from '../context/SocketContext';

const Chats = () => {
  //checking screen size with manual hook
  const isSmall = useBreakpoint();
  const socket = useContext(SocketContext);

  //assuming there's no active friends
  const [activeConnections, setActiveConnections] = useState([]);

  //here chatLists will be fetched
  const chatLists = [];
  // const connections = [1, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];

  const { currentUser } = useSelector((state) => state.loggedInUser);
  const { data } = useUserInfoByUidQuery(currentUser);

  //extract the currentlyLoggedIn user from db
  const currentlyLoggedInUserData = data?.user;

  //fetch all connections of the loggedInUser
  const { data: myConnectionsData } = useGetMyConnectionsQuery(
    currentlyLoggedInUserData?._id,
    {
      refetchOnMountOrArgChange: true,
      skip: !currentlyLoggedInUserData?._id,
    }
  );

  //extract myConnections
  const myConnections = myConnectionsData?.myConnections;

  // useEffect(() => {
  //   if (socket && socket.connected && myConnections?.length > 0) {
  //     //getting uid from connections
  //     const friendsUid = myConnections?.map(
  //       (connection) => connection?.myConnection?.uid
  //     );

  //     //emitting ActiveFriends event
  //     socket.emit('activeConnections', friendsUid, (activeConnectionsUid) => {
  //       const activeConnections = myConnections.filter((connection) =>
  //         activeConnectionsUid.includes(connection.myConnection.uid)
  //       );
  //       //here setting active connections
  //       setActiveConnections(activeConnections);
  //     });
  //   }
  // }, [socket, myConnections]);
  useEffect(() => {
    if (!socket) return;

    const refreshActiveConnections = () => {
      if (socket.connected && myConnections?.length > 0) {
        const friendsUid = myConnections.map((c) => c.myConnection?.uid);

        socket.emit('activeConnections', friendsUid, (activeConnectionsUid) => {
          console.log(
            'getting activeConnectionsUid from server successfully!',
            activeConnectionsUid
          );
          const activeConnections = myConnections.filter((c) =>
            activeConnectionsUid.includes(c.myConnection.uid)
          );
          setActiveConnections(activeConnections);
        });
      }
    };

    // first run when page loads
    refreshActiveConnections();

    // run whenever server notifies that users changed
    socket.on('usersUpdated', refreshActiveConnections);

    return () => {
      socket.off('usersUpdated', refreshActiveConnections);
    };
  }, [socket, myConnections]);

  //select a friend to render the chat screen with the friend info, chat box(previous chats), input field
  const [isSelected, setIsSelected] = useState(false);
  //left side content for md and lg screen
  let leftSideContent;

  if (chatLists?.length === 0 && myConnections?.length === 0) {
    leftSideContent = (
      <div className="my-8">
        <div className="my-5 text-gray-600 font-semibold">
          <p className="mb-5 ">
            Looks like you haven’t made any friends yet make some friends to
            initiate chats{' '}
          </p>
        </div>
        <div className="flex items-center gap-5">
          <p className="text-blue-600 font-semibold">Connect with People</p>
          <Link to="/connections">
            <FaHandPointRight className="text-2xl text-blue-600" />{' '}
          </Link>
        </div>
      </div>
    );
  } else if (chatLists?.length === 0 && myConnections?.length > 0) {
    leftSideContent = (
      <div>
        <div className="flex flex-col items-center justify-center text-center p-5">
          <p className="text-gray-600  mb-2 text-sm font-semibold">
            Looks like you haven’t started a chat yet.
          </p>
          <p className="text-gray-500">
            Select a friend from your list to say hello and start a
            conversation.
          </p>
        </div>
        <div className="w-full flex items-center gap-5 overflow-x-auto my-5 p-5 no-scrollbar bg-slate-100 ">
          {activeConnections?.length > 0
            ? activeConnections?.map((connection) => (
                <div key={connection?._id} className="bg-white p-3">
                  <div className="avatar online">
                    <div className="w-12 rounded-full">
                      {connection?.myConnection?.profilePicture ? (
                        <img src={connection?.myConnection?.profilePicture} />
                      ) : (
                        <DefaultProfilePIcture />
                      )}
                    </div>
                  </div>
                  <p className="mt-2 font-semibold text-sm">
                    {connection?.myConnection?.name}
                  </p>
                </div>
              ))
            : myConnections?.map((connection) => (
                <div key={connection?._id} className="bg-white p-3">
                  <div className="avatar offline">
                    <div className="w-12 rounded-full">
                      {connection?.myConnection?.profilePicture ? (
                        <img src={connection?.myConnection?.profilePicture} />
                      ) : (
                        <DefaultProfilePIcture />
                      )}
                    </div>
                  </div>
                  <p className="mt-2 font-semibold text-sm">
                    {connection?.myConnection?.name}
                  </p>
                </div>
              ))}
        </div>
      </div>
    );
  } else {
    leftSideContent = <ChatLists />;
  }

  if (isSmall) {
    return (
      <div>
        <ChatsSmallScreenFallback
          chatLists={chatLists}
          myConnections={myConnections}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-5">
      {/* left side chat content for the chat page starts from here */}
      <div className="col-span-1 bg-white p-5 hidden md:block">
        <div className="border-b hidden md:block ">
          <h3 className="text-xl font-bold mb-5">
            Active Chats{' '}
            <span className="bg-blue-100 rounded-full text-blue-600 px-2">
              {activeConnections?.length}
            </span>
          </h3>
        </div>
        <SearchBox />
        {leftSideContent}
        {/* left side Content ends here */}
      </div>
      <div className="col-span-2 ">
        {/* checking if the user has selected a friend to initiate chat or not */}
        {!isSelected ? (
          <div className="w-1/2 mx-auto mt-24">
            <h3 className="font-semibold ">
              Select a Friend to initiate Chat!
            </h3>
          </div>
        ) : (
          <div className="h-[var(--chat-height)]  bg-red-500 flex flex-col">
            <div className="h-20 bg-white  p-4">
              <ChatBoxHeader />
            </div>
            <div className="flex-1 overflow-y-auto bg-white p-4">
              <ChatMessages />
            </div>
            <div className="h-20 bg-white  p-4">
              <ChatFooter />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chats;
