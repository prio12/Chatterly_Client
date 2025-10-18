import LeftSideBar from '../components/common/LeftSideBar';

const Settings = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 bg-gray-100 max-h-screen">
      {/* Left Sidebar */}
      <div className="hidden md:block col-span-3 bg-white">
        <LeftSideBar />
      </div>

      {/* Main Search Area */}
      <div className="col-span-1 md:col-span-7 bg-white flex justify-center md:px-5">
        <div className="w-full py-0 px-5 relative">
          <p>Welcome to Settings </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
