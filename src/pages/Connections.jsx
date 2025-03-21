import LeftSideBar from '../components/common/LeftSideBar';
import RightSideBar from '../components/common/RightSideBar';
import ConnectionRequests from '../components/connections/ConnectionRequests';
import { useState } from 'react';
import ConnectionSuggestions from '../components/connections/ConnectionSuggestions';
import {
  useGetAllUsersQuery,
  useUserInfoByUidQuery,
} from '../redux/api/users/usersApi';
import { useSelector } from 'react-redux';

const Connections = () => {
  const [content, setContent] = useState('request');
  const { data: allUsersData, isLoading } = useGetAllUsersQuery();
  const { currentUser } = useSelector((state) => state.loggedInUser);
  const { data } = useUserInfoByUidQuery(currentUser);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  //suggested users
  const suggestedConnections = allUsersData.response;
  const currentlyLoggedInUserData = data?.user;

  let connectionButtons;

  if (content === 'request') {
    connectionButtons = (
      <div className="flex items-center gap-5 my-5">
        <button
          onClick={() => setContent('suggestions')}
          className={`btn  rounded bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white`}
        >
          Suggestions
        </button>
        <button
          onClick={() => setContent('myConnections')}
          className={`btn  rounded bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white `}
        >
          Your Connections
        </button>
      </div>
    );
  }

  if (content === 'suggestions') {
    connectionButtons = (
      <div className="flex items-center gap-5 my-5">
        <button
          onClick={() => setContent('request')}
          className={`btn  rounded bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white `}
        >
          Connection Request
        </button>
        <button
          onClick={() => setContent('myConnections')}
          className={`btn  rounded bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white `}
        >
          My Connections
        </button>
      </div>
    );
  }
  if (content === 'myConnections') {
    connectionButtons = (
      <div className="flex items-center gap-5 my-5">
        <button
          onClick={() => setContent('request')}
          className={`btn  rounded bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white `}
        >
          Connection Request
        </button>
        <button
          onClick={() => setContent('suggestions')}
          className={`btn  rounded bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white `}
        >
          Suggestions
        </button>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 relative  md:grid-cols-12 gap-5 bg-gray-100 min-h-screen">
      {/* Left Sidebar */}
      <div className="hidden md:block col-span-3 bg-white">
        <LeftSideBar />
      </div>

      <div className="col-span-1  relative md:col-span-7 bg-white p-2 md:py-2 md:px-5">
        {/* {content} */}
        <div className="sticky top-28">
          <div>
            <h4 className="text-2xl font-semibold relative inline-block after:content-[''] after:block after:w-full after:h-[3px] after:bg-blue-400 after:mt-1">
              Connections
            </h4>
            {connectionButtons}
          </div>
          <div className="divider my-5 "></div>
          <div>
            {content === 'request' && (
              <h6 className="font-bold">
                Connection Requests{' '}
                <span className="ms-3 text-blue-600">10</span>
              </h6>
            )}
            {content === 'suggestions' && (
              <h6 className="font-bold">Connection Suggestions</h6>
            )}
            {content === 'myConnections' && (
              <h6 className="font-bold ">My Connections</h6>
            )}
          </div>
          <div className="my-5">
            {content === 'request' && <ConnectionRequests />}
            {content === 'suggestions' &&
              suggestedConnections
                ?.filter((user) => user?.uid !== currentUser)
                .map((user) => (
                  <ConnectionSuggestions
                    key={user?._id}
                    user={user}
                    currentlyLoggedInUserData={currentlyLoggedInUserData}
                  />
                ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="hidden md:block col-span-2 bg-white">
        <RightSideBar />
      </div>
    </div>
  );
};

export default Connections;
