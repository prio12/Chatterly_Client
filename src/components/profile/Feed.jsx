/* eslint-disable react/prop-types */
import CreatePost from '../CreatePost';
import PostCard from './PostCard';

const Feed = ({ user }) => {
  return (
    <div>
      <CreatePost user={user} />
      <PostCard />
    </div>
  );
};

export default Feed;
