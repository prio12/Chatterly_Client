/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import Modal from './Modal';
import {
  useDeleteAPostMutation,
  useUpdateAPostMutation,
} from '../redux/api/posts/postsApi';
import { useEffect, useState } from 'react';
import LoadingButton from './btn/LoadingButton';
import toast, { Toaster } from 'react-hot-toast';

const UpdatePostModal = ({ isOpen, setIsOpen, img, content, id }) => {
  // hooks
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      content: content || '', // Prefill with existing content
    },
  });

  const [updateAPost] = useUpdateAPostMutation();
  const [deleteAPost] = useDeleteAPostMutation();

  const [isLoading, setIsLoading] = useState(false);
  //loading state for delete btn
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    reset({
      content: content,
    });
  }, [content, reset]);

  const updates = {
    id,
  };

  const submit = async (data) => {
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

    // sending update req to server
    try {
      setIsLoading(true);
      const response = await updateAPost(updates).unwrap();
      if (response.success) {
        setIsLoading(false);
        reset();
        setIsOpen(false);
        toast.success('Post Updated Successfully!!');
      }
    } catch (error) {
      setIsLoading(false);
      reset();
      setError(error.message);
    }
  };

  const handleDelete = async () => {
    const confirmation = window.confirm(
      'Are you sure you want to delete this post? This action cannot be undone!'
    );
    if (!confirmation) {
      return;
    }
    try {
      setLoading(true);
      const response = await deleteAPost({ _id: id });
      if (response.data.success) {
        setLoading(false);
        setIsOpen(false);
        toast.success('Post Deleted Successfully!!');
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="md:w-1/2 md:mx-auto mt-5 p-4 md:p-6 bg-white shadow-lg rounded-lg">
        <Toaster />
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
            {loading ? (
              <LoadingButton />
            ) : (
              <button
                onClick={handleDelete}
                type="button"
                className="btn rounded bg-red-100 text-red-500 hover:bg-red-500 hover:text-white"
              >
                Delete
              </button>
            )}
            {isLoading ? (
              <LoadingButton />
            ) : (
              <button
                type="submit"
                className="btn rounded bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white"
              >
                Update
              </button>
            )}
          </div>
        </form>
        {error && (
          <p className="my-5 text-xs font-semibold text-red-600">{error}</p>
        )}
      </div>
    </Modal>
  );
};

export default UpdatePostModal;
