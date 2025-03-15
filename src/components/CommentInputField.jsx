/* eslint-disable react/prop-types */
import { FaPaperPlane } from 'react-icons/fa';
import DefaultProfilePIcture from './profile/DefaultProfilePIcture';
import { useState } from 'react';

const CommentInputField = ({ post, user }) => {
  //hooks
  const [commentText, setCommentText] = useState('');

  const handleOnchange = (e) => {
    setCommentText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const text = commentText.trim();

    if (text.length < 1) {
      return alert('You have to write something to add a comment!');
    }

    const comment = {
      user: user?._id,
      text,
    };
  };
  return (
    <div className="flex items-start gap-3">
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
