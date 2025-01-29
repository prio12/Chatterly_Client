/* eslint-disable react/prop-types */
import { useState } from 'react';
import Modal from '../../../utilities/Modal';

const ProfilePicModal = ({ isOpen, setIsOpen }) => {
  //hooks
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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
      if (result) {
        setIsLoading(false);
        console.log(result.url);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="md:w-1/2 w-full p-5   mx-auto ">
        <h5 className="text-center text-xl mb-5 font-bold">
          Update Your Profile Pic
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
      </div>
    </Modal>
  );
};

export default ProfilePicModal;
