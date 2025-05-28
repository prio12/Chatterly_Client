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
import { FaArrowRight } from 'react-icons/fa';
import DefaultProfilePIcture from '../components/profile/DefaultProfilePIcture';

const Chats = () => {
  //checking screen size with manual hook
  const isSmall = useBreakpoint();

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

  //left side content for md and lg screen
  let leftSideContent;

  if (chatLists?.length === 0 && myConnections?.length === 0) {
    leftSideContent = (
      <div className="my-8">
        <div className="my-5 text-gray-600 font-semibold">
          <p>Seems like you have no connections yet!</p>
          <p>Go make some friends.</p>
        </div>
        <Link to="/connections">
          <FaArrowRight className="text-2xl text-blue-600" />{' '}
        </Link>
      </div>
    );
  } else if (chatLists?.length === 0 && myConnections?.length > 0) {
    leftSideContent = (
      <div>
        <div className="flex flex-col items-center justify-center text-center p-5">
          <p className="text-gray-600 text-lg mb-2">
            Looks like you haven’t started a chat yet.
          </p>
          <p className="text-gray-500">
            Select a friend from your list to say hello and start a
            conversation.
          </p>
        </div>
        <div className="w-full flex items-center gap-5 overflow-x-auto my-5 p-5 no-scrollbar bg-slate-100 ">
          {myConnections?.length > 0 &&
            myConnections?.map((connection) => (
              <div key={connection?._id} className="bg-white p-3">
                <div className="avatar">
                  <div className="w-16 rounded-full">
                    {connection?.myConnection?.profilePicture ? (
                      <img src={connection?.myConnection?.profilePicture} />
                    ) : (
                      <DefaultProfilePIcture />
                    )}
                  </div>
                </div>
                <p className="mt-2 font-semibold">
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

  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="col-span-1 bg-white p-5 hidden md:block">
        {/* active chats for md and lg screen */}
        <div className="border-b hidden md:block ">
          <h3 className="text-xl font-bold mb-5">
            Active Chats{' '}
            <span className="bg-blue-100 rounded-full text-blue-600 px-2">
              6
            </span>
          </h3>
        </div>
        <SearchBox />
        {leftSideContent}
        {/* <ChatLists /> */}
      </div>
      <div
        style={{ height: 'var(--chat-height)' }}
        className="md:col-span-2 col-span-3 bg-white flex flex-col"
      >
        {/* Chat Header */}
        <div className="h-20 mb-5">
          {' '}
          {/* Adjust height as needed */}
          <ChatBoxHeader />
        </div>

        {/* Chat Messages - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <ChatMessages />
        </div>

        {/* Chat Footer */}
        <div className="h-20 border-t mt-5">
          {' '}
          {/* Adjust height as needed */}
          <ChatFooter />
        </div>
      </div>
    </div>
  );
};

export default Chats;
