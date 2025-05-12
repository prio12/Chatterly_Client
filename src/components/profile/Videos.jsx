/* eslint-disable react/prop-types */
import { FaHeart } from 'react-icons/fa6';
import { FiPlus } from 'react-icons/fi';
import { MdOutlineInsertComment } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router';

const Videos = ({ user, currentUserData }) => {
  const posts = user?.posts;

  //hooks
  const { currentUser } = useSelector((state) => state.loggedInUser);
  const { uid } = useParams();

  const postsWithVideos = posts?.filter(
    (post) => typeof post?.video === 'string' && post?.video.trim() !== ''
  );

  const generateThumbnail = (videoUrl) => {
    if (!videoUrl.includes('/upload/')) return null;
    return videoUrl
      .replace('/upload/', '/upload/so_5/')
      .replace('.mp4', '.jpg');
  };

  let content;

  if (postsWithVideos?.length === 0) {
    content = <div>No videos to show here!</div>;
  } else {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-3 my-5 gap-5">
        {postsWithVideos.map((post) => {
          const thumbnail = generateThumbnail(post?.video);
          return (
            <div key={post._id}>
              <Link to={`/posts/${post?._id}`}>
                <div className="relative group overflow-hidden rounded shadow">
                  <img
                    src={thumbnail}
                    alt="Video thumbnail"
                    className="w-full h-36 object-cover rounded-lg transition duration-300 group-hover:scale-105"
                  />
                  {/* Optional: Play icon or overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <svg
                      className="w-16 h-16 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </Link>
              <div className="flex items-center gap-5 my-2">
                <div className="flex items-center gap-2">
                  <FaHeart className="text-red-600" />
                  <p>{post?.likes?.length}</p>
                </div>
                <div className="flex items-center gap-2">
                  <MdOutlineInsertComment />
                  <p>{post?.comments?.length}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="p-5 bg-white border my-5">
      {/* Header */}
      <div className="flex items-center mb-5 justify-between">
        <h5 className="font-bold text-xl">Videos</h5>
        {currentUser === uid && (
          <button className="btn btn-sm rounded bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white">
            <FiPlus className="text-xl" /> Add a Video
          </button>
        )}
      </div>
      {content}
    </div>
  );
};

export default Videos;
