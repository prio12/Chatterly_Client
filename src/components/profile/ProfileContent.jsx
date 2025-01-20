import { useState } from 'react';
import Feed from './Feed';
import About from './About';

const ProfileContent = () => {
  //hooks
  const [activeTab, setActiveTab] = useState('feed');

  return (
    <div className="border-b border-r border-l mb-2 py-5 px-5">
      <div className="flex items-center justify-between">
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
          <span className="text-green-400 text-xs bg-green-50 p-2">300</span>
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
      {activeTab === 'feed' && <Feed />}
      {activeTab === 'about' && <About />}
    </div>
  );
};

export default ProfileContent;
