/* eslint-disable react/prop-types */
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import ContentUploadModal from '../../utilities/ContentUploadModal ';
import DefaultProfilePIcture from '../profile/DefaultProfilePIcture';
import StoriesModal from '../profile/modals/StoriesModal';

const StoriesViewer = ({ user, activeStories, isStoryLoading }) => {
  //hooks
  const [isOpen, setIsOpen] = useState(false);
  const [storyViewOpen, setStoryViewOpen] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState(null);
  const [currentStories, setCurrentStories] = useState([]);

  const openStoryViewer = (currentUserIndex) => {
    setCurrentUserIndex(currentUserIndex);
    // Prepare the stories for the current user
    let currentStories =
      currentUserIndex !== null
        ? activeStories[currentUserIndex].stories.map((story) => ({
            url: story.mediaUrl,
            header: {
              heading: activeStories[currentUserIndex].author.name,
              profileImage:
                activeStories[currentUserIndex].author.profilePicture,
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
              header: {
                heading: activeStories[nextUserIndex].author.name,
                profileImage:
                  activeStories[nextUserIndex].author.profilePicture,
              },
            }))
          : [];
      setCurrentUserIndex(nextUserIndex);

      setCurrentStories(nextStories);
    } else {
      setStoryViewOpen(false);
    }
  };

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
        {activeStories &&
          activeStories.length > 0 &&
          activeStories.map((story, index) => (
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
              <p className="text-sm font-semibold mt-2">
                {story?.author?.name}
              </p>
            </div>
          ))}
      </div>
      <StoriesModal
        handleOnAllStoriesEnd={handleOnAllStoriesEnd}
        storyViewOpen={storyViewOpen}
        setStoryViewOpen={setStoryViewOpen}
        currentStories={currentStories}
        currentUserIndex={currentUserIndex}
      />
    </div>
  );
};

export default StoriesViewer;
