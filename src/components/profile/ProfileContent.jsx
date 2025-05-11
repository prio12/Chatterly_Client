/* eslint-disable react/prop-types */
import { useState } from 'react';
import Feed from './Feed';
import About from './About';
import Media from './Media';
import Videos from './Videos';
import { useGetMyConnectionsQuery } from '../../redux/api/connections/connectionsApi';
import MyConnections from '../connections/MyConnections';

const ProfileContent = ({ user, currentUserData }) => {
  //hooks
  const [activeTab, setActiveTab] = useState('feed');

  //fetching all connections of a specific user
  const { data, isLoading } = useGetMyConnectionsQuery(user?._id, {
    refetchOnMountOrArgChange: true,
  });

  const myConnections = data?.myConnections;

  let connectionsContent;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoading && myConnections?.length === 0) {
    connectionsContent = (
      <div>
        <div>
          <h4 className="font-bold text-xl mb-4">
            Connections <span className="text-green-600  font-bold">0</span>
          </h4>
          <p className="text-gray-500 italic">
            Oops! Seems like you have no connections yet!
          </p>
        </div>
      </div>
    );
  }

  if (!isLoading && myConnections?.length > 0) {
    connectionsContent = (
      <div className="mb-12">
        <h4 className="font-bold text-xl mb-4">
          Connections{' '}
          <span className="text-green-600  font-bold">
            {myConnections?.length}
          </span>
        </h4>
        {myConnections?.map((connection) => (
          <MyConnections
            currentUserData={currentUserData}
            connection={connection}
            key={connection?.connectionId}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="flex flex-wrap  items-center gap-12 border-b border-r border-l mb-2 p-5">
        {/* Feed Tab */}
        <h4
          onClick={() => setActiveTab('feed')}
          className={`cursor-pointer hover:text-blue-600 font-semibold ${
            activeTab === 'feed'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : ''
          }`}
        >
          Feed
        </h4>

        {/* About Tab */}
        <h4
          onClick={() => setActiveTab('about')}
          className={`cursor-pointer hover:text-blue-600 font-semibold ${
            activeTab === 'about'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : ''
          }`}
        >
          About
        </h4>

        {/* Connections Tab */}
        <div
          onClick={() => setActiveTab('connections')}
          className="flex items-center gap-2"
        >
          <h4
            className={`cursor-pointer hover:text-blue-600 font-semibold ${
              activeTab === 'connections'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : ''
            }`}
          >
            Connections
          </h4>
          <span className="text-green-600 text-xs font-bold bg-green-50 p-2">
            {myConnections?.length}
          </span>
        </div>

        {/* Media Tab */}
        <h4
          onClick={() => setActiveTab('media')}
          className={`cursor-pointer hover:text-blue-600 font-semibold ${
            activeTab === 'media'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : ''
          }`}
        >
          Media
        </h4>

        {/* Videos Tab */}
        <h4
          onClick={() => setActiveTab('videos')}
          className={`cursor-pointer hover:text-blue-600 font-semibold ${
            activeTab === 'videos'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : ''
          }`}
        >
          Videos
        </h4>
      </div>
      <div>
        {activeTab === 'feed' && <Feed user={user} />}
        {activeTab === 'about' && <About user={user} />}
        {activeTab === 'connections' && connectionsContent}
        {activeTab === 'media' && (
          <Media user={user} currentUserData={currentUserData} />
        )}
        {activeTab === 'videos' && <Videos />}
      </div>
    </div>
  );
};

export default ProfileContent;
