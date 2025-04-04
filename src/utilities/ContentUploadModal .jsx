/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import DefaultProfilePIcture from '../components/profile/DefaultProfilePIcture';
import Modal from './Modal';
import { useCreateAPostMutation } from '../redux/api/posts/postsApi';
import LoadingButton from './btn/LoadingButton';

const ContentUploadModal = ({ isOpen, setIsOpen, user }) => {
  //destructuring
  const { profilePicture, name } = user;

  //hooks
  const [imageFile, setImageFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setError('');
    }
  }, [isOpen, setError]);

  const [createPost] = useCreateAPostMutation();

  const handleFileOnChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleCaptionOnChange = (e) => {
    const trimmedCaption = e.target.value.trim();
    if (trimmedCaption.length < 1) {
      alert("Caption can't be empty");
      return;
    }
    setCaption(trimmedCaption);
  };

  const handleSubmit = async () => {
    if (!imageFile || !caption) {
      alert('Please provide both an image and a caption before submitting!');
      setCaption('');
      setImageFile(null);
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
        //preparing post details
        let post = {
          author: user?._id,
          content: caption,
          // Apply transformation only for cover photo
          img: result.secure_url.replace(
            '/upload/',
            '/upload/w_1000,h_500,c_pad,b_auto/'
          ),
        };

        //sending to server
        const uploadResult = await createPost(post).unwrap();
        if (uploadResult.result.author) {
          setIsLoading(false);
          setImageFile('');
          setCaption('');
          setIsOpen(false);
        }
      } else {
        setIsLoading(false);
        setError('Upload failed!');
      }
    } catch (error) {
      setIsLoading(false);
      setError(error?.data?.error || 'Something went wrong');
      setImageFile(null);
      setCaption('');
    }
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="md:w-1/2 md:mx-auto mt-5 p-2 md:p-5 shadow-md">
        <div className="flex items-center gap-5">
          <div>
            {profilePicture ? (
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src={profilePicture} />
                </div>
              </div>
            ) : (
              <div className="w-12">
                <DefaultProfilePIcture />
              </div>
            )}
          </div>
          <div>
            <h5 className="text-sm font-semibold">{name}</h5>
          </div>
        </div>
        <div className="divider "></div>
        <div className="w-full">
          <textarea
            // value={text}
            onChange={handleCaptionOnChange}
            className="w-full p-2 resize-none overflow-y-scroll no-scrollbar focus:outline-none"
            placeholder="Share your thoughts..."
            style={{
              scrollbarWidth: 'none', // For Firefox
              msOverflowStyle: 'none', // For IE and Edge
            }}
          ></textarea>
        </div>
        <div className="my-5">
          <input
            type="file"
            onChange={handleFileOnChange}
            accept="image/jpeg, image/png, image/webp, image/jpg"
            className="file-input w-full max-w-xs"
            // onChange={handleOnChange}
          />
          {!isLoading ? (
            <button
              onClick={handleSubmit}
              className="btn  rounded  btn-outline mt-5 w-full md:w-auto lg:w-auto  md:mt-0 "
            >
              Post
            </button>
          ) : (
            <LoadingButton />
          )}
        </div>
        {error && (
          <p className="my-5 text-xs font-semibold text-red-600">{error}</p>
        )}
      </div>
    </Modal>
  );
};

export default ContentUploadModal;
