/* eslint-disable react/prop-types */
import { useState } from 'react';
import { IoVideocamOffOutline } from 'react-icons/io5';
import { MdEventAvailable, MdOutlineInsertPhoto } from 'react-icons/md';
import { useCreateAPostMutation } from '../redux/api/posts/postsApi';
import toast, { Toaster } from 'react-hot-toast';

const CreatePost = ({ user }) => {
  //hooks
  const [text, setText] = useState('');
  const [createPost] = useCreateAPostMutation();
  const [isLoading, setIsLoading] = useState(false);

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
      alert(
        "Write something to post. If you're posting an image, a caption is required!"
      );
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
      <Toaster />
      <div className="flex items-center gap-3">
        <div className="avatar mt-[-24px]">
          <div className="w-8 rounded-full">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIwuCp7qc5mRQU5EfJHRzRdJjzWwKUM3uBHQ&s"
              alt="Avatar"
            />
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
          <div className="flex btn btn-sm items-center gap-2">
            <MdOutlineInsertPhoto className="text-green-600 font-bold" />
            <p className="text-sm font-semibold">Photo</p>
          </div>
          <div className="flex btn btn-sm items-center gap-2">
            <IoVideocamOffOutline className="text-green-600 font-bold" />
            <p className="text-sm font-semibold">Video</p>
          </div>
          <div className="flex btn btn-sm items-center gap-2">
            <MdEventAvailable className="text-green-600 font-bold" />
            <p className="text-sm font-semibold">Event</p>
          </div>
        </div>
        <div className="my-5 md:my-0 ">
          {isLoading ? (
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
          ) : (
            <button
              onClick={handleSubmit}
              className="btn  btn-md md:btn-sm rounded-md bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
