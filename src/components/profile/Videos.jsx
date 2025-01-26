import { FiPlus } from 'react-icons/fi';

const Videos = () => {
  return (
    <div className="p-5 bg-white border my-5">
      {/* Header */}
      <div className="flex items-center mb-5 justify-between">
        <h5 className="font-bold text-xl">Videos</h5>
        <button className="btn btn-sm rounded bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white">
          <FiPlus className="text-xl" /> Add a Video
        </button>
      </div>
    </div>
  );
};

export default Videos;
