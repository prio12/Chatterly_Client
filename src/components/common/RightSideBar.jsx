/* eslint-disable react/prop-types */
import { RiMenu2Fill } from 'react-icons/ri';
import { useState } from 'react';
import DefaultProfilePIcture from '../profile/DefaultProfilePIcture';
import { CiSearch } from 'react-icons/ci';
import { Link, useNavigate } from 'react-router';

const RightSideBar = ({
  suggestedConnectionsData,
  suggestedCOnnectionsDataIsLoading,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const toggleSidebarWidth = () => {
    setIsExpanded(!isExpanded);
  };

  const suggestedConnections =
    suggestedConnectionsData?.suggestedConnections || [];

  let content;

  if (suggestedCOnnectionsDataIsLoading) {
    content = <div>Loading....</div>;
  }

  if (
    !suggestedCOnnectionsDataIsLoading &&
    suggestedConnections?.length === 0 &&
    isExpanded
  ) {
    content = (
      <div>
        <p className="text-sm text-gray-500">
          Oops! Seems like you have no suggestions! Search to connect with new
          people!
        </p>
      </div>
    );
  }
  if (!suggestedCOnnectionsDataIsLoading && suggestedConnections?.length > 0) {
    content = suggestedConnections?.slice(0, 5).map((conn) => (
      <Link key={conn?._id} to={`/profile/${conn?.uid}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar">
            <div className="w-8 rounded-full overflow-hidden">
              {conn?.profilePicture ? (
                <img src={conn?.profilePicture} alt={conn?.name} />
              ) : (
                <DefaultProfilePIcture />
              )}
            </div>
          </div>
          <span
            className={`text-sm font-semibold hover:text-blue-500 transition-all duration-300 ${
              isExpanded ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0'
            }`}
          >
            {conn?.name}
          </span>
        </div>
      </Link>
    ));
  }

  return (
    <div
      className={`${
        isExpanded ? 'w-64' : 'w-16'
      } fixed right-0 h-full bg-white shadow-lg transition-all duration-300 ease-in-out overflow-hidden`}
    >
      <div className="flex flex-col justify-start gap-5 p-3">
        <div className="flex items-center gap-2">
          <RiMenu2Fill
            onClick={toggleSidebarWidth}
            className="cursor-pointer text-2xl"
          />
          <span
            className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
              isExpanded ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0'
            }`}
          >
            Suggested People
          </span>
        </div>

        {/* Search Bar */}
        <button
          onClick={() => navigate('/search')}
          className={`flex items-center gap-2 pl-4 pr-4 py-3 border border-gray-300 rounded-full 
    bg-white hover:border-gray-400 transition-colors text-gray-500
    ${!isExpanded && 'invisible'} input input-bordered w-full max-w-xs`}
        >
          <CiSearch className="w-5 h-5 text-gray-400" />
          <span>Search...</span>
        </button>

        {/* Contacts */}
        <div className="flex flex-col gap-3">{content}</div>
      </div>
    </div>
  );
};

export default RightSideBar;
