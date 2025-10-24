import { FaUser, FaLock } from 'react-icons/fa6';
import { MdOutlineEdit } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useUserInfoByUidQuery } from '../redux/api/users/usersApi';
import UpdateNameModal from '../components/profile/modals/UpdateNameModal';
import { useState } from 'react';
import auth from '../firebase/firebase.cofig';
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';
import toast from 'react-hot-toast';

export default function Settings() {
  const { currentUser, isGoogleSignIn } = useSelector(
    (state) => state.loggedInUser
  );
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmedPass, setConfirmedPass] = useState('');
  const [error, setError] = useState('');

  console.log(isGoogleSignIn, 'checking if the user logged in with google?');

  const { data, isLoading } = useUserInfoByUidQuery(currentUser, {
    refetchOnMountOrArgChange: true,
  });

  const [isUpdateNameOpen, setIsUpdateNameOpen] = useState(false);

  const user = data?.user;

  const fullName = user?.name.split(' ');

  const handleChangeUserPassword = async () => {
    const user = auth.currentUser;
    if (!user) {
      return setError('User not found!!');
    }
    const newPassword = newPass.trim();
    const confirmedPassword = confirmedPass.trim();

    if (newPassword.length === 0 && confirmedPassword.length === 0) {
      return setError('Password cannot be empty or contain only spaces.');
    }

    if (newPassword !== confirmedPassword) {
      return setError(
        'The new password and confirmation password do not match.'
      );
    }

    try {
      const credential = EmailAuthProvider.credential(user.email, currentPass);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPass);
      toast.success('Password Changed Successfully!!');
      setCurrentPass('');
      setNewPass('');
      setConfirmedPass('');
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account preferences</p>
        </div>

        {/* Settings Cards Container */}
        <div className="space-y-6">
          {/* Profile Settings Card */}
          <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
              <div className="flex items-center gap-3">
                <FaUser className="text-white text-xl" />
                <h2 className="text-xl font-bold text-white">
                  Profile Settings
                </h2>
              </div>
            </div>

            <UpdateNameModal
              user={user}
              isUpdateNameOpen={isUpdateNameOpen}
              setIsUpdateNameOpen={setIsUpdateNameOpen}
            />

            {/* Card Content */}
            <div className="p-6 space-y-6">
              {/* Name Fields */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Full Name
                </label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={`${fullName[0]}`}
                      placeholder="First Name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={`${fullName[1]}`}
                      placeholder="Last Name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled
                    />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Your name appears on your profile
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200"></div>

              {/* Edit Button */}
              <div className="flex gap-3">
                <button
                  onClick={() => setIsUpdateNameOpen(true)}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
                >
                  <MdOutlineEdit className="text-lg" />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* Security Settings Card */}
          <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-red-500 to-pink-600 px-6 py-4">
              <div className="flex items-center gap-3">
                <FaLock className="text-white text-xl" />
                <h2 className="text-xl font-bold text-white">
                  Security Settings
                </h2>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-6 space-y-6">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Current Password
                </label>
                <input
                  onChange={(e) => setCurrentPass(e.target.value)}
                  value={currentPass}
                  type="password"
                  placeholder="Enter your current password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  disabled={user?.isGoogleSignIn}
                />
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  New Password
                </label>
                <input
                  onChange={(e) => setNewPass(e.target.value)}
                  value={newPass}
                  type="password"
                  placeholder="Enter your new password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  disabled={user?.isGoogleSignIn}
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Confirm Password
                </label>
                <input
                  onChange={(e) => setConfirmedPass(e.target.value)}
                  value={confirmedPass}
                  type="password"
                  placeholder="Confirm your new password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  disabled={user?.isGoogleSignIn}
                />
                <p className="text-xs text-gray-500 mt-2">
                  Must be at least 6 characters
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200"></div>

              {error && <p className="text-red-500 text-sm my-3">{error}</p>}
              {/* Update Button */}
              <div className="flex gap-3">
                <button
                  disabled={user?.isGoogleSignIn}
                  onClick={handleChangeUserPassword}
                  className={`px-6 py-2 font-medium rounded-lg transition-colors 
    ${
      user?.isGoogleSignIn
        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
        : 'bg-red-500 hover:bg-red-600 text-white'
    }`}
                >
                  Update Password
                </button>
              </div>
              {user?.isGoogleSignIn && (
                <p className="text-gray-600 text-center text-sm">
                  You signed in using Google. Password change is not available
                  for social logins.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            💡 <span className="font-semibold">Tip:</span> Keep your password
            strong and unique. Never share your password with anyone.
          </p>
        </div>
      </div>
    </div>
  );
}
