/* eslint-disable react/prop-types */
import { FaHeart } from 'react-icons/fa6';
import CommentInputField from '../CommentInputField';
import CommentBox from '../CommentBox';
import { MdOutlineInsertComment } from 'react-icons/md';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { formatDistanceToNow } from 'date-fns';

const PostCard = ({ post }) => {
  //post object destructuring
  const { content, img, author, createdAt, likes } = post;

  // Converts createdAt timestamp into a human-readable relative time format.
  const timeAgo = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  //will be removed
  const comments = [
    {
      id: 1,
      author: 'Captain Levi',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpTREHn1wC6vG6w0AZVb_YtxnCyzi2Lx760VrpxrwG9ObSBSar72nFLWkWblx5t5jYJ7I&usqp=CAU',
      content:
        'Next time, try not to sit around screaming while I clean up your mess, brat. Never forget who had to save your sorry ass again. Make it worth it, Eren!',
    },
    {
      id: 2,
      author: 'Eren Yeager',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpTREHn1wC6vG6w0AZVb_YtxnCyzi2Lx760VrpxrwG9ObSBSar72nFLWkWblx5t5jYJ7I&usqp=CAU',
      content:
        "I'll make sure it's worth it next time, Captain. I promise I won't let you down again.",
    },
    {
      id: 2,
      author: 'Eren Yeager',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpTREHn1wC6vG6w0AZVb_YtxnCyzi2Lx760VrpxrwG9ObSBSar72nFLWkWblx5t5jYJ7I&usqp=CAU',
      content:
        "I'll make sure it's worth it next time, Captain. I promise I won't let you down again.",
    },
  ];

  return (
    <div className="my-8 bg-white border p-5 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIwuCp7qc5mRQU5EfJHRzRdJjzWwKUM3uBHQ&s" />
            </div>
          </div>
          <div>
            <h5 className="font-bold">Eren Yeager</h5>
            <span className="text-xs">{timeAgo(createdAt)}</span>
          </div>
        </div>
        <div>
          <HiOutlineDotsHorizontal className="cursor-pointer" />
        </div>
      </div>
      <div>
        <div>
          {content && <p className="my-5">{content}</p>}
          {img && (
            <img
              src={img}
              alt="cover photo"
              className="rounded-md w-full my-5"
            />
          )}
        </div>
      </div>
      <div className="flex items-center my-5 gap-5">
        <div className="flex text-sm items-center gap-2">
          <FaHeart className="text-red-600" />
          {likes?.length > 0 ? <span>{likes.length}</span> : <span>(0)</span>}
        </div>
        <div className="flex text-sm items-center gap-2">
          <MdOutlineInsertComment />
          {comments?.length > 0 ? (
            <span>({comments.length})</span>
          ) : (
            <span>(0)</span>
          )}
        </div>
      </div>
      <CommentInputField />
      {comments.length && (
        <div className="max-h-48 overflow-y-scroll no-scrollbar">
          {comments.length &&
            comments.map((comment) => (
              <CommentBox comment={comment} key={comment.id} />
            ))}
        </div>
      )}
    </div>
  );
};

export default PostCard;
