import { useSelector } from 'react-redux';
import { useUserInfoByUidQuery } from '../redux/api/users/usersApi';
import LeftSideBar from '../components/common/LeftSideBar';
import RightSideBar from '../components/common/RightSideBar';
import Videos from '../components/profile/Videos';
import { MdOndemandVideo } from 'react-icons/md';
import MyVideosSkeletonLoader from '../components/loaders/MyVideosSkeletonLoader';
import { useFetchConnectionSuggestionsQuery } from '../redux/api/connections/connectionsApi';

const MyVideos = () => {
  const { currentUser } = useSelector((state) => state.loggedInUser);
  const { data, isLoading } = useUserInfoByUidQuery(currentUser);
  const user = data?.user;

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

      {/* Main Content */}
      <div className="col-span-1 md:col-span-7 bg-white flex justify-center md:py-5 md:px-5">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="mb-8  px-5 ">
            <div className="flex items-center gap-3">
              <MdOndemandVideo className="text-blue-500 text-4xl" />
              <h2 className="text-2xl font-bold border-b-4 pb-3 border-blue-600">
                My Videos
              </h2>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              All your uploaded videos are stored here. Keep your memories
              organized!
            </p>
          </div>

          {/* Main Media Content */}
          {isLoading ? (
            <MyVideosSkeletonLoader count={4} showAddButton={true} />
          ) : (
            <div className="bg-white  ">
              <Videos currentUserData={user} user={user} />
            </div>
          )}
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

export default MyVideos;
