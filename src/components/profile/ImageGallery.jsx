/* eslint-disable react/prop-types */
import { FaHeart } from 'react-icons/fa6';
import { MdOutlineInsertComment } from 'react-icons/md';
import { Link } from 'react-router';

const ImageGallery = ({ post }) => {
  //hooks

  return (
    <div>
      <Link to={`/posts/${post?._id}`}>
        <div>
          <img
            src={post?.img}
            alt=""
            className="w-full h-36 object-cover rounded-lg"
          />
        </div>
      </Link>
      <div className="flex items-center gap-5 my-2">
        <div className="flex items-center gap-2">
          <FaHeart className="text-red-600" />
          <p>{post?.likes?.length}</p>
        </div>
        <div className="flex items-center gap-2">
          <MdOutlineInsertComment />
          <p>{post?.comments?.length}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
