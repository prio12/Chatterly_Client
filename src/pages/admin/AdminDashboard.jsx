import { useSelector } from 'react-redux';
import {
  useGetAllUsersQuery,
  useUserInfoByUidQuery,
} from '../../redux/api/users/usersApi';

import { useEffect, useState } from 'react';
import { MdDelete, MdPostAdd } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa';
import DefaultProfilePIcture from '../../components/profile/DefaultProfilePIcture';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import {
  useDeleteAPostMutation,
  useGetAllPostsQuery,
} from '../../redux/api/posts/postsApi';

const AdminDashboard = () => {
  const { currentUser } = useSelector((state) => state.loggedInUser);
  const [activeTab, setActiveTab] = useState('posts');

  //rtk hooks
  const { data, isLoading } = useUserInfoByUidQuery(currentUser);
  const [deletePost] = useDeleteAPostMutation();
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const page = 0;
  const limit = 0;
  const navigate = useNavigate();

  const user = data?.user;

  //fetch all posts
  const {
    data: postData,
    error,
    isLoading: postsLoading,
    isError,
  } = useGetAllPostsQuery(
    { page, limit },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  //fetch all users
  const { data: allUserdata, isLoading: usersLoading } = useGetAllUsersQuery(
    null,
    { refetchOnMountOrArgChange: true }
  );

  //  load & paginate posts safely
  useEffect(() => {
    if (postData?.result) {
      setPosts((prev) => {
        if (page === 1) {
          return postData.result;
        } else {
          const newPosts = postData.result.filter(
            (p) => !prev.some((old) => old._id === p._id)
          );
          return [...prev, ...newPosts];
        }
      });
    }
  }, [postData?.result, page]);

  //setting all users , removing the admin from all users
  useEffect(() => {
    if (!allUserdata?.success) {
      setUsers([]);
    }
    const filteredUsers = allUserdata?.response?.filter(
      (u) => u?.role !== 'admin'
    );

    setUsers(filteredUsers);
  }, [allUserdata?.success, allUserdata?.response]);

  const handleDeletePost = async (postId) => {
    try {
      const response = await deletePost({ _id: postId });
      if (response?.data?.success) {
        toast.success('Post Deleted from admin!');
        setPosts((prev) => prev?.filter((p) => p?._id !== postId));
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const handleVisitProfile = (uid) => {
    navigate(`/profile/${uid}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoading && user?.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">403</h1>
          <p className="text-gray-600">
            Unauthorized - You can not access this page
          </p>
        </div>
      </div>
    );
  }

  let postsContent;

  if (postsLoading) {
    postsContent = <div className="text-center py-8">Loading posts...</div>;
  }
  if (!postsLoading && isError) {
    postsContent = (
      <div className="text-center font-semibold mt-16 text-red-600">
        {error}
      </div>
    );
  }
  if (!postsLoading && !isError && posts?.length === 0) {
    postsContent = (
      <div className="text-center font-semibold py-16 text-gray-500">
        No posts available
      </div>
    );
  }
  if (!postsLoading && !isError && posts?.length > 0) {
    postsContent = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            {/* Media Section */}
            {post?.img && (
              <div className="w-full h-56 bg-gray-100">
                <img
                  src={post.img}
                  alt="Post"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {post?.video && (
              <div className="w-full h-56 bg-gray-100">
                <video
                  src={post.video}
                  controls
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content Section */}
            <div className="p-5">
              {post?.content && (
                <p className="text-gray-700 text-sm mb-4 line-clamp-4 leading-relaxed">
                  {post.content}
                </p>
              )}

              {/* Delete Button */}
              <button
                onClick={() => handleDeletePost(post._id)}
                className="flex items-center gap-2 w-full bg-red-500 text-white py-2.5 px-4 rounded-lg hover:bg-red-600 transition-colors justify-center font-medium"
              >
                <MdDelete size={20} />
                Delete Post
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  let usersContent;

  if (usersLoading) {
    usersContent = <div className="text-center py-8">Loading users...</div>;
  }
  if (!usersLoading && users?.length === 0) {
    usersContent = (
      <div className="text-center font-semibold py-16 text-gray-500">
        No users available
      </div>
    );
  }
  if (!usersLoading && users?.length > 0) {
    usersContent = (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            {/* Profile Picture */}
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200 shadow-sm">
                {user?.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <DefaultProfilePIcture />
                )}
              </div>
            </div>

            {/* User Info */}
            <h3 className="text-center font-semibold text-gray-800 mb-4 truncate text-base">
              {user?.name}
            </h3>

            {/* Delete Button */}
            <button
              onClick={() => handleVisitProfile(user?.uid)}
              className="flex items-center gap-2 w-full bg-blue-500 text-white py-2.5 px-4 rounded-lg hover:bg-blue-600 transition-colors justify-center text-sm font-medium"
            >
              Visit Profile
            </button>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header with Tabs */}
      <div className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mb-6">
            Manage your platform content and users
          </p>

          {/* Tab Navigation */}
          <div className="flex gap-3">
            <button
              onClick={() => setActiveTab('posts')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'posts'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <MdPostAdd size={20} />
              Posts
              <span
                className={`ml-1 px-2.5 py-0.5 rounded-full text-sm font-semibold ${
                  activeTab === 'posts'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 text-gray-700'
                }`}
              >
                {posts?.length || 0}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === 'users'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FaUsers size={20} />
              Users
              <span
                className={`ml-1 px-2.5 py-0.5 rounded-full text-sm font-semibold ${
                  activeTab === 'users'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 text-gray-700'
                }`}
              >
                {users?.length || 0}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'posts' && (
          <div className="animate-fadeIn">{postsContent}</div>
        )}

        {activeTab === 'users' && (
          <div className="animate-fadeIn">{usersContent}</div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
