/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import DefaultProfilePIcture from '../components/profile/DefaultProfilePIcture';
import Modal from './Modal';
import LoadingButton from './btn/LoadingButton';
import { useCreateAPostMutation } from '../redux/api/posts/postsApi';

const VideoUploadModal = ({ isModalOpen, setIsModalOpen, user }) => {
  //destructuring
  const { profilePicture, name } = user;

  //hooks
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [caption, setCaption] = useState('');
  const [videoFile, setVideoFile] = useState(null);

  const handleCaptionOnChange = (e) => {
    const trimmedCaption = e.target.value.trim();
    if (trimmedCaption.length < 1) {
      alert("Caption can't be empty");
      return;
    }
    setCaption(trimmedCaption);
  };

  const handleFileOnChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
  };

  useEffect(() => {
    if (!isModalOpen) {
      setError('');
    }
  }, [isModalOpen, setError]);

  const [createPost] = useCreateAPostMutation();

  const handleSubmit = async () => {
    if (!videoFile || !caption) {
      alert('Please provide both a Video and a Caption before submitting!');
      return;
    }

    //declaring expected video files
    const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/ogg'];

    //showing an alert to prevent unexpected file upload
    if (![...allowedVideoTypes].includes(videoFile.type)) {
      alert('Only videos of type MP4, WebM, or OGG are allowed.');
      return;
    }

    // Validate file size (max 50MB)
    const maxFileSize = 50 * 1024 * 1024; // 50MB in bytes
    if (videoFile.size > maxFileSize) {
      alert('File size should not exceed 50MB.');
      return;
    }

    const formData = new FormData();
    formData.append('file', videoFile);
    formData.append('upload_preset', 'video_hosting');
    formData.append('cloud_name', 'dxzvyancg');

    //uploading the video to cloudinary
    try {
      setIsLoading(true);
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/dxzvyancg/video/upload',
        {
          method: 'POST',
          body: formData,
        }
      );

      const result = await response.json();
      console.log(result);

      if (result.secure_url) {
        let post = {
          author: user?._id,
          content: caption,
          video: result.secure_url,
        };

        // sending to server
        const uploadResult = await createPost(post).unwrap();
        if (uploadResult.result.author) {
          setIsLoading(false);
          setVideoFile('');
          setCaption('');
          setIsModalOpen(false);
        }
      } else {
        setIsLoading(false);
        setError('Upload failed!');
      }
    } catch (error) {
      setIsLoading(false);
      setError(error?.data?.error || 'Something went wrong');
      setVideoFile(null);
      setCaption('');
    }
  };

  return (
    <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
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
            placeholder="Add caption..."
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
            accept="video/*"
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

export default VideoUploadModal;
