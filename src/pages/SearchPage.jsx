import { CiSearch } from 'react-icons/ci';
import LeftSideBar from '../components/common/LeftSideBar';
import RightSideBar from '../components/common/RightSideBar';
import { useEffect, useMemo, useState } from 'react';
import { useGetAllPostsQuery } from '../redux/api/posts/postsApi';
import { useGetAllUsersQuery } from '../redux/api/users/usersApi';

// Helper: escape regex special chars
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const SearchPage = () => {
  const [text, setText] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const page = 0;
  const limit = 0;

  const { data: postData } = useGetAllPostsQuery(
    { page, limit },
    { refetchOnMountOrArgChange: true }
  );

  const { data: usersData, isLoading } = useGetAllUsersQuery(null, {
    refetchOnMountOrArgChange: true,
  });
  const posts = useMemo(() => postData?.result || [], [postData]);

  const users = useMemo(() => usersData?.response || [], [usersData]);

  // Debounced search state
  const [debouncedText, setDebouncedText] = useState(text);

  // Debounce: update debouncedText after 400ms of no typing
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedText(text), 400);
    return () => clearTimeout(handler);
  }, [text]);

  // Filter posts only when debouncedText changes
  useEffect(() => {
    const trimmed = debouncedText.trim();
    if (trimmed.length === 0) {
      setFilteredPosts([]);
      return;
    }

    const regex = new RegExp(escapeRegex(trimmed), 'gi');
    const foundPostsResults = posts.filter(
      (post) => post?.author?.name?.match(regex) || post?.content?.match(regex)
    );
    if (foundPostsResults.length) {
      setFilteredPosts(foundPostsResults);
    }

    const foundUsers = users.filter((user) => user?.name.match(regex));
    if (foundUsers.length) {
      setFilteredUsers(foundUsers);
    }
  }, [debouncedText, posts, users]);

  console.log(filteredPosts, 'filteredPosts');
  console.log(filteredUsers, 'filteredUsers');

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 bg-gray-100 max-h-screen">
      {/* Left Sidebar */}
      <div className="hidden md:block col-span-3 bg-white">
        <LeftSideBar />
      </div>

      {/* Main Search Area */}
      <div className="col-span-1 md:col-span-7 bg-white flex justify-center md:px-5">
        <div className="w-full py-0 px-5 relative">
          <div className="flex items-center gap-0 sticky top-24 md:top-28 z-10 bg-white">
            <div className="relative w-full  mx-auto">
              <CiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="text"
                placeholder="Search..."
                className="
      w-full pl-12 pr-4 py-3
      border border-gray-300
      rounded-full
      focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
      bg-white
      hover:border-gray-400
      transition-colors
    "
              />
            </div>
          </div>

          {/* Search Results */}
          <div className="relative z-0 mt-5 max-h-[600px] overflow-y-scroll no-scrollbar">
            {/* {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <div
                  key={post._id}
                  className="mb-4 p-3 border rounded bg-gray-50"
                >
                  <p className="font-bold">{post.author.name}</p>
                  <p>{post.content}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No results</p>
            )} */}
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

export default SearchPage;
