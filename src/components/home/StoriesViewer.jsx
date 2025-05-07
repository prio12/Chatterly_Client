/* eslint-disable react/prop-types */
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import ContentUploadModal from '../../utilities/ContentUploadModal ';
import DefaultProfilePIcture from '../profile/DefaultProfilePIcture';
import StoriesModal from '../profile/modals/StoriesModal';
import { formatDistanceToNow } from 'date-fns';
import { useGetMyConnectionsQuery } from '../../redux/api/connections/connectionsApi';

const StoriesViewer = ({ user, activeStories, isStoryLoading }) => {
  //hooks
  const [isOpen, setIsOpen] = useState(false);
  const [storyViewOpen, setStoryViewOpen] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState(null);
  const [currentStories, setCurrentStories] = useState([]);

  const { isLoading, data: connectionsData } = useGetMyConnectionsQuery(
    user?._id,
    {
      skip: !user?._id,
    }
  );

  const myConnections = connectionsData?.myConnections;

  // Converts createdAt timestamp into a human-readable relative time format.
  const timeAgo = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  const openStoryViewer = (currentUserIndex) => {
    setCurrentUserIndex(currentUserIndex);
    // Prepare the stories for the current user
    let currentStories =
      currentUserIndex !== null
        ? activeStories[currentUserIndex].stories.map((story) => ({
            url: story.mediaUrl,
            id: story._id, // Add story ID for delete functionality
            userId: activeStories[currentUserIndex].author._id, // Add user ID to check ownership
            header: {
              heading: activeStories[currentUserIndex].author.name,
              subheading: timeAgo(story?.createdAt),
              profileImage:
                activeStories[currentUserIndex].author.profilePicture,
              userId: activeStories[currentUserIndex].author._id, // Add user ID here too
            },
          }))
        : [];

    setCurrentStories(currentStories);
    setStoryViewOpen(true);
  };

  const handleOnAllStoriesEnd = (index) => {
    if (activeStories?.length - index > 1) {
      let nextUserIndex = index + 1;
      let nextStories =
        nextUserIndex !== null
          ? activeStories[nextUserIndex].stories.map((story) => ({
              url: story.mediaUrl,
              id: story._id, // Add story ID for delete functionality
              userId: activeStories[nextUserIndex].author._id, // Add user ID
              header: {
                heading: activeStories[nextUserIndex].author.name,
                subheading: timeAgo(story?.createdAt),
                profileImage:
                  activeStories[nextUserIndex].author.profilePicture,
                userId: activeStories[nextUserIndex].author._id, // Add user ID here too
              },
            }))
          : [];
      setCurrentUserIndex(nextUserIndex);

      setCurrentStories(nextStories);
    } else {
      setStoryViewOpen(false);
    }
  };

  let content;

  if (isLoading) {
    content = <div>Loading...</div>;
  }

  if (activeStories?.length === 0) {
    content =
      myConnections?.length &&
      myConnections?.map((connection) => (
        <div key={connection?._id} className="flex-shrink-0 cursor-pointer">
          <div className="avatar">
            <div className=" w-12 md:w-[70px] rounded-full ">
              {connection?.myConnection?.profilePicture ? (
                <img src={connection?.myConnection?.profilePicture} />
              ) : (
                <DefaultProfilePIcture />
              )}
            </div>
          </div>
          <p className="text-sm font-semibold mt-2">
            {connection?.myConnection?.name}
          </p>
        </div>
      ));
  } else {
    content = activeStories?.map((story, index) => (
      <div
        onClick={() => openStoryViewer(index)}
        key={story._id}
        className="flex-shrink-0 cursor-pointer"
      >
        <div className="avatar">
          <div className="ring-blue-500 ring-offset-base-100 w-12 md:w-[70px] rounded-full ring ring-offset-2">
            {story?.author?.profilePicture ? (
              <img src={story?.author?.profilePicture} />
            ) : (
              <DefaultProfilePIcture />
            )}
          </div>
        </div>
        <p className="text-sm font-semibold mt-2">{story?.author?.name}</p>
      </div>
    ));
  }

  if (isStoryLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center gap-5">
      {/* Fixed Div */}
      <div className="fixed_div mb-4 md:mb-0">
        <div
          onClick={() => setIsOpen(true)}
          className="avatar placeholder cursor-pointer"
        >
          <div className="bg-neutral text-neutral-content w-[55px] md:w-[80px] rounded-full">
            <FaPlus className="font-bold text-xl" />
          </div>
        </div>
        <p className="text-sm hidden md:block font-semibold mt-2">
          Post A Story
        </p>
      </div>
      <ContentUploadModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        user={user}
        type="stories"
      />

      {/* Scrollable Map Part */}
      <div className="flex gap-3 md:gap-5 overflow-x-auto md:pt-1 pt-2 ps-1 w-full  md:ps-1 no-scrollbar">
        {content}
      </div>
      <StoriesModal
        handleOnAllStoriesEnd={handleOnAllStoriesEnd}
        storyViewOpen={storyViewOpen}
        setStoryViewOpen={setStoryViewOpen}
        currentStories={currentStories}
        currentUserIndex={currentUserIndex}
        loggedInUserId={user?._id} // Pass the logged-in user ID
      />
    </div>
  );
};

export default StoriesViewer;
