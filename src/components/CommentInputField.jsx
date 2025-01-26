import { FaPaperPlane } from 'react-icons/fa';

const CommentInputField = () => {
  return (
    <div className="flex items-start gap-3">
      {/* Avatar */}
      <div className="avatar">
        <div className="w-8 rounded-full">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIwuCp7qc5mRQU5EfJHRzRdJjzWwKUM3uBHQ&s"
            alt="User Avatar"
          />
        </div>
      </div>

      {/* Comment Input Form */}
      <form className="relative w-full">
        {/* Textarea */}
        <textarea
          className="w-full h-10 p-2 pr-10 resize-none  rounded-md bg-gray-200 border border-gray-300 focus:border-blue-200 focus:ring-1 focus:ring-blue-200 overflow-y-scroll no-scrollbar"
          placeholder="Write your comment..."
          style={{
            scrollbarWidth: 'none', // For Firefox
            msOverflowStyle: 'none', // For IE and Edge
          }}
        ></textarea>
        {/* Submit Button */}
        <button
          type="submit"
          className="absolute right-2 top-2 text-gray-600 hover:text-blue-500"
        >
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default CommentInputField;
