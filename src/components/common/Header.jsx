import { IoHomeOutline } from 'react-icons/io5';
import { IoSearchOutline } from 'react-icons/io5';
import { IoAlbumsOutline } from 'react-icons/io5';
import { IoNotificationsOutline } from 'react-icons/io5';
import { FaRegMessage } from 'react-icons/fa6';
import { SlPeople } from 'react-icons/sl';
import { Link } from 'react-router';
import cIcon from '../../assets/icon/letter-c (1).png';
import { RiMenu2Fill } from 'react-icons/ri';
import { LuMenu } from 'react-icons/lu';
import { IoIosSearch } from 'react-icons/io';

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
      <div className=" md:hidden flex items-center sticky top-0 justify-between lg:hidden py-4 px-2 w-full bg-slate-400">
        <div>
          <RiMenu2Fill className="text-xl" />
        </div>
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
    </div>
  );
};

export default Header;
