import { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { CiHeart, CiLocationOn } from 'react-icons/ci';
import { FaRegCalendar } from 'react-icons/fa6';
import { LiaBirthdayCakeSolid } from 'react-icons/lia';
import { MdOutlineEmail } from 'react-icons/md';
import { PiSuitcaseSimple } from 'react-icons/pi';
import UpdateProfileModal from './modals/UpdateProfileModal';

const About = ({ user }) => {
  const [isUpdateProfileOpen, setIsUpdateProfileOpen] = useState(false);

  //user object destructuring
  const { about, location, birthDate, profession, relationshipStatus } = user;

  return (
    <div className="p-5 border bg-white my-5">
      <h3 className="text-xl font-bold">Profile Info</h3>
      <div className="p-5 border my-5">
        <div className="font-semibold mb-3 flex items-center justify-between">
          <h5>Overview</h5>
          <BsThreeDots
            onClick={() => setIsUpdateProfileOpen(true)}
            className="cursor-pointer"
          />
        </div>
        <UpdateProfileModal
          isUpdateProfileOpen={isUpdateProfileOpen}
          setIsUpdateProfileOpen={setIsUpdateProfileOpen}
        />
        {about ? (
          <p>{about}</p>
        ) : (
          <p className="text-gray-500 italic">No bio added yet.</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-5 items-start">
        <div className="flex  flex-col items-center border w-full p-3 text-sm rounded-lg">
          <LiaBirthdayCakeSolid className="text-xl mb-1" />
          {/* <span className="font-semibold">October 20, 1990</span> */}
          {birthDate ? (
            <span className="font-semibold">{birthDate}</span>
          ) : (
            <p className="text-gray-500 italic">Not added yet.</p>
          )}
        </div>
        <div className="flex flex-col items-center border w-full p-3 text-sm rounded-lg">
          <CiHeart className="text-xl mb-1" />
          {relationshipStatus ? (
            <span className="font-semibold">{relationshipStatus}</span>
          ) : (
            <p className="text-gray-500 italic">Not added yet.</p>
          )}
        </div>
        <div className="flex flex-col items-center border w-full p-3 text-sm rounded-lg">
          <PiSuitcaseSimple className="text-xl mb-1" />
          {profession ? (
            <span className="font-semibold">{profession}</span>
          ) : (
            <p className="text-gray-500 italic">Not added yet.</p>
          )}
        </div>
        <div className="flex flex-col items-center border w-full p-3 text-sm rounded-lg">
          <CiLocationOn className="text-xl mb-1" />
          {location ? (
            <span className="font-semibold">{location}</span>
          ) : (
            <p className="text-gray-500 italic">Not added yet.</p>
          )}
        </div>
        <div className="flex flex-col items-center border w-full p-3 text-sm rounded-lg">
          <FaRegCalendar className="text-xl mb-1" />
          <span className="font-semibold">Since : Nov 26, 2019</span>
        </div>
        <div className="flex flex-col items-center border w-full p-3 text-sm rounded-lg">
          <MdOutlineEmail className="text-xl mb-1" />
          <span className="font-semibold">eren@gmail.com</span>
        </div>
        {/* <div className="flex flex-col items-center cursor-pointer hover:text-blue-600 border w-full p-3 text-sm rounded-lg">
          <MdOutlineWorkOutline className="text-xl mb-1" />
          <span>Add a workplace</span>
        </div> */}
        {/* <div className="flex flex-col items-center cursor-pointer hover:text-blue-600 border w-full p-3 text-sm rounded-lg">
          <IoBookOutline className="text-xl mb-1" />
          <span>Add Education</span>
        </div> */}
      </div>
    </div>
  );
};

export default About;
