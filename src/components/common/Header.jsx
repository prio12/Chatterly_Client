import { IoHomeOutline, IoPeopleOutline } from 'react-icons/io5';
import { IoSearchOutline } from 'react-icons/io5';
import { IoAlbumsOutline } from 'react-icons/io5';
import { IoNotificationsOutline } from 'react-icons/io5';
import { FaRegMessage } from 'react-icons/fa6';
import { SlPeople } from 'react-icons/sl';
import { Link } from 'react-router';
import cIcon from '../../assets/icon/letter-c (1).png';
import { RiMenu2Fill } from 'react-icons/ri';
import { LuMenu } from 'react-icons/lu';
import { IoIosSearch, IoMdClose } from 'react-icons/io';
import { CiSettings, CiViewTimeline } from 'react-icons/ci';
import {
  MdOutlineOndemandVideo,
  MdOutlinePhotoSizeSelectActual,
} from 'react-icons/md';

const Header = () => {
  return (
    <div className="sticky top-0 z-50 bg-white">
      <div className="h-16 hidden md:flex lg:flex justify-between p-5">
        <div className="w-12">
          <Link to="/">
            {' '}
            <img src={cIcon} className="w-full" alt="" />
          </Link>
        </div>
        <div className="text-xl flex ms-24 items-center gap-12">
          <Link
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
            <SlPeople />
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <IoSearchOutline />
          <div className="avatar">
            <div className="mask mask-squircle w-10">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
        </div>
      </div>
      {/* header for small screen */}
      <div className=" md:hidden flex items-center sticky top-0 justify-between lg:hidden py-4 px-2 w-full ">
        <label htmlFor="my-drawer">
          <RiMenu2Fill className="text-xl" />
        </label>
        <div className="w-12">
          <img src={cIcon} className="w-full" alt="" />
        </div>
        <div>
          <LuMenu className="text-xl" />
        </div>
        <div>
          <IoIosSearch className="text-xl" />
        </div>
        <div className="avatar">
          <div className="mask mask-squircle w-10">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
      </div>
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
