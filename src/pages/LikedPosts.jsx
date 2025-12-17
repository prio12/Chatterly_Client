import { useSelector } from 'react-redux';
import LeftSideBar from '../components/common/LeftSideBar';
import RightSideBar from '../components/common/RightSideBar';
import { useUserInfoByUidQuery } from '../redux/api/users/usersApi';
import { useFetchConnectionSuggestionsQuery } from '../redux/api/connections/connectionsApi';
import { FaHandPointRight, FaHeart } from 'react-icons/fa6';
import { Link } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import SocketContext from '../context/SocketContext';
import PostSkeletonLoader from '../components/loaders/PostSkeletonLoader';
import PostCard from '../components/profile/PostCard';

const LikedPosts = () => {
  const { currentUser } = useSelector((state) => state.loggedInUser);
  const { data: userData, isLoading: isUserDataLoading } =
    useUserInfoByUidQuery(currentUser, {
      skip: !currentUser,
    });

  const user = userData?.user;
  const socket = useContext(SocketContext);

  const {
    data: suggestedConnectionsData,
    isLoading: suggestedCOnnectionsDataIsLoading,
  } = useFetchConnectionSuggestionsQuery(user?._id, {
    refetchOnMountOrArgChange: true,
    skip: !user?._id,
  });

  //using local state to keep the like posts
  const [likedPosts, setLikedPosts] = useState([]);

  // const likedPosts = user?.likedPosts;

  useEffect(() => {
    if (user?.likedPosts?.length === 0) {
      setLikedPosts([]);
    }
    setLikedPosts(user?.likedPosts);
  }, [user?.likedPosts]);

  useEffect(() => {
    socket.on('postInteraction', ({ success, updatedPost, isDeleted }) => {
      if (!success) return;

      if (!isDeleted) return;
      else {
        setLikedPosts((prev) => prev.filter((p) => p._id !== updatedPost._id));
      }
    });
  }, [socket]);

  let content;

  if (isUserDataLoading) {
    content = <PostSkeletonLoader />;
  } else if (likedPosts?.length === 0) {
    content = (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-red-100 rounded-full blur-2xl opacity-50"></div>
          <div className="relative p-6 bg-gradient-to-br from-red-50 to-pink-50 rounded-full">
            <FaHeart className="text-red-500" />
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          No Liked Posts Yet
        </h3>

        <p className="text-gray-500 text-center mb-8 max-w-md">
          Start exploring and show some appreciation! When you like posts, they
          will appear here for easy access.
        </p>

        <Link
          to="/"
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium rounded-lg hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Explore Posts
          <FaHandPointRight />
        </Link>
      </div>
    );
  } else {
    content = likedPosts?.map((post) => (
      <PostCard key={post?._id} post={post} />
    ));
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 bg-gray-100 min-h-screen">
      {/* Left Sidebar */}
      <div className="hidden md:block col-span-3 bg-white">
        <LeftSideBar />
      </div>

      <div className="col-span-1 md:col-span-7 bg-white flex justify-center md:py-5 md:px-5">
        <div className="w-full max-w-4xl mb-5">
          {/* Header */}
          <div className="mb-8  px-5 ">
            <div className="flex items-center gap-3">
              <FaHeart className="text-red-500 text-4xl" />
              <h2 className="text-2xl font-bold border-b-4 pb-3 border-blue-600">
                Loved Posts
              </h2>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              All the posts you have shown some love
            </p>
          </div>

          {content}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="hidden md:block col-span-2 bg-white">
        <RightSideBar
          suggestedConnectionsData={suggestedConnectionsData}
          suggestedCOnnectionsDataIsLoading={suggestedCOnnectionsDataIsLoading}
        />
      </div>
    </div>
  );
};

export default LikedPosts;
