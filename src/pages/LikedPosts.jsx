import { useSelector } from 'react-redux';
import LeftSideBar from '../components/common/LeftSideBar';
import RightSideBar from '../components/common/RightSideBar';
import { useUserInfoByUidQuery } from '../redux/api/users/usersApi';
import { useFetchConnectionSuggestionsQuery } from '../redux/api/connections/connectionsApi';

const LikedPosts = () => {
  const { currentUser } = useSelector((state) => state.loggedInUser);
  const { data: userData } = useUserInfoByUidQuery(currentUser);

  const user = userData?.user;

  const {
    data: suggestedConnectionsData,
    isLoading: suggestedCOnnectionsDataIsLoading,
  } = useFetchConnectionSuggestionsQuery(user?._id, {
    refetchOnMountOrArgChange: true,
    skip: !user?._id,
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 bg-gray-100 min-h-screen">
      {/* Left Sidebar */}
      <div className="hidden md:block col-span-3 bg-white">
        <LeftSideBar />
      </div>

      <div className="col-span-1 md:col-span-7 bg-white flex justify-center md:py-2 md:px-5 ">
        <div className="w-full max-w-5xl md:px-5 px-0 py-2">
          {/* content */}
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
