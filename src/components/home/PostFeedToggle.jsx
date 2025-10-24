import { useState } from 'react';

const PostFeedToggle = () => {
  const [activeTab, setActiveTab] = useState('friends');

  return (
    <div className="w-full my-5  bg-white border p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Tab Switcher */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1 flex gap-1">
        <button
          onClick={() => setActiveTab('friends')}
          className={`flex-1 py-2.5 px-4 rounded-md font-medium transition-all duration-200 ${
            activeTab === 'friends'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Friends
          </span>
        </button>

        <button
          onClick={() => setActiveTab('community')}
          className={`flex-1 py-2.5 px-4 rounded-md font-medium transition-all duration-200 ${
            activeTab === 'community'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Community
          </span>
        </button>
      </div>

      {/* Demo content to show it working */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm text-gray-600">
          Currently viewing:{' '}
          <span className="font-semibold text-gray-900">
            {activeTab === 'friends' ? 'Friends Posts' : 'Community Posts'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default PostFeedToggle;
