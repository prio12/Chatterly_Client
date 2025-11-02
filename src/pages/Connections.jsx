import LeftSideBar from '../components/common/LeftSideBar';
import RightSideBar from '../components/common/RightSideBar';
import ConnectionRequests from '../components/connections/ConnectionRequests';
import { useEffect, useState } from 'react';
import ConnectionSuggestions from '../components/connections/ConnectionSuggestions';
import { useUserInfoByUidQuery } from '../redux/api/users/usersApi';
import { useSelector } from 'react-redux';
import {
  useFetchConnectionRequestsQuery,
  useFetchConnectionSuggestionsQuery,
  useGetMyConnectionsQuery,
  useGetSentRequestsQuery,
} from '../redux/api/connections/connectionsApi';
import MyConnections from '../components/connections/MyConnections';
import SentConnections from '../components/connections/SentConnections';

const Connections = () => {
  const [content, setContent] = useState('request');
  const { currentUser } = useSelector((state) => state.loggedInUser);
  const { data } = useUserInfoByUidQuery(currentUser);

  const currentlyLoggedInUserData = data?.user;

  //fetching all connection requests by _id
  const { data: connectionRequestsData, isLoading: isConnectionDataLoading } =
    useFetchConnectionRequestsQuery(currentlyLoggedInUserData?._id, {
      refetchOnMountOrArgChange: true,
    });

  //fetching all suggestedConnections
  const {
    data: suggestedConnectionsData,
    isLoading: isSuggestedConnectionDataLoading,
  } = useFetchConnectionSuggestionsQuery(currentlyLoggedInUserData?._id, {
    refetchOnMountOrArgChange: true,
  });

  //fetching myConnections
  const { data: myConnectionsData, isLoading: isMyConnectionsDataLoading } =
    useGetMyConnectionsQuery(currentlyLoggedInUserData?._id, {
      refetchOnMountOrArgChange: true,
    });

  //fetching sent connections requests
  const { data: sentRequestData, isLoading: isSentRequestDataLoading } =
    useGetSentRequestsQuery(currentlyLoggedInUserData?._id, {
      refetchOnMountOrArgChange: true,
    });

  //getting sentRequests
  const sentRequests = sentRequestData?.response;

  //getting my Connections
  const myConnections = myConnectionsData?.myConnections;

  //hooks
  const [suggestedConnections, setSuggestedConnection] = useState([]);

  useEffect(() => {
    if (suggestedConnectionsData?.suggestedConnections) {
      setSuggestedConnection(suggestedConnectionsData?.suggestedConnections);
    }
  }, [suggestedConnectionsData?.suggestedConnections]);

  const connectionRequests = connectionRequestsData?.response;
  // const suggestedConnections = suggestedConnectionsData?.suggestedConnections;

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
          My Connections
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

  let connectionRequestsContent;

  if (isConnectionDataLoading) {
    connectionRequestsContent = <div>Loading.... data</div>;
  }

  if (!isConnectionDataLoading && connectionRequests?.length === 0) {
    connectionRequestsContent = (
      <div> Seems like you have no connection requests!</div>
    );
  }

  if (!isConnectionDataLoading && connectionRequests?.length > 0) {
    connectionRequestsContent = connectionRequests.map((request) => (
      <ConnectionRequests
        request={request}
        key={request._id}
        currentlyLoggedInUserData={currentlyLoggedInUserData}
      />
    ));
  }

  let suggestedConnectionsContent;

  if (isSuggestedConnectionDataLoading) {
    suggestedConnectionsContent = <div>Loading.... data</div>;
  }

  if (!isSuggestedConnectionDataLoading && suggestedConnections?.length === 0) {
    suggestedConnectionsContent = (
      <div> Seems like you have no connection suggestions!</div>
    );
  }

  if (!isSuggestedConnectionDataLoading && suggestedConnections?.length > 0) {
    suggestedConnectionsContent = suggestedConnections.map((user) => (
      <ConnectionSuggestions
        setSuggestedConnection={setSuggestedConnection}
        suggestedConnections={suggestedConnections}
        user={user}
        key={user._id}
        currentlyLoggedInUserData={currentlyLoggedInUserData}
      />
    ));
  }

  let myConnectionsContent;

  if (isMyConnectionsDataLoading) {
    myConnectionsContent = <div>Loading....</div>;
  }

  if (!isMyConnectionsDataLoading && myConnections?.length === 0) {
    myConnectionsContent = (
      <div>Seems like you have not built any connection yet!</div>
    );
  }
  if (!isMyConnectionsDataLoading && myConnections?.length > 0) {
    myConnectionsContent = myConnections?.map((connection) => (
      <MyConnections connection={connection} key={connection._id} />
    ));
  }

  //sent connections

  let sentRequestsContent;

  if (isSentRequestDataLoading) {
    sentRequestsContent = <div>Loading...</div>;
  }

  if (!isSentRequestDataLoading && sentRequests?.length === 0) {
    sentRequestsContent = (
      <div>
        <h3>Seems like you have no sent requests!</h3>
      </div>
    );
  }

  if (!isSentRequestDataLoading && sentRequests?.length > 0) {
    sentRequestsContent = sentRequests?.map((request) => (
      <SentConnections key={request._id} request={request} />
    ));
  }

  return (
    <div className="grid grid-cols-1 relative  md:grid-cols-12 gap-5 bg-gray-100 min-h-screen">
      {/* Left Sidebar */}
      <div className="hidden md:block col-span-3 bg-white">
        <LeftSideBar />
      </div>

      <div className="col-span-1 relative  md:col-span-7 bg-white p-2 md:py-2 md:px-5">
        {/* {content} */}
        <div className="sticky top-28">
          <div>
            <div>
              <h4 className="text-2xl font-semibold relative inline-block after:content-[''] after:block after:w-full after:h-[3px] after:bg-blue-400 after:mt-1">
                Connections
              </h4>
              {connectionButtons}
            </div>
            <div className="divider my-5 "></div>
            <div>
              {content === 'request' && (
                <div className="flex items-center justify-between">
                  <h6 className="font-bold">
                    Connection Requests{' '}
                    <span className="ms-3 text-blue-600">
                      {connectionRequests?.length}
                    </span>
                  </h6>
                  <button
                    onClick={() => setContent('sentRequest')}
                    className={`btn  rounded bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white `}
                  >
                    Sent Request
                  </button>
                </div>
              )}
              {content === 'suggestions' && (
                <h6 className="font-bold">Connection Suggestions</h6>
              )}
              {content === 'sentRequest' && (
                <div className="flex items-center justify-between">
                  <h6 className="font-bold">
                    {' '}
                    Sent Requests{' '}
                    <span className="ms-3 text-blue-600">
                      {sentRequests?.length}
                    </span>
                  </h6>
                  <button
                    onClick={() => setContent('request')}
                    className={`btn  rounded bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white `}
                  >
                    ← Previous
                  </button>
                </div>
              )}
              {content === 'myConnections' && (
                <h6 className="font-bold mb-5 ">
                  My Connections{' '}
                  <span className="ms-3 text-blue-600">
                    {myConnections?.length}
                  </span>
                </h6>
              )}
            </div>
            <div className="my-5">
              {content === 'request' && connectionRequestsContent}
              {content === 'suggestions' && suggestedConnectionsContent}
              {content === 'myConnections' && myConnectionsContent}
              {content === 'sentRequest' && sentRequestsContent}
            </div>
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
