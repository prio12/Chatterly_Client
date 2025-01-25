import { signOut } from 'firebase/auth';
import { BsQuestionOctagon } from 'react-icons/bs';
import { CiLight, CiSettings } from 'react-icons/ci';
import { ImSwitch } from 'react-icons/im';
import { IoBookOutline } from 'react-icons/io5';
import { MdDarkMode } from 'react-icons/md';
import { Link } from 'react-router';
import auth from '../firebase/firebase.cofig';
import { useDispatch } from 'react-redux';
import {
  setUser,
  toggleLoading,
} from '../redux/features/loggedInUser/userSlice';

const AvatarDropDownContent = () => {
  //hooks
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(setUser(null));
        dispatch(toggleLoading(false));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="flex items-center gap-5">
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <div>
          <h5 className="font-semibold">John Doe</h5>
          <p className="text-xs">Web Developer</p>
        </div>
      </div>
      <Link
        to="/profile"
        className="btn btn-sm mt-5  bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white w-full"
      >
        View Profile
      </Link>
      <Link className="flex items-center gap-2 hover:text-blue-600 my-3">
        <CiSettings className="text-xl" />
        <p className="text-sm leading-none">Settings</p>
      </Link>
      <Link className="flex items-center hover:text-blue-600 gap-2 my-3">
        <IoBookOutline className="text-lg" />
        <p className="text-sm leading-none">Guide</p>
      </Link>
      <Link className="flex items-center hover:text-blue-600 gap-2 my-3">
        <BsQuestionOctagon className="text-lg" />
        <p className="text-sm leading-none">F&A</p>
      </Link>
      <div className="divider my-2"></div>
      <div
        onClick={handleSignOut}
        className="flex items-center hover:text-blue-600 cursor-pointer gap-2 my-3"
      >
        <ImSwitch className="text-lg" />
        <p className="text-sm leading-none">Sign Out</p>
      </div>

      <div className="divider my-2"></div>
      <div className="flex items-center justify-between">
        <p className="text-sm">Mode</p>
        <div className="tooltip hover:tooltip-open" data-tip="Light Mode">
          <CiLight className="text-lg cursor-pointer" />
        </div>
        <div className="tooltip hover:tooltip-open" data-tip="Dark Mode">
          <MdDarkMode className="text-lg cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default AvatarDropDownContent;
