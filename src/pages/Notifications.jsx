import { Link, useNavigate, useParams } from 'react-router';
import LeftSideBar from '../components/common/LeftSideBar';
import RightSideBar from '../components/common/RightSideBar';
import {
  useGetUserSpecificNotificationsQuery,
  useHandleDeleteMutation,
  useHandleMarkAsReadMutation,
} from '../redux/api/notifications/notificationsApi';
import { IoNotificationsOffOutline } from 'react-icons/io5';
import { FaHeart } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';
import DefaultProfilePIcture from '../components/profile/DefaultProfilePIcture';
import { formatDistanceToNow } from 'date-fns';
import { FaCommentAlt, FaUserFriends } from 'react-icons/fa';
import { useFetchConnectionSuggestionsQuery } from '../redux/api/connections/connectionsApi';

const Notifications = () => {
  //hooks
  const { id } = useParams();
  const {
    data: notifications,
    isLoading,
    isError,
  } = useGetUserSpecificNotificationsQuery({
    _id: id,
  });

  const {
    data: suggestedConnectionsData,
    isLoading: suggestedCOnnectionsDataIsLoading,
  } = useFetchConnectionSuggestionsQuery(id, {
    refetchOnMountOrArgChange: true,
    skip: !id,
  });

  const [deleteNotification] = useHandleDeleteMutation();
  const [marksAsRead] = useHandleMarkAsReadMutation();
  const navigate = useNavigate();

  let content;

  const handleDelete = async (_id) => {
    await deleteNotification({ _id });
  };

  const handleMarkAsRead = async ({ _id }) => {
    await marksAsRead({ _id });
  };

  // Converts createdAt timestamp into a human-readable relative time format.
  const timeAgo = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  const handleNavigate = (id) => {
    navigate(`/posts/${id}`);
  };
  if (isLoading) {
    content = <div>Loading...</div>;
  }

  if (!isLoading && isError) {
    content = <div>Something went wrong!</div>;
  }

  if (!isLoading && !isError && notifications?.response?.length > 0) {
    content = (
      <div className="sticky top-24 md:top-28 lg:top-28">
        <div className="w-full">
          <h3 className="text-3xl font-semibold  border-b-2 border-blue-400 pb-2 z-50 bg-gray-50 mb-5 p-2">
            Notifications
          </h3>
        </div>
        <div className="fixed top-44 max-h-[600px] overflow-y-scroll no-scrollbar">
          {notifications?.response?.map((notification) => {
            return (
              <div
                onClick={() => handleMarkAsRead({ _id: notification?._id })}
                className={`flex items-center gap-5 shadow-sm hover:shadow-md p-5 rounded-lg ${
                  notification?.read ? 'bg-slate-100' : 'bg-slate-200'
                } mb-5`}
                key={notification._id}
              >
                <div>
                  <div className="relative inline-block ">
                    {/* Avatar Section */}
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      {notification?.sender?.profilePicture ? (
                        <img
                          className="object-cover w-full h-full"
                          src={notification?.sender?.profilePicture}
                          alt="Avatar"
                        />
                      ) : (
                        <div className="w-12 h-12">
                          <DefaultProfilePIcture />
                        </div>
                      )}
                    </div>
                    {notification?.type === 'like' && (
                      <FaHeart className="absolute bottom-[-6px] right-[-6px] text-red-500 text-xl" />
                    )}
                    {notification?.type === 'comment' && (
                      <FaCommentAlt className="absolute bottom-[-6px] right-[-6px] text-red-500 text-xl" />
                    )}
                    {notification?.type === 'connection_request' && (
                      <FaUserFriends className="absolute bottom-[-6px] right-[-6px] text-red-500 text-xl" />
                    )}
                    {notification?.type === 'connection_accept' && (
                      <FaUserFriends className="absolute bottom-[-6px] right-[-6px] text-red-500 text-xl" />
                    )}
                  </div>
                </div>
                <div>
                  <h5 className="text-sm ">
                    <span className="font-semibold mr-2">
                      {notification?.sender?.name}
                    </span>
                    {notification?.type === 'like' && (
                      <span
                        className="cursor-pointer"
                        onClick={() => handleNavigate(notification?.post?._id)}
                      >
                        {' '}
                        reacted to a post you shared!
                      </span>
                    )}
                    {notification?.type === 'comment' && (
                      <span
                        className="cursor-pointer"
                        onClick={() => handleNavigate(notification?.post?._id)}
                      >
                        commented on a post you shared!
                      </span>
                    )}
                    {notification?.type === 'connection_request' && (
                      <Link to="/connections">
                        <span className="cursor-pointer">
                          Sent you a connection request!
                        </span>
                      </Link>
                    )}
                    {notification?.type === 'connection_accept' && (
                      <Link to={`/profile/${notification?.sender?.uid}`}>
                        <span className="cursor-pointer">
                          Accepted your connection request!
                        </span>
                      </Link>
                    )}
                  </h5>
                  <div>
                    <small className="text-xs">
                      {timeAgo(notification?.createdAt)}
                    </small>
                    <MdDelete
                      onClick={() => handleDelete(notification?._id)}
                      className="inline ms-5 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  if (!isLoading && !isError && notifications?.response?.length < 1) {
    content = (
      <div className=" py-10 sticky top-24">
        <IoNotificationsOffOutline className="text-5xl text-gray-400 mb-4" />
        <h2 className="text-xl text-gray-500 font-semibold">
          No notifications yet!
        </h2>
        <p className="text-gray-400">
          It seems like you have no new notifications. Stay tuned!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 relative  md:grid-cols-12 gap-5 bg-gray-100 min-h-screen">
      {/* Left Sidebar */}
      <div className="hidden md:block col-span-3 bg-white">
        <LeftSideBar />
      </div>

      <div className="col-span-1  md:col-span-7 bg-white p-2 md:py-2 md:px-5 relative">
        {content}
      </div>

      {/* Right Sidebar */}
      <div className="hidden md:block col-span-2 bg-white">
        <RightSideBar
          suggestedCOnnectionsDataIsLoading={suggestedCOnnectionsDataIsLoading}
          suggestedConnectionsData={suggestedConnectionsData}
        />
      </div>
    </div>
  );
};

export default Notifications;
