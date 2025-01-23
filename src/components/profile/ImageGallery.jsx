import { FaHeart } from 'react-icons/fa6';
import { MdOutlineInsertComment } from 'react-icons/md';

const ImageGallery = (post) => {
  const { src, likes, comments } = post.post;
  console.log(post);
  console.log(src, likes);
  return (
    <div>
      <img src={src} className="rounded-lg object-cover" alt="" />
      <div className="flex items-center gap-5 mt-2">
        <div className="flex items-center gap-2 ">
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
