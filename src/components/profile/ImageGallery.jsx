/* eslint-disable react/prop-types */
import { FaHeart } from 'react-icons/fa6';
import { MdOutlineInsertComment } from 'react-icons/md';
import { Link } from 'react-router';

const ImageGallery = ({ post }) => {
  return (
    <div className="relative group rounded-md overflow-hidden shadow-sm">
      <Link to={`/posts/${post?._id}`}>
        <img
          src={post?.img}
          alt="Post"
          className="w-full h-36 object-cover rounded-md transition duration-300 group-hover:opacity-80"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
          <span className="text-white text-sm font-medium">View Post</span>
        </div>
      </Link>

      <div className="flex items-center gap-5 mt-2 px-1">
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <FaHeart className="text-red-500" />
          <span>{post?.likes?.length}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <MdOutlineInsertComment />
          <span>{post?.comments?.length}</span>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
