/* eslint-disable react/prop-types */
import { FiPlus } from 'react-icons/fi';
import ImageGallery from './ImageGallery';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useState } from 'react';
import ContentUploadModal from '../../utilities/ContentUploadModal ';

const Media = ({ user, currentUserData }) => {
  const posts = user?.posts;
  const { currentUser } = useSelector((state) => state.loggedInUser);
  const { uid } = useParams();

  const [isOpen, setIsOpen] = useState(false);

  const postsWithImages = posts?.filter(
    (post) => typeof post?.img === 'string' && post?.img.trim() !== ''
  );

  let content;

  if (postsWithImages?.length === 0) {
    content = <div> No images to show here! </div>;
  } else {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-3 my-5 gap-5">
        {postsWithImages?.length &&
          postsWithImages?.map((post) => (
            <ImageGallery key={post?._id} post={post} />
          ))}
      </div>
    );
  }
  return (
    <div className="p-5 bg-white border my-5">
      {/* Header */}
      <div className="flex items-center mb-5 justify-between">
        <h5 className="font-bold text-xl">Photos</h5>
        {currentUser === uid && (
          <button
            onClick={() => setIsOpen(true)}
            className="btn btn-sm rounded bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white"
          >
            <FiPlus className="text-xl" /> Add a Photo
          </button>
        )}
        <ContentUploadModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          user={currentUserData}
          type="posts"
        />
      </div>
      {content}
    </div>
  );
};

export default Media;
