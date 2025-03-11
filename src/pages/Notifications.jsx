import { useNavigate, useParams } from 'react-router';
import LeftSideBar from '../components/common/LeftSideBar';
import RightSideBar from '../components/common/RightSideBar';
import {
  useGetUserSpecificNotificationsQuery,
  useHandleDeleteMutation,
} from '../redux/api/notifications/notificationsApi';
import { IoNotificationsOffOutline } from 'react-icons/io5';
import { FaHeart } from 'react-icons/fa6';
import { MdDelete, MdOutlineInsertComment } from 'react-icons/md';
import DefaultProfilePIcture from '../components/profile/DefaultProfilePIcture';
import { formatDistanceToNow } from 'date-fns';

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

  const [deleteNotification] = useHandleDeleteMutation();
  const navigate = useNavigate();

  let content;

  const handleDelete = async (_id) => {
    await deleteNotification({ _id });
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
      <div>
        <div className="w-full">
          <h3 className="text-3xl font-semibold fixed top-24 left-1/4  z-50 bg-gray-50 mb-5 p-2">
            Notifications
          </h3>
        </div>
        <div className="fixed top-44 max-h-[600px] overflow-y-scroll no-scrollbar">
          {notifications?.response?.map((notification) => {
            return (
              <div
                className={`flex items-center gap-5 p-5 rounded-lg ${
                  notification?.read ? 'bg-slate-50' : 'bg-slate-200'
                } mb-5`}
                key={notification._id}
              >
                <div onClick={handleNavigate} className="cursor-pointer">
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

                    {/* Heart Icon as Indicator */}
                    {notification?.type === 'like' ? (
                      <FaHeart className="absolute bottom-[-6px] right-[-6px] text-red-500 text-xl" />
                    ) : (
                      <MdOutlineInsertComment className="absolute bottom-[-6px] right-[-6px] text-red-500 text-xl" />
                    )}
                  </div>
                </div>
                <div>
                  <h5
                    onClick={handleNavigate}
                    className="text-sm cursor-pointer"
                  >
                    <span className="font-semibold">
                      {notification?.sender?.name}
                    </span>{' '}
                    {notification?.type === 'like' ? (
                      <span> reacted to a post you shared</span>
                    ) : (
                      <span>commented on a post you shared</span>
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
      <div className=" py-10 ">
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

      <div className="col-span-1 sticky top-4 md:col-span-7 bg-white p-2 md:py-2 md:px-5">
        {content}
      </div>

      {/* Right Sidebar */}
      <div className="hidden md:block col-span-2 bg-white">
        <RightSideBar />
      </div>
    </div>
  );
};

export default Notifications;
