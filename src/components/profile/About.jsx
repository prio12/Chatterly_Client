/* eslint-disable react/prop-types */
import { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { CiHeart, CiLocationOn } from 'react-icons/ci';
import { FaRegCalendar } from 'react-icons/fa6';
import { LiaBirthdayCakeSolid } from 'react-icons/lia';
import { MdOutlineEmail } from 'react-icons/md';
import { PiSuitcaseSimple } from 'react-icons/pi';
import UpdateProfileModal from './modals/UpdateProfileModal';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { formatDistanceToNow } from 'date-fns';

const About = ({ user }) => {
  const [isUpdateProfileOpen, setIsUpdateProfileOpen] = useState(false);

  //hooks
  const { currentUser } = useSelector((state) => state.loggedInUser);
  const { uid } = useParams();

  //user object destructuring
  const {
    bio,
    location,
    birthDate,
    profession,
    relationshipStatus,
    email,
    createdAt,
  } = user;

  // Converts createdAt timestamp into a human-readable relative time format.
  const timeAgo = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  return (
    <div className="p-5 border bg-white my-5">
      <h3 className="text-xl font-bold">Profile Info</h3>
      <div className="p-5 border my-5">
        <div className="font-semibold mb-3 flex items-center justify-between">
          <h5>Overview</h5>
          {currentUser === uid && (
            <BsThreeDots
              onClick={() => setIsUpdateProfileOpen(true)}
              className="cursor-pointer"
            />
          )}
        </div>
        <UpdateProfileModal
          user={user}
          isUpdateProfileOpen={isUpdateProfileOpen}
          setIsUpdateProfileOpen={setIsUpdateProfileOpen}
        />
        {bio ? (
          <p>{bio}</p>
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
          <span className="font-semibold">Joined {timeAgo(createdAt)}</span>
        </div>

        <div className="flex flex-col items-center border w-full p-3 text-sm rounded-lg">
          <MdOutlineEmail className="text-xl mb-1" />
          {email ? (
            <span className="font-semibold">{email}</span>
          ) : (
            <p className="text-gray-500 italic">Not added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
