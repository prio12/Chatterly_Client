import { IoHomeOutline, IoPeopleOutline } from 'react-icons/io5';
import { IoSearchOutline } from 'react-icons/io5';
import { IoNotificationsOutline } from 'react-icons/io5';
import { FaRegMessage } from 'react-icons/fa6';
import { Link, NavLink, useLocation } from 'react-router';
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
import SmallScreenDropdown from './smallScreenHeader/SmallScreenSidebar';
import { useGetUserConversationQuery } from '../../redux/api/messaging/messagingApi';

const Header = () => {
  //hooks
  const { currentUser } = useSelector((state) => state.loggedInUser);
  const { data } = useUserInfoByUidQuery(currentUser);
  const user = data?.user;

  const { data: notifications } = useGetUserSpecificNotificationsQuery({
    _id: user?._id,
  });
  const [unseenNotifications, setUnseenNotifications] = useState([]);

  useEffect(() => {
    if (notifications?.response?.length > 0) {
      const unseenNotifications = notifications?.response?.filter(
        (notification) => !notification.seen
      );

      setUnseenNotifications(unseenNotifications);
    }
  }, [notifications]);

  const [handleMarkAsSeen] = useHandleMarkAsSeenMutation();

  const [isOpen, setIsOpen] = useState(false);
  const [isDropDownOpen, setDropDownOpen] = useState(false);
  const location = useLocation();
  const socket = useContext(SocketContext);

  // State to hold user conversations for calculating unread badge
  const [chatLists, setChatLists] = useState([]);
  const [convoBadgeCount, setConvoBadgeCount] = useState(0);

  const handleDropdown = () => {
    setDropDownOpen(!isDropDownOpen);
  };

  useEffect(() => {
    socket.on('notification', (savedNotification) => {
      setUnseenNotifications([...unseenNotifications, savedNotification]);
    });
  }, [socket, unseenNotifications]);

  useEffect(() => {
    setDropDownOpen(false);
  }, [location]);

  // Mark Notifications as Seen
  const markAsSeen = async () => {
    if (user?._id) {
      await handleMarkAsSeen({ _id: user?._id });
    }
  };

  //fetching chatList
  const { data: userConversations } = useGetUserConversationQuery(
    { id: user?._id },
    { skip: !user?._id, refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (userConversations?.conversations?.length > 0) {
      setChatLists(userConversations?.conversations);
    }
  }, [userConversations?.conversations]);

  // Calculate the number of conversations with unread messages for the current user
  useEffect(() => {
    if (!chatLists?.length) return;

    const unreadConversations = chatLists?.filter(
      (c) => c?.unreadCounts[user?._id] > 0
    );

    setConvoBadgeCount(unreadConversations?.length);
  }, [chatLists, user?._id]);

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
          <NavLink
            to="/"
            title="Home"
            className={({ isActive }) =>
              `relative hover:after:bg-blue-500 after:absolute after:h-[4px] after:w-full after:bottom-[-10px] after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${
                isActive ? 'after:scale-x-100 after:bg-blue-500' : ''
              }`
            }
          >
            <IoHomeOutline />
          </NavLink>
          <NavLink
            to="/chats"
            title="Chats"
            className={({ isActive }) =>
              `relative hover:after:bg-blue-500 after:absolute after:h-[4px] after:w-full after:bottom-[-10px] after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${
                isActive ? 'after:scale-x-100 after:bg-blue-500' : ''
              }`
            }
          >
            <FaRegMessage />
            {convoBadgeCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[18px] text-center">
                {convoBadgeCount >= 9 ? '9+' : convoBadgeCount}
              </span>
            )}
          </NavLink>

          <NavLink
            onClick={markAsSeen}
            to={`/notifications/${user?._id}`}
            title="Notifications"
            className={({ isActive }) =>
              `relative hover:after:bg-blue-500 after:absolute after:h-[4px] after:w-full after:bottom-[-10px] after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${
                isActive ? 'after:scale-x-100 after:bg-blue-500' : ''
              }`
            }
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
          </NavLink>

          <NavLink
            to="/connections"
            title="Connections"
            className={({ isActive }) =>
              `relative hover:after:bg-blue-500 after:absolute after:h-[4px] after:w-full after:bottom-[-10px] after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${
                isActive ? 'after:scale-x-100 after:bg-blue-500' : ''
              }`
            }
          >
            <IoPeopleOutline className="text-2xl" />
          </NavLink>
          <Link
            title="Search"
            className="relative hover:after:bg-blue-500 after:absolute after:h-[4px] after:w-full after:bottom-[-10px] after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            <IoSearchOutline className="text-xl" />
          </Link>
        </div>
        <div className="cursor-pointer">
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
        markAsSeen={markAsSeen}
        convoBadgeCount={convoBadgeCount}
      />

      {/* drawer for small screen */}
      <SmallScreenDropdown />
    </div>
  );
};

export default Header;
