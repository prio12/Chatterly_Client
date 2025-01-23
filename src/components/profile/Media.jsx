import { FiPlus } from 'react-icons/fi';
import ImageGallery from './ImageGallery';

const Media = () => {
  const media = [
    {
      src: 'https://cdn.pixabay.com/photo/2017/01/14/12/59/iceland-1979445_960_720.jpg',
      likes: 120,
      comments: 10,
    },
    {
      src: 'https://cdn.pixabay.com/photo/2019/06/12/15/07/cat-4269479_960_720.jpg',
      likes: 200,
      comments: 15,
    },
    {
      src: 'https://cdn.pixabay.com/photo/2016/12/04/21/58/rabbit-1882699_960_720.jpg',
      likes: 180,
      comments: 8,
    },
  ];

  return (
    <div className="p-5 bg-white border my-5">
      {/* Header */}
      <div className="flex items-center mb-5 justify-between">
        <h5 className="font-bold text-xl">Photos</h5>
        <button className="btn btn-sm rounded bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white">
          <FiPlus className="text-xl" /> Add a Photo
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 my-5 gap-5">
        {media.length &&
          media.map((post, index) => <ImageGallery key={index} post={post} />)}
      </div>
    </div>
  );
};

export default Media;
