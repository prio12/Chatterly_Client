/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import DefaultProfilePIcture from '../components/profile/DefaultProfilePIcture';
import Modal from './Modal';
import { useCreateAPostMutation } from '../redux/api/posts/postsApi';
import LoadingButton from './btn/LoadingButton';
import { useCreateAStoryMutation } from '../redux/api/stories/storiesApi';

const ContentUploadModal = ({ isOpen, setIsOpen, user, type }) => {
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
  const [createStory] = useCreateAStoryMutation();

  const handleFileOnChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleCaptionOnChange = (e) => {
    const value = e.target.value;
    setCaption(value); // Don't trim here
  };

  const handleSubmit = async () => {
    const trimmedCaption = caption.trim(); // 👈 Trim it here at the very start!

    if (type === 'posts' && (!imageFile || !trimmedCaption)) {
      alert('Please provide both an image and a caption before submitting!');
      return;
    }

    if (type === 'stories' && !imageFile) {
      alert('Please provide an image for your story!');
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
          content: trimmedCaption, // 👈 Use trimmedCaption here
          img: result.secure_url.replace(
            '/upload/',
            '/upload/w_1000,h_500,c_pad,b_auto/'
          ),
        };

        //preparing story
        let story = {
          author: user?._id,
          mediaUrl: result.secure_url.replace(
            '/upload/',
            '/upload/w_1000,h_500,c_pad,b_auto/'
          ),
        };

        //sending to server
        const uploadResult =
          type === 'posts'
            ? await createPost(post).unwrap()
            : await createStory(story).unwrap();

        if (uploadResult.success) {
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
            {user?.profilePicture ? (
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src={user?.profilePicture} />
                </div>
              </div>
            ) : (
              <div className="w-12">
                <DefaultProfilePIcture />
              </div>
            )}
          </div>
          <div>
            <h5 className="text-sm font-semibold">{user?.name}</h5>
            {type === 'stories' && <p className="text-xs ">Add A Story!</p>}
          </div>
        </div>
        <div className="divider "></div>
        {type === 'posts' && (
          <div className="w-full">
            <textarea
              // value={text}
              onChange={handleCaptionOnChange}
              className="w-full p-2 resize-none overflow-y-scroll no-scrollbar focus:outline-none"
              placeholder="Add caption..."
              style={{
                scrollbarWidth: 'none', // For Firefox
                msOverflowStyle: 'none', // For IE and Edge
              }}
            ></textarea>
          </div>
        )}
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
