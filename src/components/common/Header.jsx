import { IoHomeOutline, IoPeopleOutline } from 'react-icons/io5';
import { IoSearchOutline } from 'react-icons/io5';
import { IoAlbumsOutline } from 'react-icons/io5';
import { IoNotificationsOutline } from 'react-icons/io5';
import { FaRegMessage } from 'react-icons/fa6';
import { Link, useLocation } from 'react-router';
import cIcon from '../../assets/icon/letter-c (1).png';
import { RiMenu2Fill } from 'react-icons/ri';
import { LuMenu } from 'react-icons/lu';
import { IoIosSearch, IoMdClose } from 'react-icons/io';
import { CiSettings, CiViewTimeline } from 'react-icons/ci';
import {
  MdOutlineOndemandVideo,
  MdOutlinePhotoSizeSelectActual,
} from 'react-icons/md';
import { useEffect, useState } from 'react';
import AvatarDropDownContent from '../../utilities/AvatarDropDownContent';
import { useSelector } from 'react-redux';
import { useUserInfoByUidQuery } from '../../redux/api/users/usersApi';
import DefaultProfilePIcture from '../profile/DefaultProfilePIcture';

const Header = () => {
  //hooks
  const { currentUser } = useSelector((state) => state.loggedInUser);
  const { data } = useUserInfoByUidQuery(currentUser);
  const user = data?.user;

  const [isOpen, setIsOpen] = useState(false);
  const [isDropDownOpen, setDropDownOpen] = useState(false);
  const location = useLocation();

  const handleDropdown = () => {
    setDropDownOpen(!isDropDownOpen);
  };

  useEffect(() => {
    setDropDownOpen(false);
  }, [location]);

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
            title="Notifications"
            className="relative hover:after:bg-blue-500 after:absolute after:h-[4px] after:w-full after:bottom-[-10px] after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            <IoNotificationsOutline />
          </Link>
          <Link
            title="Friends"
            className="relative hover:after:bg-blue-500 after:absolute after:h-[4px] after:w-full after:bottom-[-10px] after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            <IoPeopleOutline className="text-xl" />
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
      <div className=" md:hidden  flex items-center sticky top-0  justify-between lg:hidden  w-full ">
        <label htmlFor="my-drawer">
          <RiMenu2Fill className="text-xl" />
        </label>
        <Link to="/">
          <div className="w-12">
            <img src={cIcon} className="w-full" alt="" />
          </div>
        </Link>
        <div>
          {/* Menu Button */}
          <div>
            <LuMenu
              // onClick={() => setIsOpen(true)}
              onClick={() => {
                if (isDropDownOpen) {
                  handleDropdown();
                }
                setIsOpen(true);
              }}
              className="text-xl cursor-pointer"
            />
          </div>

          {/* Drawer */}
          <div
            className={`fixed top-0 left-0 w-full h-72  z-50 bg-gray-100 shadow-md transform transition-transform 
                duration-300 ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}
          >
            <div className="p-5 w-1/2 mx-auto relative">
              <div className="grid grid-cols-1 ms-2 gap-5 pt-2">
                <Link to="/">
                  <div
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-2"
                  >
                    <IoHomeOutline className="text-xl" />
                    <span>Home</span>
                  </div>
                </Link>
                <div
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-2"
                >
                  <IoAlbumsOutline className="text-xl" />
                  <span>Albums</span>
                </div>
                <div
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-2"
                >
                  <FaRegMessage className="text-xl" />
                  <span>Chats</span>
                </div>
                <div
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-2"
                >
                  <IoAlbumsOutline className="text-xl" />
                  <span>Notifications</span>
                </div>
                <div
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-2"
                >
                  <IoPeopleOutline className="text-xl" />
                  <span>Connections</span>
                </div>
                {/* Add more items as needed */}
              </div>

              {/* Close Icon with Enhanced Styling and Animations */}
              <IoMdClose
                onClick={() => setIsOpen(false)}
                className="text-4xl absolute bottom-[-38px] left-1/2 transform -translate-x-1/2 text-gray-800 hover:text-gray-900 transition-all duration-300 p-2 bg-white rounded-full shadow-lg hover:scale-125 hover:rotate-180"
              />
            </div>
          </div>
        </div>

        <div>
          <IoIosSearch className="text-xl" />
        </div>
        <div className="avatar relative cursor-pointer">
          <div onClick={handleDropdown} className="mask mask-squircle w-10">
            {user?.profilePicture ? (
              <img
                src={user.profilePicture}
                alt="User Profile"
                className="w-full object-cover"
              />
            ) : (
              <DefaultProfilePIcture /> // Shows the default avatar if no profile picture
            )}
          </div>
        </div>
        {isDropDownOpen && (
          <div className="w-3/4 p-5 bg-slate-100 shadow-md hover:shadow-xl z-50 absolute right-8 top-16">
            <AvatarDropDownContent user={user} />
          </div>
        )}
      </div>
      {/* dropdown drawer */}

      {/* drawer for small screen */}
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">{/* Page content here */}</div>

        <div className="drawer-side">
          <div className="bg-gray-100 relative">
            {/* Close Icon Positioned in Top-Right */}
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="absolute top-2 right-2 cursor-pointer"
            >
              <div className="p-2 bg-white/50 backdrop-blur-sm rounded-full hover:bg-white/70 transition-all shadow-lg">
                <IoMdClose className="text-2xl text-gray-800 hover:text-gray-900 transition-transform duration-300 hover:scale-110 hover:rotate-90" />
              </div>
            </label>

            <div className="p-5 my-12 bg-gray-100">
              <div>
                <div className="text-2xl flex flex-col ps-5 justify-evenly cursor-pointer gap-12">
                  {/* Grid layout for icons and corresponding text */}
                  <div className="grid grid-cols-[auto,_1fr] gap-2 items-center">
                    <div className="cursor-pointer flex justify-center hover:text-blue-500 hover:bg-gray-100 p-2 rounded-md transition-all">
                      <CiViewTimeline />
                    </div>
                    <span className="text-sm font-semibold hover:text-blue-500 transition-all">
                      Feed
                    </span>
                  </div>

                  <div className="grid grid-cols-[auto,_1fr] gap-2 items-center">
                    <div className="cursor-pointer flex justify-center hover:text-blue-500 hover:bg-gray-100 p-2 rounded-md transition-all">
                      <IoPeopleOutline />
                    </div>
                    <span className="text-sm font-semibold hover:text-blue-500 transition-all">
                      Connections
                    </span>
                  </div>

                  <div className="grid grid-cols-[auto,_1fr] gap-2 items-center">
                    <div className="cursor-pointer flex justify-center hover:text-blue-500 hover:bg-gray-100 p-2 rounded-md transition-all">
                      <IoNotificationsOutline />
                    </div>
                    <span className="text-sm font-semibold hover:text-blue-500 transition-all">
                      Notifications
                    </span>
                  </div>

                  <div className="grid grid-cols-[auto,_1fr] gap-2 items-center">
                    <div className="cursor-pointer flex justify-center hover:text-blue-500 hover:bg-gray-100 p-2 rounded-md transition-all">
                      <MdOutlinePhotoSizeSelectActual />
                    </div>
                    <span className="text-sm font-semibold hover:text-blue-500 transition-all">
                      Albums
                    </span>
                  </div>

                  <div className="grid grid-cols-[auto,_1fr] gap-2 items-center">
                    <div className="cursor-pointer flex justify-center hover:text-blue-500 hover:bg-gray-100 p-2 rounded-md transition-all">
                      <MdOutlineOndemandVideo />
                    </div>
                    <span className="text-sm font-semibold hover:text-blue-500 transition-all">
                      Videos
                    </span>
                  </div>

                  <div className="grid grid-cols-[auto,_1fr] gap-2 items-center">
                    <div className="cursor-pointer flex justify-center hover:text-blue-500 hover:bg-gray-100 p-2 rounded-md transition-all">
                      <CiSettings />
                    </div>
                    <span className="text-sm font-semibold hover:text-blue-500 transition-all">
                      Settings
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
