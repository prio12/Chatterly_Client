import { useParams } from 'react-router';
import LeftSideBar from '../LeftSideBar';
import RightSideBar from '../RightSideBar';
import { useGetAPostQuery } from '../../../redux/api/posts/postsApi';
import PostCard from '../../profile/PostCard';
import { useSelector } from 'react-redux';
import { useUserInfoByUidQuery } from '../../../redux/api/users/usersApi';

const PostDetails = () => {
  //hooks
  const { id } = useParams();
  const { data, isLoading } = useGetAPostQuery(id);
  const post = data?.response;
  const { currentUser } = useSelector((state) => state.loggedInUser);

  const { data: user, isLoading: loading } = useUserInfoByUidQuery(currentUser);
  const _id = user?.user?._id;

  if (isLoading && loading) {
    return <div>Loading...</div>;
  }

  console.log(post);
  console.log(user);
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 bg-gray-100 min-h-screen">
      {/* Left Sidebar */}
      <div className="hidden md:block col-span-3 bg-white">
        <LeftSideBar />
      </div>

      <div className="col-span-1 md:col-span-7 bg-white flex justify-center md:py-2 md:px-5 ">
        <div className="w-full max-w-5xl md:px-5 px-0 py-2">
          {/* <Stories />
          <CreatePost user={user} />
          {content} */}
          <div className="fixed top-24">
            <PostCard post={post} id={_id} />
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="hidden md:block col-span-2 bg-white">
        <RightSideBar />
      </div>
    </div>
  );
};

export default PostDetails;
