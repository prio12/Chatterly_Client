import Profile from '../components/profile/Profile';
import ProfileContent from '../components/profile/ProfileContent';

const ProfilePage = () => {
  return (
    <div className="grid  md:grid-cols-3 gap-8 ">
      <div className="col-span-2  ">
        <Profile />
        <ProfileContent />
      </div>
      <div className="col-span-1 bg-blue-500 ">right part</div>
    </div>
  );
};

export default ProfilePage;
