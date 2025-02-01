/* eslint-disable react/prop-types */
import { useState } from 'react';
import Modal from './Modal';
import { useUpdateUserProfileMutation } from '../redux/api/users/usersApi';
import { useSelector } from 'react-redux';

const UploadImageModal = ({
  user,
  isOpen,
  setIsOpen,
  type,
  error,
  setError,
}) => {
  //hooks
  const { currentUser } = useSelector((state) => state.loggedInUser);
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [updateUserInfo] = useUpdateUserProfileMutation();

  const handleOnChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async () => {
    if (!imageFile) {
      alert('Please select a file!');
      return;
    }

    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'Using_Cloudinary_for_First_TIme');
    formData.append('cloud_name', 'dxzvyancg');

    try {
      setIsLoading(true);
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dxzvyancg/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );
      const result = await response.json();

      if (result.secure_url) {
        let updates = {};

        switch (type) {
          case 'Profile_Pic':
            // Keep profile picture unmodified
            updates.profilePicture = result.secure_url;
            break;
          case 'Cover_Photo':
            // Apply transformation only for cover photo
            updates.coverPhoto = result.secure_url.replace(
              '/upload/',
              '/upload/w_1200,h_600,c_pad,b_auto/'
            );
            break;
          default:
            break;
        }

        const updatedResult = await updateUserInfo({
          userUid: currentUser,
          updates,
        }).unwrap();

        if (updatedResult) {
          setIsLoading(false);
          setIsOpen(false);
        }
      } else {
        setIsLoading(false);
        setError('Image upload failed');
      }
    } catch (error) {
      setIsLoading(false);
      setError(error?.data?.error || 'Something went wrong');
    }
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="md:w-1/2 w-full p-5   mx-auto ">
        <h5 className="text-center text-xl mb-5 font-bold">
          {/* Update Your Profile Pic */}
          {type === 'Profile_Pic' && <span>Update Your Profile Pic</span>}
          {type === 'Cover_Photo' && <span>Update Your Cover Photo</span>}
        </h5>
        <div className="avatar flex justify-center mb-5">
          <div className="mask mask-squircle w-24">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
        <input
          type="file"
          accept="image/jpeg, image/png, image/webp, image/jpg"
          className="file-input w-full max-w-xs"
          onChange={handleOnChange}
        />
        {!isLoading ? (
          <button
            onClick={handleSubmit}
            className="btn  rounded  btn-outline mt-5 w-full md:w-auto lg:w-auto  md:mt-0 "
          >
            Submit
          </button>
        ) : (
          <div className="flex my-5 w-full items-center">
            <div className="animate-spin mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-clockwise"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M9.646 1.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L10 3.707V7.5a.5.5 0 0 1-1 0V2a.5.5 0 0 1 .5-.5z"
                />
                <path
                  fillRule="evenodd"
                  d="M2.5 8a.5.5 0 0 1 .5.5V13a.5.5 0 0 1-1 0V9.293l-2.146 2.147a.5.5 0 0 1-.708-.708l3-3a.5.5 0 0 1 .708 0z"
                />
              </svg>
            </div>
            Loading...
          </div>
        )}
        {error && (
          <p className="my-5 text-xs font-semibold text-red-600">{error}</p>
        )}
      </div>
    </Modal>
  );
};

export default UploadImageModal;
