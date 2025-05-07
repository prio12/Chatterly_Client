/* eslint-disable react/prop-types */
import Modal from '../../../utilities/Modal';
import Stories from 'react-insta-stories';
import { useState, useEffect } from 'react';
import WithDeleteButton from '../../stories/WithDeleteButton';

const StoriesModal = ({
  storyViewOpen,
  setStoryViewOpen,
  currentStories,
  handleOnAllStoriesEnd,
  currentUserIndex,
  loggedInUserId, // Add this prop
}) => {
  const [storiesToShow, setStoriesToShow] = useState([]);

  // Process stories when they change or modal opens
  useEffect(() => {
    if (currentStories && currentStories.length > 0) {
      // Enhance stories with userId and storyId
      const enhanced = currentStories.map((story) => ({
        ...story,
        userId: story.header?.userId || null,
        storyId: story.id || null,
        content: ({ action, isPaused, config }) => (
          <WithDeleteButton
            story={story}
            action={action}
            isPaused={isPaused}
            config={config}
            loggedInUserId={loggedInUserId}
            storyViewOpen={storyViewOpen}
            setStoryViewOpen={setStoryViewOpen}
          />
        ),
      }));
      setStoriesToShow(enhanced);
    }
  }, [currentStories, storyViewOpen, loggedInUserId, setStoryViewOpen]);

  // Use storiesToShow instead of directly mapping in render

  return (
    <Modal isOpen={storyViewOpen} setIsOpen={setStoryViewOpen}>
      <div className="w-full md:w-1/2 mt-12 mx-auto flex justify-center p-4">
        <Stories
          onAllStoriesEnd={() => handleOnAllStoriesEnd(currentUserIndex)}
          stories={storiesToShow}
          defaultInterval={8000}
        />
      </div>
    </Modal>
  );
};

export default StoriesModal;
