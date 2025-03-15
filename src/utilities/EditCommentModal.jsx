/* eslint-disable react/prop-types */
import { formatDistanceToNow } from 'date-fns';
import Modal from './Modal';
import DefaultProfilePIcture from '../components/profile/DefaultProfilePIcture';
import { FaPaperPlane } from 'react-icons/fa6';
import { useState } from 'react';
import { useUpdateCommentMutation } from '../redux/api/posts/postsApi';
import toast, { Toaster } from 'react-hot-toast';

const EditCommentModal = ({ isOpen, setIsOpen, comment, postId }) => {
  //hooks
  const [updateComment] = useUpdateCommentMutation();
  //destructuring
  const { user, text, createdAt } = comment;

  const [newComment, setNewComment] = useState('');

  // Converts createdAt timestamp into a human-readable relative time format.
  const timeAgo = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  //handleOnChange
  const handleOnChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedComment = newComment.trim();

    if (trimmedComment < 1) {
      return alert('You have to write something to edit the comment!');
    }

    if (trimmedComment === text) {
      return alert('You have to make changes to edit your comment!');
    }

    const updatedDoc = {
      comment_id: comment?._id,
      text: trimmedComment,
    };

    try {
      const response = await updateComment({ id: postId, text: updatedDoc });
      console.log(response);
      if (response.data.success) {
        setIsOpen(false);
        toast.success('Comment Updated Successfully!');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="md:w-1/2 md:mx-auto mt-5 p-4 md:p-6 bg-white shadow-lg rounded-lg">
        <Toaster />
        <h5 className="font-semibold text-xl text-center mb-5">
          Edit Your Comment!
        </h5>
        <div className="flex items-center justify-between">
          {/* User Info */}
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                {user?.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <DefaultProfilePIcture />
                )}
              </div>
            </div>
            <div>
              <h5 className="font-semibold text-sm text-gray-900">
                {user?.name}
              </h5>
              <span className="text-xs text-gray-500">
                {timeAgo(createdAt)}
              </span>
            </div>
          </div>
        </div>
        <form className="relative w-full my-5" onSubmit={handleSubmit}>
          {/* Textarea */}
          <textarea
            onChange={handleOnChange}
            defaultValue={text}
            className="w-full h-20 p-2 pr-10 resize-none  rounded-md bg-gray-100 border border-gray-200 focus:border-blue-100 focus:ring-1 focus:ring-blue-100 overflow-y-scroll no-scrollbar"
            placeholder="Edit your comment..."
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
    </Modal>
  );
};

export default EditCommentModal;
