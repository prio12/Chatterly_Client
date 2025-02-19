/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import Modal from './Modal';
import { useUpdateAPostMutation } from '../redux/api/posts/postsApi';

const UpdatePostModal = ({ isOpen, setIsOpen, img, content, id }) => {
  // hooks
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      content: content || '', // Prefill with existing content
    },
  });

  const [updateAPost] = useUpdateAPostMutation();

  const updates = {
    id,
  };

  const submit = (data) => {
    // This will now log the form values
    if (data.content === content) {
      alert('You have to make changes to update!');
      return;
    }
    const confirmation = window.confirm('Are you sure to make changes?');
    if (!confirmation) {
      return;
    }
    updates.content = data.content;
    updateAPost(updates);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="md:w-1/2 md:mx-auto mt-5 p-4 md:p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-center text-lg font-semibold my-5 text-gray-700">
          Manage Your Post
        </h1>

        {img && <img src={img} className="w-full mt-5" alt="Post" />}

        {/* Ensure the form properly submits */}
        <form onSubmit={handleSubmit(submit)}>
          <textarea
            {...register('content', {
              validate: (value) => {
                if (value.trim().length === 0 && value.length > 0) {
                  return 'Caption cannot be empty spaces.';
                }
                return true;
              },
            })}
            className="w-full p-2 resize-none overflow-y-scroll no-scrollbar focus:outline-none my-5"
            placeholder="Share your thoughts..."
            style={{
              scrollbarWidth: 'none', // For Firefox
              msOverflowStyle: 'none', // For IE and Edge
            }}
          ></textarea>

          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content.message}</p>
          )}

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              className="btn rounded bg-red-100 text-red-500 hover:bg-red-500 hover:text-white"
            >
              Delete
            </button>
            <button
              type="submit"
              className="btn rounded bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UpdatePostModal;
