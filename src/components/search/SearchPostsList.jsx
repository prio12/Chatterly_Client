import { Link } from 'react-router';
import DefaultProfilePIcture from '../profile/DefaultProfilePIcture';
import { formatDistanceToNow } from 'date-fns';

/* eslint-disable react/prop-types */
const SearchPostsList = ({ post }) => {
  // Converts createdAt timestamp into a human-readable relative time format.
  const timeAgo = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  console.log(post, 'from search post list');
  return (
    <div className="mb-5">
      <Link to={`/posts/${post?._id}`}>
        <div className="flex items-center gap-5">
          <div className="avatar">
            <div className="w-8 rounded-full">
              {post?.author?.profilePicture ? (
                <img src={post?.author?.profilePicture} />
              ) : (
                <DefaultProfilePIcture />
              )}
            </div>
          </div>
          <h5 className="font-semibold text-sm">{post?.author?.name}</h5>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-2">
            {timeAgo(post?.createdAt)}
          </p>
          <div className="p-5 bg-gray-200 rounded-lg">
            <p>{post?.content}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SearchPostsList;
