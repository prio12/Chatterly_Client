import { IoVideocamOffOutline } from 'react-icons/io5';
import { MdEventAvailable, MdOutlineInsertPhoto } from 'react-icons/md';

const CreatePost = () => {
  return (
    <div className="my-5 border p-5 ">
      {/* Avatar and Textarea */}
      <div className="flex items-center gap-3">
        <div className="avatar mt-[-24px]">
          <div className="w-8 rounded-full">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIwuCp7qc5mRQU5EfJHRzRdJjzWwKUM3uBHQ&s"
              alt="Avatar"
            />
          </div>
        </div>
        <div className="w-full">
          <textarea
            className="w-full p-2 resize-none overflow-y-scroll no-scrollbar focus:outline-none"
            placeholder="Share your thoughts..."
            style={{
              scrollbarWidth: 'none', // For Firefox
              msOverflowStyle: 'none', // For IE and Edge
            }}
          ></textarea>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="flex btn btn-sm items-center gap-2">
            <MdOutlineInsertPhoto className="text-green-600 font-bold" />
            <p className="text-sm font-semibold">Photo</p>
          </div>
          <div className="flex btn btn-sm items-center gap-2">
            <IoVideocamOffOutline className="text-green-600 font-bold" />
            <p className="text-sm font-semibold">Video</p>
          </div>
          <div className="flex btn btn-sm items-center gap-2">
            <MdEventAvailable className="text-green-600 font-bold" />
            <p className="text-sm font-semibold">Event</p>
          </div>
        </div>
        <div>
          <input
            type="submit"
            className="btn btn-sm rounded-md bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white"
            value="Submit"
          />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
