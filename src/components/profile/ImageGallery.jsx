import { useState } from 'react';
import { FaHeart } from 'react-icons/fa6';
import { MdOutlineInsertComment } from 'react-icons/md';
import PostDetailsModal from '../../utilities/PostDetailsModal';

const ImageGallery = (post) => {
  //hooks
  let [isOpen, setIsOpen] = useState(false);
  const { src, likes, comments } = post.post;

  return (
    <div
      className="cursor-pointer group relative overflow-hidden rounded-lg"
      onClick={() => setIsOpen(!isOpen)}
    >
      <PostDetailsModal post={post} isOpen={isOpen} setIsOpen={setIsOpen} />
      {/* Image */}
      <img
        src={src}
        className="rounded-lg object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        alt=""
      />{' '}
      {/* Likes and Comments */}
      <div className="flex items-center gap-5 mt-2">
        <div className="flex items-center gap-2">
          <FaHeart className="text-red-600" />
          <p>{likes}</p>
        </div>
        <div className="flex items-center gap-2">
          <MdOutlineInsertComment />
          {comments}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
