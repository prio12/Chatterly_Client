/* eslint-disable react/prop-types */
import { FiPlus } from 'react-icons/fi';
import ImageGallery from './ImageGallery';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { useState } from 'react';
import ContentUploadModal from '../../utilities/ContentUploadModal ';

const Media = ({ user, currentUserData }) => {
  const posts = user?.posts;
  const { currentUser } = useSelector((state) => state.loggedInUser);
  const { uid } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  const postsWithImages = posts?.filter(
    (post) => typeof post?.img === 'string' && post?.img.trim() !== ''
  );

  const isOwner = currentUser === uid || currentUser === currentUserData?.uid;

  return (
    <div className="p-5 bg-white border rounded-md shadow-sm my-5">
      {/* Header */}
      <div className="flex items-center mb-5 justify-between">
        <h5 className="font-bold text-xl flex items-center gap-2">
          Photos
          <span className="text-sm bg-blue-100 text-blue-600 px-2 rounded-full">
            {postsWithImages?.length || 0}
          </span>
        </h5>

        {isOwner && (
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

      {/* Content */}
      {postsWithImages?.length === 0 ? (
        <div className="text-center text-gray-500 italic py-10">
          No images to show here!
          {isOwner && (
            <div className="mt-4">
              <button
                onClick={() => setIsOpen(true)}
                className="text-sm text-blue-500 underline"
              >
                Upload your first photo
              </button>
            </div>
          )}
        </div>
      ) : (
        <div
          className={`grid grid-cols-1   gap-5 ${
            pathname === '/myAlbum' ? 'md:grid-cols-2' : 'md:grid-cols-3'
          }`}
        >
          {postsWithImages.map((post) => (
            <ImageGallery key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Media;
