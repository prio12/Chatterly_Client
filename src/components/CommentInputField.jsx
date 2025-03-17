/* eslint-disable react/prop-types */
import { FaPaperPlane } from 'react-icons/fa';
import DefaultProfilePIcture from './profile/DefaultProfilePIcture';
import { useState } from 'react';
import { useHandleAddCommentMutation } from '../redux/api/posts/postsApi';
import toast, { Toaster } from 'react-hot-toast';

const CommentInputField = ({ post, user, userId }) => {
  //hooks
  const [addComment] = useHandleAddCommentMutation();
  const [commentText, setCommentText] = useState('');

  const handleOnchange = (e) => {
    setCommentText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = commentText.trim();

    if (text.length < 1) {
      return alert('You have to write something to add a comment!');
    }

    const comment = {
      user: userId,
      authorId: post?.author?._id,
      authorUid: post?.author?.uid,
      text,
    };

    //sending comment to the server
    try {
      const response = await addComment({ id: post?._id, comment }).unwrap();
      if (response.success) {
        setCommentText('');
        toast.success('Comment Added!');
      }
    } catch (error) {
      console.log(error);
      setCommentText('');
      toast.error(`${error.message}`);
    }
  };
  return (
    <div className="flex items-start gap-3">
      <Toaster />
      {/* Avatar */}
      <div className="avatar">
        <div className="w-8 rounded-full">
          {user?.profilePicture ? (
            <img src={user?.profilePicture} alt="User Avatar" />
          ) : (
            <DefaultProfilePIcture />
          )}
        </div>
      </div>

      {/* Comment Input Form */}
      <form className="relative w-full" onSubmit={handleSubmit}>
        {/* Textarea */}
        <textarea
          onChange={handleOnchange}
          value={commentText}
          className="w-full h-10 p-2 pr-10 resize-none  rounded-md bg-gray-100 border border-gray-200 focus:border-blue-100 focus:ring-1 focus:ring-blue-100 overflow-y-scroll no-scrollbar"
          placeholder="Write your comment..."
          style={{
            scrollbarWidth: 'none', // For Firefox
            msOverflowStyle: 'none', // For IE and Edge
          }}
        ></textarea>
        {/* Submit Button */}
        <button
          type="submit"
          className="absolute right-2 top-2 text-gray-600 hover:text-blue-500"
        >
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default CommentInputField;
