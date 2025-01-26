/* eslint-disable react/prop-types */
import { FaHeart } from 'react-icons/fa6';
import Modal from './Modal';
import { MdOutlineInsertComment } from 'react-icons/md';
import CommentInputField from '../components/CommentInputField';
import CommentBox from '../components/CommentBox';

const PostDetailsModal = ({ isOpen, setIsOpen, post }) => {
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
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="grid grid-cols-1 gap-5 py-5 md:grid-cols-4">
        {/* Image Section */}
        <div className="col-span-2 order-1 md:order-2">
          <img
            className="min-w-full min-h-full object-cover"
            src={post.post.src}
            alt=""
          />
        </div>

        {/* Content Section */}
        <div className="col-span-2 order-2 md:order-1">
          <div className="flex items-center gap-2">
            <div className="avatar">
              <div className="w-8 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <div>
              <h6 className="font-semibold">{post.post.author}</h6>
              <p className="text-xs">26 January, 2025</p>
            </div>
          </div>
          <p className="text-sm my-5">
            I am so privileged to be involved in the @bootstrap hiring process!
          </p>
          <div className="flex items-center mb-5 gap-5">
            <div className="flex text-sm items-center gap-2">
              <FaHeart className="text-red-600" />
              <span>(123)</span>
            </div>
            <div className="flex text-sm items-center gap-2">
              <MdOutlineInsertComment />
              <span>(23)</span>
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
      </div>
    </Modal>
  );
};

export default PostDetailsModal;
