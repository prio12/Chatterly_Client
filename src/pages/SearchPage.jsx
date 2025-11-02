import { CiSearch } from 'react-icons/ci';
import LeftSideBar from '../components/common/LeftSideBar';
import { useEffect, useMemo, useState } from 'react';
import { useGetAllPostsQuery } from '../redux/api/posts/postsApi';
import { useGetAllUsersQuery } from '../redux/api/users/usersApi';
import SearchUsersList from '../components/search/SearchUsersList';
import SearchPostsList from '../components/search/SearchPostsList';

// Helper: escape regex special chars
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const SearchPage = () => {
  const [text, setText] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [debouncedText, setDebouncedText] = useState(text);

  const page = 0;
  const limit = 0;

  const { data: postData, isLoading: isPostsDataLoading } = useGetAllPostsQuery(
    { page, limit },
    { refetchOnMountOrArgChange: true }
  );

  const { data: usersData, isLoading: isUsersDataLoading } =
    useGetAllUsersQuery(null, {
      refetchOnMountOrArgChange: true,
    });

  const posts = useMemo(() => postData?.result || [], [postData]);
  const users = useMemo(() => usersData?.response || [], [usersData]);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedText(text), 400);
    return () => clearTimeout(handler);
  }, [text]);

  // Filter logic
  useEffect(() => {
    const trimmed = debouncedText.trim();

    // Reset if input is empty
    if (trimmed.length === 0) {
      setFilteredPosts([]);
      setFilteredUsers([]);
      return;
    }

    const regex = new RegExp(escapeRegex(trimmed), 'gi');

    const foundPostsResults = posts.filter(
      (post) => post?.author?.name?.match(regex) || post?.content?.match(regex)
    );
    const foundUsers = users.filter((user) => user?.name?.match(regex));

    setFilteredPosts(foundPostsResults);
    setFilteredUsers(foundUsers);
  }, [debouncedText, posts, users]);

  // Loader
  if (isUsersDataLoading || isPostsDataLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading...
      </div>
    );
  }

  const noResults =
    debouncedText.trim().length > 0 &&
    filteredPosts.length === 0 &&
    filteredUsers.length === 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 bg-gray-100 max-h-screen">
      {/* Left Sidebar */}
      <div className="hidden md:block col-span-3 bg-white">
        <LeftSideBar />
      </div>

      {/* Main Search Area */}
      <div className="col-span-1 md:col-span-9 bg-white flex justify-center md:px-5">
        <div className="w-full py-0 px-5 relative">
          {/* Search input */}
          <div className="flex items-center gap-0 sticky top-24 md:top-28 z-10 bg-white">
            <div className="relative w-full mx-auto">
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
                  bg-white hover:border-gray-400
                  transition-colors
                "
              />
            </div>
          </div>

          {/* Search Results */}
          <div className="relative z-0 mt-5 max-h-[600px] overflow-y-scroll no-scrollbar">
            {/* Default landing message */}
            {!debouncedText && (
              <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
                <CiSearch className="w-10 h-10 mb-3 text-gray-400" />
                <p className="text-lg font-medium">
                  Search for posts or people
                </p>
                <p className="text-sm text-gray-400">
                  Try typing a name or keyword above
                </p>
              </div>
            )}

            {/* Nothing found */}
            {noResults && (
              <p className="text-gray-500 text-center mt-8">
                No results found for “{debouncedText}”
              </p>
            )}

            {/* Results */}
            {!noResults && debouncedText && (
              <div>
                {filteredUsers.length > 0 && (
                  <div>
                    <h4 className="text-xl font-semibold relative inline-block after:content-[''] after:block after:w-full after:h-[3px] after:bg-blue-400 after:mt-1 mb-5">
                      People
                    </h4>
                    {filteredUsers?.map((user) => (
                      <SearchUsersList key={user?._id} user={user} />
                    ))}
                  </div>
                )}

                {filteredPosts.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-xl font-semibold relative inline-block after:content-[''] after:block after:w-full after:h-[3px] after:bg-blue-400 after:mt-1 mb-5">
                      Posts
                    </h4>
                    {filteredPosts?.map((post) => (
                      <SearchPostsList key={post?._id} post={post} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
