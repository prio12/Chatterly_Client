/* eslint-disable react/prop-types */
import { useState } from 'react';
import { IoVideocamOffOutline } from 'react-icons/io5';
import { MdEventAvailable, MdOutlineInsertPhoto } from 'react-icons/md';
import { useCreateAPostMutation } from '../redux/api/posts/postsApi';
import ContentUploadModal from '../utilities/ContentUploadModal ';
import LoadingButton from '../utilities/btn/LoadingButton';
import VideoUploadModal from '../utilities/VideoUploadModal';
import DefaultProfilePIcture from './profile/DefaultProfilePIcture';
import toast from 'react-hot-toast';

const CreatePost = ({ user }) => {
  //hooks
  const [text, setText] = useState('');
  const [createPost] = useCreateAPostMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOnChange = (e) => {
    setText(e.target.value);
  };

  //preparing post details
  const post = {
    author: user?._id,
    content: text,
  };
  const handleSubmit = async () => {
    if (!text) {
      alert('Write something to post!');
      return;
    }
    // await createPost(post);
    try {
      setIsLoading(true);
      const result = await createPost(post).unwrap();
      if (result.result.author) {
        setText('');
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div className="my-5 border p-5 ">
      {/* Avatar and Textarea */}
      <div className="flex items-center gap-3">
        <div className="avatar mt-[-24px]">
          <div className="w-8 rounded-full">
            {user?.profilePicture ? (
              <img src={user?.profilePicture} alt="Avatar" />
            ) : (
              <DefaultProfilePIcture />
            )}
          </div>
        </div>
        <div className="w-full">
          <textarea
            value={text}
            onChange={handleOnChange}
            className="w-full p-2 resize-none overflow-y-scroll no-scrollbar focus:outline-none"
            placeholder="Share your thoughts..."
            style={{
              scrollbarWidth: 'none', // For Firefox
              msOverflowStyle: 'none', // For IE and Edge
            }}
          ></textarea>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-5">
          <div
            onClick={() => {
              setIsOpen(true);
            }}
            className="flex btn btn-sm items-center gap-2"
          >
            <MdOutlineInsertPhoto className="text-green-600 font-bold" />
            <p className="text-sm font-semibold">Photo</p>
          </div>
          <ContentUploadModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            user={user}
            type="posts"
          />
          {/* <UploadImageModal isOpen={isOpen} setIsOpen={setIsOpen} /> */}
          <div
            onClick={() => setIsModalOpen(true)}
            className="flex btn btn-sm items-center gap-2"
          >
            <IoVideocamOffOutline className="text-green-600 font-bold" />
            <p className="text-sm font-semibold">Video</p>
          </div>
          <VideoUploadModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            user={user}
          />
          <div className="flex btn btn-sm items-center gap-2">
            <MdEventAvailable className="text-green-600 font-bold" />
            <p className="text-sm font-semibold">Event</p>
          </div>
        </div>
        <div className="my-5 md:my-0 ">
          {isLoading ? (
            <LoadingButton />
          ) : (
            <button
              onClick={handleSubmit}
              className="btn  btn-md md:btn-sm rounded-md bg-blue-100 text-blue-500
               hover:bg-blue-500 hover:text-white"
            >
              Post
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
