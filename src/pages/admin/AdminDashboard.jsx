import { useSelector } from 'react-redux';
import { useUserInfoByUidQuery } from '../../redux/api/users/usersApi';
import { useGetAllPostsQuery } from '../../redux/api/posts/postsApi';
import { useEffect, useRef, useState } from 'react';
import PostCard from '../../components/profile/PostCard';

const AdminDashboard = () => {
  const { currentUser } = useSelector((state) => state.loggedInUser);

  //rtk hooks
  const { data, isLoading } = useUserInfoByUidQuery(currentUser);
  const [posts, setPosts] = useState([]);

  const loaderRef = useRef(null);
  const [page, setPage] = useState(1);
  const limit = 5;

  const user = data?.user;

  const {
    data: postData,
    error,
    isLoading: postsLoading,
    isError,
    isFetching,
  } = useGetAllPostsQuery(
    { page, limit },
    {
      refetchOnMountOrArgChange: true,
    }
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
    postsContent = <div>Loading...</div>;
  }
  if (!postsLoading && isError) {
    postsContent = (
      <div className="text-center font-semibold mt-16">{error}</div>
    );
  }
  if (!postsLoading && !isError && posts?.length === 0) {
    postsContent = (
      <div className="text-center font-semibold mt-16">No posts available</div>
    );
  }
  if (!postsLoading && !isError && posts?.length > 0) {
    postsContent = posts.map((post) => (
      <PostCard id={user?._id} key={post._id} post={post} />
    ));
  }
  return (
    <div>
      <p>this is admin Dashboard page </p>
      {postsContent}
    </div>
  );
};

export default AdminDashboard;
