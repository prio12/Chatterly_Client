import { useState } from 'react';
import { CiLocationOn } from 'react-icons/ci';
import { FaRegCalendar } from 'react-icons/fa6';
import { MdOutlineEdit } from 'react-icons/md';
import { PiSuitcaseSimple } from 'react-icons/pi';
import UploadImageModal from '../../utilities/UploadImageModal';

const Profile = () => {
  //hooks
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState('');
  const [error, setError] = useState(null);

  return (
    <div className="bg-white border">
      <img
        src="https://timelinecovers.pro/facebook-cover/download/anime-attack-on-titan-shingeki-no-kyojin-eren-titan-facebook-cover.jpg"
        alt="cover photo"
        className="rounded-md w-full object-cover"
        onClick={() => {
          setError(false);
          setType('Cover_Photo');
          setIsOpen(true);
        }}
      />
      <div className="flex items-center px-5   justify-between">
        <div className="flex items-center gap-5">
          <div
            onClick={() => {
              setError(false);
              setType('Profile_Pic');
              setIsOpen(true);
            }}
            className="avatar cursor-pointer mt-[-48px]"
          >
            <div className="w-36 rounded-full">
              <img
                className="w-full"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIwuCp7qc5mRQU5EfJHRzRdJjzWwKUM3uBHQ&s"
              />
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
            <h5 className="text-xl font-bold">Eren Yeager</h5>
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
