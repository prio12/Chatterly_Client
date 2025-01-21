import { MdOutlineEmail } from 'react-icons/md';
import Profile from '../components/profile/Profile';
import ProfileContent from '../components/profile/ProfileContent';
import { CiHeart } from 'react-icons/ci';
import { FaRegCalendarAlt } from 'react-icons/fa';

const ProfilePage = () => {
  return (
    <div className="grid  md:grid-cols-3 bg-gray-100 gap-8 ">
      <div className="col-span-2  ">
        <Profile />
        <ProfileContent />
      </div>
      <div className="col-span-1  ">
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
      </div>
    </div>
  );
};

export default ProfilePage;
