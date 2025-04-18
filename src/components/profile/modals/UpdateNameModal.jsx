/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import Modal from '../../../utilities/Modal';
import { useUpdateUserProfileMutation } from '../../../redux/api/users/usersApi';
import { useEffect, useState } from 'react';
import LoadingButton from '../../../utilities/btn/LoadingButton';
import toast from 'react-hot-toast';

const UpdateNameModal = ({ user, isUpdateNameOpen, setIsUpdateNameOpen }) => {
  // user object destructure
  const { name, uid } = user;
  const [fName, lName] = name.split(' ');

  //hooks
  const [updateUserInfo] = useUpdateUserProfileMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fname: fName, // Set the default value here
      lname: lName,
    },
  });

  // ✅ Sync form when `user.name` changes
  useEffect(() => {
    reset({
      fname: fName,
      lname: lName,
    });
  }, [fName, lName, reset]);

  const onSubmit = async (data) => {
    const updatedFName = data.fname;
    const updatedLName = data.lname;
    const updatedFullName = updatedFName + ' ' + updatedLName;
    let updates = {};
    if (updatedFullName === name) {
      alert('You have to make changes to update!');
      reset();
      return;
    }
    updates.name = updatedFullName;

    const confirmation = window.confirm('Are you sure to make changes?');
    if (!confirmation) {
      return;
    }
    try {
      setIsLoading(true);
      const updatedResult = await updateUserInfo({
        userUid: uid,
        updates,
      }).unwrap();

      if (updatedResult.user) {
        reset();
        setIsLoading(false);
        setIsUpdateNameOpen(false);
        toast.success('Name Updated successfully!');
      }
    } catch (error) {
      reset();
      setIsLoading(false);
      setError(error.message);
    }
  };

  return (
    <Modal isOpen={isUpdateNameOpen} setIsOpen={setIsUpdateNameOpen}>
      <div className="w-full md:w-1/2 mx-0 md:mx-auto shadow-xl p-2 md:p-5">
        <h3 className="text-center text-xl font-semibold">Update Your Name</h3>
        <form onSubmit={handleSubmit(onSubmit)} className=" w-full   my-5 ">
          <div>
            <label
              htmlFor="fName"
              className="text-sm mb-3 font-semibold border-b-2 border-blue-500"
            >
              First Name
            </label>
            <input
              type="text"
              defaultValue={fName}
              className="input input-bordered w-full  my-2"
              {...register('fname', {
                required: 'First name is required', // Optionally add a custom error message
                setValueAs: (value) =>
                  typeof value === 'string' ? value.trim() : '',
              })}
            />
            {errors.fname && (
              <p className="text-red-500 my-2 text-xs">
                {errors.fname.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="lName"
              className="text-sm mb-3 font-semibold border-b-2 border-blue-500"
            >
              Last Name
            </label>
            <input
              type="text"
              className="input input-bordered w-full  my-2"
              {...register('lname', {
                required: 'Last name is required', // Optionally add a custom error message
                setValueAs: (value) =>
                  typeof value === 'string' ? value.trim() : '',
              })}
            />
            {errors.lname && (
              <p className="text-red-500 my-2 text-xs">
                {errors.lname.message}
              </p>
            )}
          </div>
          <div>
            {!isLoading ? (
              <input
                type="submit"
                className="btn w-full my-2  rounded bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white "
                value="Update"
              />
            ) : (
              <LoadingButton />
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

export default UpdateNameModal;
