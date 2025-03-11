import { useParams } from 'react-router';
import LeftSideBar from '../LeftSideBar';
import RightSideBar from '../RightSideBar';

const PostDetails = () => {
  //hooks
  const { id } = useParams();
  console.log(id);
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
