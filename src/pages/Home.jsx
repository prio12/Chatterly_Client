import { useSelector } from 'react-redux';
import LeftSideBar from '../components/common/LeftSideBar';
import RightSideBar from '../components/common/RightSideBar';
import CreatePost from '../components/CreatePost';
import Stories from '../components/home/StoriesViewer';
import PostCard from '../components/profile/PostCard';
import { useUserInfoByUidQuery } from '../redux/api/users/usersApi';
import { useGetAllPostsQuery } from '../redux/api/posts/postsApi';
import { useContext, useEffect, useState, useRef } from 'react';
import SocketContext from '../context/SocketContext';
import { useFetchStoriesQuery } from '../redux/api/stories/storiesApi';
import {
  useFetchConnectionSuggestionsQuery,
  useGetMyConnectionsQuery,
} from '../redux/api/connections/connectionsApi';
import PostFeedToggle from '../components/home/PostFeedToggle';
import { FiFileText } from 'react-icons/fi';
import { BiPlus } from 'react-icons/bi';

const Home = () => {
  const { currentUser } = useSelector((state) => state.loggedInUser);
  const { data } = useUserInfoByUidQuery(currentUser);
  const user = data?.user;

  //  two states — one for all posts, one for filtered ones
  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState([]);

  const loaderRef = useRef(null);
  const [page, setPage] = useState(1);
  const limit = 5;
  const [activeTab, setActiveTab] = useState('myFeed');
  const createPostRef = useRef(null);

  const {
    data: postData,
    error,
    isLoading,
    isError,
    isFetching,
  } = useGetAllPostsQuery(
    { page, limit },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const socket = useContext(SocketContext);

  //  load & paginate posts safely
  useEffect(() => {
    if (postData?.result) {
      setAllPosts((prev) => {
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

  //  update displayed posts when allPosts change
  useEffect(() => {
    setPosts(allPosts);
  }, [allPosts]);

  //  newPost listener
  useEffect(() => {
    const handleNewPost = ({ success, newPost }) => {
      if (success) {
        setAllPosts((prev) => [newPost, ...prev]);
      }
    };

    socket.on('newPost', handleNewPost);
    return () => socket.off('newPost', handleNewPost);
  }, [socket]);

  //  post interaction listener
  useEffect(() => {
    socket.on('postInteraction', ({ success, updatedPost, isDeleted }) => {
      if (!success) return;

      if (!isDeleted) {
        setAllPosts((prev) =>
          prev.map((p) => (p._id === updatedPost._id ? updatedPost : p))
        );
      } else {
        setAllPosts((prev) => prev.filter((p) => p._id !== updatedPost._id));
      }
    });
  }, [socket]);

  //  infinite scroll observer
  useEffect(() => {
    if (!loaderRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && postData?.hasMore && !isFetching) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0 }
    );

    observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [isFetching, postData?.hasMore, allPosts.length, user]);

  //  stories, suggestions, connections
  const { data: storiesData, isLoading: isStoryLoading } = useFetchStoriesQuery(
    user?._id,
    {
      refetchOnMountOrArgChange: true,
      skip: !user?._id,
    }
  );

  const stories = storiesData?.activeStories;

  const {
    data: suggestedConnectionsData,
    isLoading: suggestedCOnnectionsDataIsLoading,
  } = useFetchConnectionSuggestionsQuery(user?._id, {
    refetchOnMountOrArgChange: true,
    skip: !user?._id,
  });

  const { data: myConnectionsData, isLoading: isMyConnectionsDataLoading } =
    useGetMyConnectionsQuery(user?._id, {
      refetchOnMountOrArgChange: true,
      skip: !user?._id,
    });

  const myConnections = myConnectionsData?.myConnections;

  //  filter logic fixed
  useEffect(() => {
    // if (!user) return;
    if (!user) return;

    let friendsAndMyPosts = allPosts?.filter(
      (p) =>
        myConnections?.some((c) => c?.myConnection?._id === p?.author?._id) ||
        user?._id === p?.author?._id
    );

    if (activeTab === 'myFeed') {
      setPosts(friendsAndMyPosts);
    } else {
      setPosts(allPosts);
    }
  }, [myConnections, allPosts, user, activeTab]);

  //  render logic
  let content;

  if (!user) return <div>Loading...</div>;

  if (isLoading && isMyConnectionsDataLoading) {
    content = <div>Loading...</div>;
  } else if (!isLoading && !isMyConnectionsDataLoading && isError) {
    content = (
      <div>
        <h5>Something went wrong!!</h5>
        <p>{error.message}</p>
      </div>
    );
  } else if (posts.length === 0) {
    content = (
      <div className="flex items-center justify-center  bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <div className="text-center max-w-md">
          {/* Icon Container */}
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="absolute inset-0 bg-blue-100 rounded-full blur-2xl opacity-50 animate-pulse"></div>
            <div className="relative bg-white p-6 rounded-full shadow-lg">
              <FiFileText
                className="w-16 h-16 text-blue-500"
                strokeWidth={1.5}
              />
            </div>
          </div>

          {/* Text Content */}
          <h2 className="text-3xl font-bold text-slate-800 mb-3">
            No Posts Yet
          </h2>
          <p className="text-slate-500 text-lg mb-8 leading-relaxed">
            It is a bit quiet here. Be the first to share something amazing with
            the community!
          </p>

          {/* Action Button */}
          <button
            onClick={() => {
              const el = createPostRef.current;
              if (!el) return;

              // First scroll into view smoothly
              el.scrollIntoView({
                behavior: 'smooth',
                block: 'center', // or 'start'
              });

              // Then focus AFTER a slight delay
              setTimeout(() => {
                const input = el.querySelector('textarea, input');
                input?.focus();
              }, 400); // enough time for smooth scroll to finish
            }}
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <BiPlus className="w-5 h-5" />
            Create Your First Post
          </button>

          {/* Decorative Elements */}
          <div className="mt-12 flex items-center justify-center gap-2">
            <div
              className="w-2 h-2 bg-blue-300 rounded-full animate-bounce"
              style={{ animationDelay: '0ms' }}
            ></div>
            <div
              className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: '150ms' }}
            ></div>
            <div
              className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: '300ms' }}
            ></div>
          </div>
        </div>
      </div>
    );
  } else {
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

      {/* Middle Section */}
      <div className="col-span-1 md:col-span-7 bg-white flex justify-center md:py-2 md:px-5 ">
        <div className="w-full max-w-5xl md:px-5 px-0 py-2">
          <Stories
            user={user}
            activeStories={stories}
            isStoryLoading={isStoryLoading}
          />
          <CreatePost ref={createPostRef} user={user} />
          <PostFeedToggle activeTab={activeTab} setActiveTab={setActiveTab} />

          {content}
          <div
            ref={loaderRef}
            className="h-10 flex justify-center items-center"
          >
            {isFetching && (
              <span className="text-gray-500">Loading more...</span>
            )}
          </div>
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

export default Home;
