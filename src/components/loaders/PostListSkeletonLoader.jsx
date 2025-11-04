/* eslint-disable react/prop-types */
import PostSkeletonLoader from './PostSkeletonLoader';

const PostListSkeletonLoader = ({ count = 3 }) => {
  return (
    <div>
      {Array.from({ length: count }).map((_, index) => (
        <PostSkeletonLoader key={index} />
      ))}
    </div>
  );
};

export default PostListSkeletonLoader;
