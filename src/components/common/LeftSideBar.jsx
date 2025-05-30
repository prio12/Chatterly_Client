import { RiMenu2Fill } from 'react-icons/ri';
import { CiSettings, CiViewTimeline } from 'react-icons/ci';
import {
  MdOutlineOndemandVideo,
  MdOutlinePhotoSizeSelectActual,
} from 'react-icons/md';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router';

const LeftSideBar = () => {
  // State to manage whether the sidebar is expanded
  const [isExpanded, setIsExpanded] = useState(false);

  // hooks
  const { currentUser } = useSelector((state) => state.loggedInUser);

  // Toggle sidebar width
  const toggleSidebarWidth = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`${
        isExpanded ? 'w-48 ' : 'w-16 '
      } fixed left-0 h-full  transition-all duration-300 ease-in-out overflow-hidden`}
      style={{ transitionProperty: 'width' }}
    >
      {/* <RiMenu2Fill onClick={toggleSidebarWidth} className="ms-8 mt-[-12px]" /> */}
      <div className="text-2xl flex flex-col ps-5  justify-evenly cursor-pointer gap-12">
        {/* Menu Toggle */}
        <RiMenu2Fill
          onClick={toggleSidebarWidth}
          className="mt-5 ms-2 md:block lg:block hidden"
        />

        {/* Grid layout for icons and corresponding text */}
        <NavLink
          to={`/profile/${currentUser}`}
          className={({ isActive }) =>
            `grid grid-cols-[auto,_1fr] gap-2 items-center ${
              isActive && 'text-blue-600'
            }`
          }
        >
          <div className="cursor-pointer flex justify-center hover:text-blue-500 hover:bg-gray-100 p-2 rounded-md transition-all">
            <CiViewTimeline />
          </div>
          {isExpanded && (
            <span className="text-sm font-semibold hover:text-blue-500 transition-all">
              Profile
            </span>
          )}
        </NavLink>

        <NavLink
          to="/myAlbums"
          className={({ isActive }) =>
            `grid grid-cols-[auto,_1fr] gap-2 items-center ${
              isActive && 'text-blue-600'
            }`
          }
        >
          <div className="cursor-pointer flex justify-center hover:text-blue-500 hover:bg-gray-100 p-2 rounded-md transition-all">
            <MdOutlinePhotoSizeSelectActual />
          </div>
          {isExpanded && (
            <span className="text-sm font-semibold hover:text-blue-500 transition-all">
              Albums
            </span>
          )}
        </NavLink>

        <NavLink
          to="/myVideos"
          className={({ isActive }) =>
            `grid grid-cols-[auto,_1fr] gap-2 items-center ${
              isActive && 'text-blue-600'
            }`
          }
        >
          <div className="cursor-pointer flex justify-center hover:text-blue-500 hover:bg-gray-100 p-2 rounded-md transition-all">
            <MdOutlineOndemandVideo />
          </div>
          {isExpanded && (
            <span className="text-sm font-semibold hover:text-blue-500 transition-all">
              Videos
            </span>
          )}
        </NavLink>

        <div className="grid grid-cols-[auto,_1fr] gap-2 items-center">
          <div className="cursor-pointer flex justify-center hover:text-blue-500 hover:bg-gray-100 p-2 rounded-md transition-all">
            <CiSettings />
          </div>
          {isExpanded && (
            <span className="text-sm font-semibold hover:text-blue-500 transition-all">
              Settings
            </span>
          )}
        </div>
        <div className="grid grid-cols-[auto,_1fr] gap-2 items-center">
          <div className="cursor-pointer flex justify-center hover:text-blue-500 hover:bg-gray-100 p-2 rounded-md transition-all">
            <CiSettings />
          </div>
          {isExpanded && (
            <span className="text-sm font-semibold hover:text-blue-500 transition-all">
              Bookmarks
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
