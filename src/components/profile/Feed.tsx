/* eslint-disable react/prop-types */
import { BiNotepad } from 'react-icons/bi';
import { useParams } from 'react-router';
import { UserWithPosts } from '../../types';
import { useAppSelector } from '../../hooks/hooks';
import PostCard from './PostCard';
import CreatePost from '../CreatePost';

interface FeedProps {
  user: UserWithPosts;
}

const Feed = ({ user }: FeedProps) => {
  //user object destructuring
  const { posts } = user;

  //hooks
  const { currentUser } = useAppSelector((state) => state.loggedInUser);
  const { uid } = useParams();

  let content;

  if (posts.length === 0) {
    content = (
      <div className="flex flex-col items-center justify-center py-12 text-gray-600">
        <BiNotepad className="text-7xl text-gray-400 mb-4" />
        <p className="text-xl font-semibold">Nothing to see here yet</p>
        <p className="text-sm text-gray-400">
          Posts will appear here once available.
        </p>
      </div>
    );
  } else {
    content = posts.map((post) => <PostCard key={post._id} post={post} />);
  }

  return (
    <div>
      {currentUser === uid && <CreatePost user={user} />}
      {content}
    </div>
  );
};

export default Feed;
