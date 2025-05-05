import { FaTrash } from 'react-icons/fa6';

/* eslint-disable react/prop-types */
const WithDeleteButton = (props) => {
  const { story, action, loggedInUserId } = props;

  // Check if the current story belongs to the logged-in user
  const isOwnStory = story.header && story.userId === loggedInUserId;

  const handleDeleteClick = (e) => {
    e.stopPropagation(); // Prevent the story from navigating
    if (confirm('Are you sure you want to delete this story?')) {
      // Call your delete API here
      // Example: deleteStory(story.storyId)
      console.log('Deleting story:', story.storyId);

      // After successful deletion, you might want to:
      // 1. Go to next story
      action('next');
      // 2. Or close the modal if this was the only story
      // setStoryViewOpen(false);
    }
  };

  console.log(story.content);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <img
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
        src={story.url}
        alt="story"
      />

      {/* Header with user info */}
      <div
        className="absolute top-0 left-0 right-0 p-4 flex items-center gap-3"
        style={{
          background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0))',
          zIndex: 9998,
        }}
      >
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src={story.header?.profileImage}
            alt={story.header?.heading}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-white font-semibold">{story.header?.heading}</p>
          <p className="text-white text-xs opacity-80">
            {story.header?.subheading}
          </p>
        </div>
      </div>

      {/* Delete button - only show for logged in user's stories */}
      {isOwnStory && (
        <button
          onClick={handleDeleteClick}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-red-600 text-white p-3 rounded-full hover:bg-red-700"
          style={{ zIndex: 9999 }}
        >
          <FaTrash />
        </button>
      )}
    </div>
  );
};

export default WithDeleteButton;
