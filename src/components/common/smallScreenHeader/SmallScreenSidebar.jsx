import { CiViewTimeline } from 'react-icons/ci';
import { FaRegMessage } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';
import { IoPeopleOutline } from 'react-icons/io5';
import { MdOutlineOndemandVideo } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router';

const SmallScreenDropdown = () => {
  //hooks
  const { currentUser } = useSelector((state) => state.loggedInUser);

  return (
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
                  <span className="text-sm font-semibold hover:text-blue-500 transition-all">
                    Feed
                  </span>
                </NavLink>

                <NavLink
                  to="/chats"
                  className={({ isActive }) => `${isActive && 'text-blue-500'}`}
                >
                  <div className="grid grid-cols-[auto,_1fr] gap-2 items-center">
                    <div className="cursor-pointer flex justify-center hover:text-blue-500 hover:bg-gray-100 p-2 rounded-md transition-all">
                      <FaRegMessage />
                    </div>
                    <span className="text-sm font-semibold hover:text-blue-500 transition-all">
                      Chats
                    </span>
                  </div>
                </NavLink>

                <NavLink
                  to="/connections"
                  className={({ isActive }) => `${isActive && 'text-blue-500'}`}
                >
                  <div className="grid grid-cols-[auto,_1fr] gap-2 items-center">
                    <div className="cursor-pointer flex justify-center hover:text-blue-500 hover:bg-gray-100 p-2 rounded-md transition-all">
                      <IoPeopleOutline />
                    </div>
                    <span className="text-sm font-semibold hover:text-blue-500 transition-all">
                      Connections
                    </span>
                  </div>
                </NavLink>

                {/* <div className="grid grid-cols-[auto,_1fr] gap-2 items-center">
                  <div className="cursor-pointer flex justify-center hover:text-blue-500 hover:bg-gray-100 p-2 rounded-md transition-all">
                    <IoNotificationsOutline />
                  </div>
                  <span className="text-sm font-semibold hover:text-blue-500 transition-all">
                    Notifications
                  </span>
                </div> */}

                <div className="grid grid-cols-[auto,_1fr] gap-2 items-center">
                  <div className="cursor-pointer flex justify-center hover:text-blue-500 hover:bg-gray-100 p-2 rounded-md transition-all">
                    <MdOutlineOndemandVideo />
                  </div>
                  <span className="text-sm font-semibold hover:text-blue-500 transition-all">
                    Bookmarks
                  </span>
                </div>

                {/* <div className="grid grid-cols-[auto,_1fr] gap-2 items-center">
                  <div className="cursor-pointer flex justify-center hover:text-blue-500 hover:bg-gray-100 p-2 rounded-md transition-all">
                    <CiSettings />
                  </div>
                  <span className="text-sm font-semibold hover:text-blue-500 transition-all">
                    Settings
                  </span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmallScreenDropdown;
