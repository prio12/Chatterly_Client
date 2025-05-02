/* eslint-disable react/prop-types */
import Modal from '../../../utilities/Modal';
import Stories from 'react-insta-stories';

const StoriesModal = ({
  storyViewOpen,
  setStoryViewOpen,
  currentStories,
  handleOnAllStoriesEnd,
  currentUserIndex,
}) => {
  return (
    <Modal isOpen={storyViewOpen} setIsOpen={setStoryViewOpen}>
      <div className="w-full md:w-1/2 mt-12 mx-auto flex justify-center p-4">
        <Stories
          onAllStoriesEnd={() => handleOnAllStoriesEnd(currentUserIndex)}
          stories={currentStories}
          width="100%" // <-- important fix
          height="100%" // <-- optional, keeps proportions
        />
      </div>
    </Modal>
  );
};

export default StoriesModal;
