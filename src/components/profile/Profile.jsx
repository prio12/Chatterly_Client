/* eslint-disable react/prop-types */
import { useState } from 'react';
import { CiLocationOn } from 'react-icons/ci';
import { FaRegCalendar } from 'react-icons/fa6';
import { MdOutlineEdit } from 'react-icons/md';
import { PiSuitcaseSimple } from 'react-icons/pi';
import UploadImageModal from '../../utilities/UploadImageModal';
import DefaultCoverPhoto from './DefaultCoverPhoto';
import DefaultProfilePIcture from './DefaultProfilePIcture';

const Profile = ({ user }) => {
  // const { name, profilePicture, coverPhoto } = user;
  //hooks
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState('');
  const [error, setError] = useState(null);

  return (
    <div className="bg-white border">
      <div
        onClick={() => {
          setType('Cover_Photo');
          setIsOpen(true);
        }}
        className="w-full cursor-pointer md:h-[400px]"
      >
        {user?.coverPhoto ? (
          <img
            src={user.coverPhoto}
            alt="cover photo"
            className="rounded-md max-w-full max-h-full object-cover "
          />
        ) : (
          <DefaultCoverPhoto />
        )}
      </div>

      <div className="flex items-center px-5   justify-between">
        <div className="flex items-center gap-5">
          <div
            onClick={() => {
              setType('Profile_Pic');
              setIsOpen(true);
            }}
            className="avatar cursor-pointer mt-[-48px]"
          >
            <div className="w-36 rounded-full bg-gray-100">
              {user?.profilePicture ? (
                <img
                  className="w-full object-cover"
                  src={user.profilePicture}
                />
              ) : (
                <DefaultProfilePIcture />
              )}
            </div>
          </div>
          <UploadImageModal
            error={error}
            setError={setError}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            type={type}
          />
          <div>
            <h5 className="text-xl font-bold">{user?.name}</h5>
            <p>250 Connections</p>
          </div>
        </div>
        <div className="hidden md:block ">
          <button className="btn  rounded bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white ">
            <span>
              <MdOutlineEdit className="inline mr-2" />
            </span>
            Edit Profile
          </button>
        </div>
        <div className="block md:hidden ">
          <MdOutlineEdit className="text-xl" />
        </div>
      </div>
      <div className="md:flex hidden items-center px-5 gap-5 my-3">
        <div className="flex items-center gap-3">
          <PiSuitcaseSimple />
          <p>Titan Hunter</p>
        </div>
        <div className="flex items-center gap-3">
          <CiLocationOn />
          <p>Shiganshina</p>
        </div>
        <div className="flex items-center gap-3">
          <FaRegCalendar />
          <p>Joined on Nov 26, 2019</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
