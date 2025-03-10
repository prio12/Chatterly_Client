/* eslint-disable react/prop-types */
import { FaRegMessage } from 'react-icons/fa6';
import { IoIosSearch, IoMdClose } from 'react-icons/io';
import {
  IoAlbumsOutline,
  IoHomeOutline,
  IoPeopleOutline,
} from 'react-icons/io5';
import { LuMenu } from 'react-icons/lu';
import { RiMenu2Fill } from 'react-icons/ri';
import { Link } from 'react-router';
import DefaultProfilePIcture from '../../profile/DefaultProfilePIcture';
import AvatarDropDownContent from '../../../utilities/AvatarDropDownContent';

const SmallScreenHeader = ({
  setIsOpen,
  isOpen,
  isDropDownOpen,
  handleDropdown,
  cIcon,
  user,
}) => {
  return (
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
  );
};

export default SmallScreenHeader;
