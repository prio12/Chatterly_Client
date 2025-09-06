import { useDispatch, useSelector } from 'react-redux';
import SearchBox from '../components/chats/SearchBox';
import useBreakpoint from '../hooks/useBreakpoint';
import { useUserInfoByUidQuery } from '../redux/api/users/usersApi';
import { useGetMyConnectionsQuery } from '../redux/api/connections/connectionsApi';
import { useContext, useEffect, useState } from 'react';
import ChatsSmallScreenFallback from '../components/chats/ChatsSmallScreenFallback';
import SocketContext from '../context/SocketContext';
import ChatConnectionsContent from '../components/chats/ChatConnectionsContent';
import ChatPanel from '../components/chats/ChatPanel';
import {
  setActiveConnections,
  setMyConnections,
  setUserProfile,
} from '../redux/features/chat/chatSlice';
import { useGetUserConversationQuery } from '../redux/api/messaging/messagingApi';

const Chats = () => {
  //checking screen size with manual hook
  const isSmall = useBreakpoint();
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  //here chatLists will be fetched
  const [chatLists, setChatLists] = useState([]);

  const { currentUser } = useSelector((state) => state.loggedInUser);
  const { activeConnections } = useSelector((state) => state.chat);
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

  //fetching chatList
  const { data: userConversations } = useGetUserConversationQuery(
    { id: currentlyLoggedInUserData?._id },
    { skip: !currentlyLoggedInUserData?._id, refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (userConversations?.conversations?.length > 0) {
      setChatLists(userConversations?.conversations);
    }
  }, [userConversations?.conversations]);

  useEffect(() => {
    if (!socket) return;

    socket.on('conversationUpdated', (conversation) => {
      setChatLists((prev) => {
        const filtered = prev.filter((c) => c._id !== conversation?._id);
        console.log('filtered', filtered);
        return [conversation, ...filtered];
      });
    });
  }, [socket]);

  //extract myConnections
  const myConnections = myConnectionsData?.myConnections;

  //storing user profile in redux store to avoid fetching multiple times regarding chat feature
  useEffect(() => {
    if (currentlyLoggedInUserData) {
      dispatch(setUserProfile(currentlyLoggedInUserData));
    }
  }, [currentlyLoggedInUserData, dispatch]);

  //storing my connections data in redux store for using it for sm screen
  useEffect(() => {
    if (myConnections?.length) {
      dispatch(setMyConnections(myConnections));
    }
  }, [dispatch, myConnections]);

  useEffect(() => {
    if (!socket) return;

    const refreshActiveConnections = () => {
      if (socket.connected && myConnections?.length > 0) {
        const friendsUid = myConnections.map((c) => c.myConnection?.uid);

        socket.emit('activeConnections', friendsUid, (activeConnectionsUid) => {
          const activeConnections = myConnections.filter((c) =>
            activeConnectionsUid.includes(c.myConnection.uid)
          );
          // setActiveConnections(activeConnections);
          dispatch(setActiveConnections(activeConnections));
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
  }, [socket, myConnections, dispatch]);

  //select a friend to render the chat screen with the friend info, chat box(previous chats), input field
  const [isSelected, setIsSelected] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState();

  //handle selecting a connection to initiate chat
  const handleInitiateChat = (userData) => {
    setIsSelected(true);
    setSelectedUserData(userData);
  };

  if (isSmall) {
    return (
      <div>
        <ChatsSmallScreenFallback
          chatLists={chatLists}
          myConnections={myConnections}
          activeConnections={activeConnections}
          isSmall={isSmall}
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
        <ChatConnectionsContent
          chatLists={chatLists}
          myConnections={myConnections}
          activeConnections={activeConnections}
          handleInitiateChat={handleInitiateChat}
          isSmall={isSmall}
        />
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
          <ChatPanel selectedUserData={selectedUserData} />
        )}
      </div>
    </div>
  );
};

export default Chats;
