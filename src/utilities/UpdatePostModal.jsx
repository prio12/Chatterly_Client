/* eslint-disable react/prop-types */
import Modal from './Modal';

const UpdatePostModal = ({ isOpen, setIsOpen }) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="md:w-1/2 md:mx-auto mt-5 p-4 md:p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-center text-lg font-semibold my-5 text-gray-700">
          Manage Your Post
        </h1>

        <textarea
          // value={text}
          // onChange={handleOnChange}
          className="w-full p-2 resize-none overflow-y-scroll no-scrollbar focus:outline-none"
          placeholder="Share your thoughts..."
          style={{
            scrollbarWidth: 'none', // For Firefox
            msOverflowStyle: 'none', // For IE and Edge
          }}
        ></textarea>

        <div className="flex justify-end gap-3 mt-4">
          <button className="btn  rounded bg-red-100 text-red-500 hover:bg-red-500 hover:text-white ">
            Delete
          </button>
          <button className="btn  rounded bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white ">
            Update
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UpdatePostModal;
