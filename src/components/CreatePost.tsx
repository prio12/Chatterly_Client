/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef, useState } from 'react';
import { IoVideocamOffOutline } from 'react-icons/io5';
import { MdOutlineInsertPhoto } from 'react-icons/md';
import { useCreateAPostMutation } from '../redux/api/posts/postsApi';
import ContentUploadModal from '../utilities/ContentUploadModal ';
import LoadingButton from '../utilities/btn/LoadingButton';
import VideoUploadModal from '../utilities/VideoUploadModal';
import DefaultProfilePIcture from './profile/DefaultProfilePIcture';
import toast from 'react-hot-toast';
import { FcIdea } from 'react-icons/fc';
import { UserWithPosts } from '../types';
import * as React from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

interface CreatePostPropsType {
  user: UserWithPosts;
}

const CreatePost = forwardRef<HTMLDivElement, CreatePostPropsType>(
  ({ user }, ref) => {
    //hooks
    const [text, setText] = useState('');
    const [createPost] = useCreateAPostMutation();
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isThoughtMode, setIsThoughtMode] = useState(false);

    const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(e.target.value);
    };

    //preparing post details
    const post = {
      author: user?._id,
      content: text,
      thoughtMode: isThoughtMode,
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
      } catch (error: unknown) {
        let message = 'Something went wrong';

        if ((error as FetchBaseQueryError).data) {
          const err = error as FetchBaseQueryError;
          message = (err.data as { error?: string })?.error ?? message;
        } else if ((error as SerializedError).message) {
          message = (error as SerializedError).message!;
        }

        toast.error(message);
        setIsLoading(false);
      }
    };

    return (
      <div className="my-5 border p-5 " ref={ref}>
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
              className={`w-full p-2 resize-none overflow-y-scroll no-scrollbar focus:outline-none ${
                isThoughtMode ? 'bg-[#fff8e7]' : 'bg-white'
              }`}
              placeholder={`${
                !isThoughtMode ? 'What’s on your mind?' : 'Drop your thought..'
              }`}
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
              className={`flex btn btn-sm items-center gap-2 ${
                isThoughtMode ? 'hidden' : 'block'
              }`}
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
              className={`flex btn btn-sm items-center gap-2 ${
                isThoughtMode ? 'hidden' : 'block'
              }`}
            >
              <IoVideocamOffOutline className="text-green-600 font-bold" />
              <p className="text-sm font-semibold">Video</p>
            </div>
            <VideoUploadModal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              user={user}
            />
            <div
              className="flex btn btn-sm items-center gap-2"
              onClick={() => setIsThoughtMode(!isThoughtMode)}
            >
              <FcIdea className="font-bold text-xl" />
              <p className="text-sm font-semibold">Thought</p>
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
  }
);

export default CreatePost;
