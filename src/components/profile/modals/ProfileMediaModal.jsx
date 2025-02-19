/* eslint-disable react/prop-types */
import { useState } from 'react';
import Modal from '../../../utilities/Modal';
import { useUpdateUserProfileMutation } from '../../../redux/api/users/usersApi';
import { useSelector } from 'react-redux';
import DefaultProfilePIcture from '../DefaultProfilePIcture';
import DefaultCoverPhoto from '../DefaultCoverPhoto';
import LoadingButton from '../../../utilities/btn/LoadingButton';

const ProfileMediaModal = ({
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

  // user destructure
  const { profilePicture, coverPhoto } = user;

  const handleOnChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async () => {
    if (!imageFile) {
      alert('Please select a file!');
      return;
    }

    //confirming from user
    const confirmation = window.confirm('Are you sure to make changes?');
    if (!confirmation) {
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

  let modalImage;

  if (type === 'Profile_Pic' && profilePicture) {
    modalImage = (
      <div className="avatar flex justify-center mb-5">
        <div className="mask mask-squircle w-24">
          <img src={profilePicture} />
        </div>
      </div>
    );
  }
  if (type === 'Profile_Pic' && !profilePicture) {
    modalImage = (
      <div className="avatar flex justify-center mb-5">
        <div className="mask mask-squircle w-24">
          <DefaultProfilePIcture />
        </div>
      </div>
    );
  }
  if (type === 'Cover_Photo' && coverPhoto) {
    modalImage = (
      <div className="avatar flex justify-center mb-5">
        <img src={coverPhoto} alt="" />
      </div>
    );
  }
  if (type === 'Cover_Photo' && !coverPhoto) {
    modalImage = (
      <div className="avatar flex justify-center mb-5">
        <DefaultCoverPhoto />
      </div>
    );
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="md:w-1/2 w-full p-5   mx-auto ">
        <h5 className="text-center text-xl mb-5 font-bold">
          {/* Update Your Profile Pic */}
          {type === 'Profile_Pic' && <span>Update Your Profile Pic</span>}
          {type === 'Cover_Photo' && <span>Update Your Cover Photo</span>}
        </h5>
        {modalImage}

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
          <LoadingButton />
        )}
        {error && (
          <p className="my-5 text-xs font-semibold text-red-600">{error}</p>
        )}
      </div>
    </Modal>
  );
};

export default ProfileMediaModal;
