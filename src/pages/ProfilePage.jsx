import { MdOutlineEmail } from 'react-icons/md';
import Profile from '../components/profile/Profile';
import ProfileContent from '../components/profile/ProfileContent';
import { CiHeart } from 'react-icons/ci';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { useUserInfoByUidQuery } from '../redux/api/users/usersApi';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
  //hooks
  const { currentUser } = useSelector((state) => state.loggedInUser);
  const { isLoading, data, isError, error } =
    useUserInfoByUidQuery(currentUser);

  const user = data?.user;

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Something Went Wrong! : {error}</div>;
  }

  return (
    <div className="grid  md:grid-cols-3 bg-gray-100 gap-8 ">
      <div className="col-span-2  ">
        <Profile user={user} />
        <ProfileContent />
      </div>
      <div className="col-span-1 hidden md:block ">
        <div className="p-5 border">
          <div>
            <h3 className="text-xl font-bold">About</h3>
            <p className="text-sm my-2">
              I’m someone who’ll stop at nothing to achieve freedom for my
              people. My mission: to break the chains that bind us and explore
              the world beyond the walls.
            </p>
          </div>
          <div className="grid grid-cols-[auto,1fr] gap-x-3 my-5 items-center">
            {/* Row 1 */}
            <FaRegCalendarAlt className="text-lg" />
            <p className="text-sm">
              Born: <span className="font-semibold">October 20, 1990</span>
            </p>

            {/* Row 2 */}
            <CiHeart className="text-lg" />
            <p className="text-sm">
              Status: <span className="font-semibold">Single</span>
            </p>

            {/* Row 3 */}
            <MdOutlineEmail className="text-lg" />
            <p className="text-sm">
              Email: <span className="font-semibold">eren@gmail.com</span>
            </p>
          </div>
        </div>
        <div className="p-5 border my-5">
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
