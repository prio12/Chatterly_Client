import { MdOutlineEmail } from 'react-icons/md';
import Profile from '../components/profile/Profile';
import ProfileContent from '../components/profile/ProfileContent';
import { CiHeart } from 'react-icons/ci';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { useUserInfoByUidQuery } from '../redux/api/users/usersApi';

import { useParams } from 'react-router';
import { useContext, useEffect } from 'react';
import SocketContext from '../context/SocketContext';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
  //hooks
  const { uid } = useParams();
  const socket = useContext(SocketContext);

  //getting currently loggedInUser Uid
  const { currentUser: currentUserUid } = useSelector(
    (state) => state.loggedInUser
  );

  //getting currentlyLoggedInUser data using uid
  const { data: currentUser } = useUserInfoByUidQuery(currentUserUid);

  const { data, refetch } = useUserInfoByUidQuery(uid, {
    refetchOnMountOrArgChange: true,
  });

  const user = data?.user;

  useEffect(() => {
    socket.on('postInteraction', ({ success }) => {
      if (success) {
        setTimeout(() => {
          refetch();
        }, 1000);
      }
    });
  }, [socket, refetch]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const { bio, birthDate, relationshipStatus, email } = user;

  return (
    <div className="grid  md:grid-cols-3   bg-gray-100 gap-8 ">
      <div className="col-span-2 ">
        <Profile
          user={user}
          currentUserId={currentUser?.user?._id}
          currentUserData={currentUser?.user}
        />
        <ProfileContent currentUserData={currentUser?.user} user={user} />
      </div>
      <div className="col-span-1 hidden md:block relative bg-white">
        <div className="p-5 border sticky top-[6.5rem]  ">
          <div>
            <h3 className="text-xl font-bold">About</h3>

            {bio ? (
              <p className="text-sm my-2">{bio}</p>
            ) : (
              <p className="text-gray-500 italic">No bio added yet.</p>
            )}
          </div>
          <div className="grid grid-cols-[auto,1fr] gap-x-3 my-5 items-center">
            {/* Row 1 */}
            <FaRegCalendarAlt className="text-lg" />
            {birthDate ? (
              <span className="font-semibold text-sm">{birthDate}</span>
            ) : (
              <p className="text-gray-500 italic">Not added yet.</p>
            )}

            {/* Row 2 */}
            <CiHeart className="text-lg" />
            {relationshipStatus ? (
              <span className="font-semibold text-sm">
                {relationshipStatus}
              </span>
            ) : (
              <p className="text-gray-500 italic">Not added yet.</p>
            )}

            {/* Row 3 */}
            <MdOutlineEmail className="text-lg" />
            {email ? (
              <span className="font-semibold text-sm">{email}</span>
            ) : (
              <p className="text-gray-500 italic">Not added yet.</p>
            )}
          </div>
        </div>
        <div className="p-5 border my-5 sticky top-[19.85rem]">
          <h4 className="font-bold my-5">Who to follow</h4>
          <div className="flex justify-between my-5 items-center">
            <div className="flex items-center gap-5">
              <div className="avatar cursor-pointer">
                <div className="w-8 rounded-full">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
              <div className="cursor-pointer">
                <h5 className="font-bold">Captain Levi</h5>
                <p className="text-sm ">Team Lead of Levi Team</p>
              </div>
            </div>
            <button className="btn btn-sm rounded bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white">
              Follow
            </button>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-5">
              <div className="avatar cursor-pointer">
                <div className="w-8 rounded-full">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
              <div className="cursor-pointer">
                <h5 className="font-bold">Captain Levi</h5>
                <p className="text-sm ">Team Lead of Levi Team</p>
              </div>
            </div>
            <button className="btn btn-sm rounded bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white">
              Follow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
