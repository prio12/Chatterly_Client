import { MdDelete, MdOutlineModeEdit } from 'react-icons/md';
import DefaultProfilePIcture from './profile/DefaultProfilePIcture';
import { formatDistanceToNow } from 'date-fns';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import EditCommentModal from '../utilities/editCommentModal';
import { useDeleteACommentMutation } from '../redux/api/posts/postsApi';

/* eslint-disable react/prop-types */
const CommentBox = ({ comment, author, postId }) => {
  //mutation hook
  const [deleteComment] = useDeleteACommentMutation();
  const { user, text, createdAt } = comment;
  const [isOpen, setIsOpen] = useState(false);

  //hooks
  const { currentUser } = useSelector((state) => state.loggedInUser);

  // Converts createdAt timestamp into a human-readable relative time format.
  const timeAgo = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  const handleDelete = async () => {
    try {
      const response = await deleteComment({ postId, commentId: comment?._id });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-4  p-4 rounded-lg shadow-sm border bg-gray-200">
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
            <span className="text-xs text-gray-500">{timeAgo(createdAt)}</span>
          </div>
        </div>

        {/* Action Icons */}
        <div className="text-gray-500 flex items-center gap-3 text-lg">
          {currentUser === user?.uid && (
            <MdOutlineModeEdit
              onClick={() => setIsOpen(true)}
              className="cursor-pointer hover:text-blue-500 transition"
            />
          )}

          <EditCommentModal
            postId={postId}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            comment={comment}
          />

          {(currentUser === user?.uid || currentUser === author?.uid) && (
            <MdDelete
              onClick={handleDelete}
              className="cursor-pointer hover:text-red-500 transition"
            />
          )}
        </div>
      </div>

      {/* Comment Text */}
      <p className="text-sm text-gray-800 mt-1 leading-relaxed">{text}</p>
    </div>
  );
};

export default CommentBox;
