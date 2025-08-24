/* eslint-disable react/prop-types */
import { signOut } from 'firebase/auth';
import { BsQuestionOctagon } from 'react-icons/bs';
import { CiLight, CiSettings } from 'react-icons/ci';
import { ImSwitch } from 'react-icons/im';
import { IoBookOutline } from 'react-icons/io5';
import { MdDarkMode } from 'react-icons/md';
import { Link } from 'react-router';
import auth from '../firebase/firebase.cofig';
import { useDispatch, useSelector } from 'react-redux';
import {
  setUser,
  toggleLoading,
} from '../redux/features/loggedInUser/userSlice';
import DefaultProfilePIcture from '../components/profile/DefaultProfilePIcture';
import { useContext } from 'react';
import SocketContext from '../context/SocketContext';

const AvatarDropDownContent = ({ user }) => {
  //hooks
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.loggedInUser);
  const socket = useContext(SocketContext);

  const handleSignOut = () => {
    //disconnect socket to remove user uid from server (to prevent showing online status after logout)
    socket.disconnect();

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
        <div className="mask mask-squircle w-12">
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
        <div>
          <h5 className="font-semibold">{user?.name}</h5>
          {user?.profession && <p className="text-xs">{user?.profession}</p>}
        </div>
      </div>
      <Link
        to={`/profile/${currentUser}`}
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
