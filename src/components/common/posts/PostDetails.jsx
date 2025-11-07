import { useParams } from 'react-router';
import LeftSideBar from '../LeftSideBar';
import RightSideBar from '../RightSideBar';
import { useGetAPostQuery } from '../../../redux/api/posts/postsApi';
import PostCard from '../../profile/PostCard';
import { useSelector } from 'react-redux';
import { useUserInfoByUidQuery } from '../../../redux/api/users/usersApi';
import PostSkeletonLoader from '../../loaders/PostSkeletonLoader';

const PostDetails = () => {
  //hooks
  const { id } = useParams();
  const { data, isLoading } = useGetAPostQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const post = data?.response;
  const { currentUser } = useSelector((state) => state.loggedInUser);

  const { data: user } = useUserInfoByUidQuery(currentUser);
  const _id = user?.user?._id;

  if (isLoading) {
    return <PostSkeletonLoader />;
  }

  if (!isLoading && !post) {
    return (
      <div className="flex flex-col items-center justify-center p-8 my-6 bg-white rounded-lg shadow-md border border-gray-200">
        <div className="w-24 h-24 mb-4 text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Post Not Available
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Oops! This post appears to have been deleted or is no longer
          available.
        </p>
        <button
          onClick={() => window.history.back()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5  bg-gray-100 ">
      {/* Left Sidebar */}
      <div className="hidden md:block col-span-3 bg-white">
        <LeftSideBar />
      </div>

      <div className="col-span-1 md:col-span-7  relative  flex justify-center  md:px-5 ">
        <div className="w-full max-w-5xl md:px-5 px-0 ">
          {/* <Stories />
          <CreatePost user={user} />
          {content} */}
          <div className="sticky top-24 ">
            <PostCard post={post} id={_id} />
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="hidden md:block col-span-2 bg-white">
        <RightSideBar />
      </div>
    </div>
  );
};

export default PostDetails;
