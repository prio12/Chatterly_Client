import { RiMenu2Fill } from 'react-icons/ri';
import { IoHomeOutline } from 'react-icons/io5';
import { IoSearchOutline } from 'react-icons/io5';
import { IoAlbumsOutline } from 'react-icons/io5';
import { IoNotificationsOutline } from 'react-icons/io5';
import { FaRegMessage } from 'react-icons/fa6';
import { SlPeople } from 'react-icons/sl';
import { Link } from 'react-router';

const Header = () => {
  return (
    <div>
      <div className="h-16 hidden md:flex lg:flex justify-between p-5">
        <div className="text-2xl none">
          <RiMenu2Fill />
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
    </div>
  );
};

export default Header;
