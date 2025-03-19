import LeftSideBar from '../components/common/LeftSideBar';
import RightSideBar from '../components/common/RightSideBar';

const Connections = () => {
  return (
    <div className="grid grid-cols-1 relative  md:grid-cols-12 gap-5 bg-gray-100 min-h-screen">
      {/* Left Sidebar */}
      <div className="hidden md:block col-span-3 bg-white">
        <LeftSideBar />
      </div>

      <div className="col-span-1  relative md:col-span-7 bg-white p-2 md:py-2 md:px-5">
        {/* {content} */}
        <div className="sticky top-28">this is fonnections</div>
      </div>

      {/* Right Sidebar */}
      <div className="hidden md:block col-span-2 bg-white">
        <RightSideBar />
      </div>
    </div>
  );
};

export default Connections;
