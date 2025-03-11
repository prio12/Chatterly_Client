import { IoHomeOutline, IoPeopleOutline } from 'react-icons/io5';
import { IoSearchOutline } from 'react-icons/io5';
import { IoAlbumsOutline } from 'react-icons/io5';
import { IoNotificationsOutline } from 'react-icons/io5';
import { FaRegMessage } from 'react-icons/fa6';
import { Link, useLocation } from 'react-router';
import cIcon from '../../assets/icon/letter-c (1).png';
import { useContext, useEffect, useState } from 'react';
import AvatarDropDownContent from '../../utilities/AvatarDropDownContent';
import { useSelector } from 'react-redux';
import { useUserInfoByUidQuery } from '../../redux/api/users/usersApi';
import DefaultProfilePIcture from '../profile/DefaultProfilePIcture';
import SocketContext from '../../context/SocketContext';
import {
  useGetUserSpecificNotificationsQuery,
  useHandleMarkAsSeenMutation,
} from '../../redux/api/notifications/notificationsApi';
import SmallScreenHeader from './smallScreenHeader/SmallScreenHeader';
import SmallScreenDropdown from './smallScreenHeader/SmallScreenDropdown';

const Header = () => {
  //hooks
  const { currentUser } = useSelector((state) => state.loggedInUser);
  const { data } = useUserInfoByUidQuery(currentUser);
  const user = data?.user;
  const { data: notifications } = useGetUserSpecificNotificationsQuery({
    _id: user?._id,
  });
  const [handleMarkAsSeen] = useHandleMarkAsSeenMutation();
  const [unseenNotifications, setUnseenNotifications] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [isDropDownOpen, setDropDownOpen] = useState(false);
  const location = useLocation();
  const socket = useContext(SocketContext);

  const handleDropdown = () => {
    setDropDownOpen(!isDropDownOpen);
  };

  useEffect(() => {
    if (notifications?.response?.length > 0) {
      const unseenNotifications = notifications?.response?.filter(
        (notification) => !notification.seen
      );

      setUnseenNotifications(unseenNotifications);
    }
  }, [notifications]);

  useEffect(() => {
    socket.on('likedNotification', (savedNotification) => {
      // console.log(savedNotification); //getting the latest notification with _id
      setUnseenNotifications([...unseenNotifications, savedNotification]);
    });
  }, [socket, unseenNotifications]);

  useEffect(() => {
    setDropDownOpen(false);
  }, [location]);

  // Mark Notifications as Seen
  const markAsSeen = () => {
    if (user?._id) {
      handleMarkAsSeen({ _id: user._id });
    }
  };

  return (
    <div className="md:p-5 px-2  py-5 z-50 bg-white">
      <div className="h-16 hidden relative md:flex lg:flex justify-between ">
        <div className="w-12">
          <Link to="/">
            {' '}
            <img src={cIcon} className="w-full cursor-pointer" alt="" />
          </Link>
        </div>
        <div className="text-xl flex ms-24 items-center gap-12">
          <Link
            to="/"
            title="Home"
            className="relative hover:after:bg-blue-500 after:absolute after:h-[4px] after:w-full after:bottom-[-10px] after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            <IoHomeOutline />
          </Link>
          <Link
            title="Albums"
            className="relative hover:after:bg-blue-500 after:absolute after:h-[4px] after:w-full after:bottom-[-10px] after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            <IoAlbumsOutline />
          </Link>
          <Link
            title="Chats"
            className="relative hover:after:bg-blue-500 after:absolute after:h-[4px] after:w-full after:bottom-[-10px] after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            <FaRegMessage />
          </Link>

          <Link
            onClick={markAsSeen}
            to={`/notifications/${user?._id}`}
            title="Notifications"
            className="relative hover:after:bg-blue-500 after:absolute after:h-[4px] after:w-full after:bottom-[-10px] after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            {/* Notification Icon */}
            <IoNotificationsOutline className="text-2xl" />

            {/* Notification Badge (Only Shows if Unseen Notifications Exist) */}
            {unseenNotifications.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[18px] text-center">
                {unseenNotifications.length >= 9
                  ? '9+'
                  : unseenNotifications.length}
              </span>
            )}
          </Link>

          <Link
            title="Friends"
            className="relative hover:after:bg-blue-500 after:absolute after:h-[4px] after:w-full after:bottom-[-10px] after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            <IoPeopleOutline className="text-2xl" />
          </Link>
        </div>
        <div className="flex items-center cursor-pointer gap-3">
          <IoSearchOutline />
          <div className="avatar cursor-pointer">
            <div onClick={handleDropdown} className="mask mask-squircle w-10">
              {user?.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt="User Profile"
                  className="w-full object-cover"
                />
              ) : (
                <DefaultProfilePIcture />
              )}
            </div>
          </div>
        </div>
        {/* dropdownContent */}
        {isDropDownOpen && (
          <div className="w-1/4 z-50 bg-slate-100 shadow-md hover:shadow-xl  absolute top-14 right-12 p-5 ">
            <AvatarDropDownContent user={user} />
          </div>
        )}
      </div>
      {/* header for small screen */}
      <SmallScreenHeader
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isDropDownOpen={isDropDownOpen}
        handleDropdown={handleDropdown}
        cIcon={cIcon}
        user={user}
        unseenNotifications={unseenNotifications}
      />

      {/* drawer for small screen */}
      <SmallScreenDropdown />
    </div>
  );
};

export default Header;
