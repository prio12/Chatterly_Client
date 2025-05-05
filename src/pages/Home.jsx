import { useSelector } from 'react-redux';
import LeftSideBar from '../components/common/LeftSideBar';
import RightSideBar from '../components/common/RightSideBar';
import CreatePost from '../components/CreatePost';
import Stories from '../components/home/StoriesViewer';
import PostCard from '../components/profile/PostCard';
import { useUserInfoByUidQuery } from '../redux/api/users/usersApi';
import { useGetAllPostsQuery } from '../redux/api/posts/postsApi';
import { useContext, useEffect } from 'react';
import SocketContext from '../context/SocketContext';
import { useFetchStoriesQuery } from '../redux/api/stories/storiesApi';

const Home = () => {
  //hooks
  const { currentUser } = useSelector((state) => state.loggedInUser);
  const { data } = useUserInfoByUidQuery(currentUser);
  const {
    data: postData,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetAllPostsQuery(null, {
    refetchOnMountOrArgChange: true,
  });

  //getting socket to listen event
  const socket = useContext(SocketContext);

  const user = data?.user;

  const posts = postData?.result;

  useEffect(() => {
    socket.on('newPost', ({ success }) => {
      if (success) {
        setTimeout(() => {
          refetch();
        }, 1000);
      }
    });
  }, [socket, refetch]);

  useEffect(() => {
    socket.on('postInteraction', ({ success }) => {
      if (success) {
        setTimeout(() => {
          refetch();
        }, 1000);
      }
    });
  }, [socket, refetch]);

  //use rtk query to get stories
  const { data: storiesData, isLoading: isStoryLoading } = useFetchStoriesQuery(
    user?._id,
    {
      refetchOnMountOrArgChange: true,
      skip: !user?._id,
    }
  );

  const stories = storiesData?.activeStories;

  let content;

  if (!user) {
    return <div>Loading...</div>;
  }

  if (isLoading) {
    content = <div>Loading...</div>;
  }

  if (!isLoading && isError) {
    <div>
      <h5>Something Went wrong!!</h5>
      <p>{error.message}</p>
    </div>;
  }

  if (!isLoading && !isError && posts.length === 0) {
    content = <div>No post Available</div>;
  }

  if (!isLoading && !isError && posts.length > 0) {
    content = posts.map((post) => (
      <PostCard id={user?._id} key={post._id} post={post} />
    ));
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 bg-gray-100 min-h-screen">
      {/* Left Sidebar */}
      <div className="hidden md:block col-span-3 bg-white">
        <LeftSideBar />
      </div>

      <div className="col-span-1 md:col-span-7 bg-white flex justify-center md:py-2 md:px-5 ">
        <div className="w-full max-w-5xl md:px-5 px-0 py-2">
          <Stories
            user={user}
            activeStories={stories}
            isStoryLoading={isStoryLoading}
          />
          <CreatePost user={user} />
          {content}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="hidden md:block col-span-2 bg-white">
        <RightSideBar />
      </div>
    </div>
  );
};

export default Home;
