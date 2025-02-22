/* eslint-disable react/prop-types */
import { useForm } from 'react-hook-form';
import Modal from '../../../utilities/Modal';
import { useEffect, useState } from 'react';
import { useUpdateUserProfileMutation } from '../../../redux/api/users/usersApi';
import LoadingButton from '../../../utilities/btn/LoadingButton';

const UpdateProfileModal = ({
  user,
  isUpdateProfileOpen,
  setIsUpdateProfileOpen,
}) => {
  //user object destructuring
  const {
    bio,
    location,
    birthDate,
    profession,
    relationshipStatus,
    uid,
    gender,
  } = user;

  //prv Details of the specific user from db.
  const prvAbout = {
    bio,
    location,
    birthDate,
    profession,
    relationshipStatus,
    gender,
  };

  //hooks
  const [updateUserInfo] = useUpdateUserProfileMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bio,
      location,
      birthDate,
      profession,
      relationshipStatus,
      gender,
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // ✅ Sync form when `user.name` changes
  useEffect(() => {
    reset({
      bio,
      location,
      birthDate,
      profession,
      relationshipStatus,
      gender,
    });
  }, [bio, location, birthDate, profession, relationshipStatus, gender, reset]);

  const onSubmit = async (data) => {
    let updates = {};

    // Check for differences
    for (const key in prvAbout) {
      if (data[key] !== prvAbout[key]) {
        updates[key] = data[key]; // Only add changed fields
      }
    }

    // If no changes detected
    if (Object.keys(updates).length === 0) {
      alert('You have to make changes to at least one field to update!');
      reset();
      return;
    }
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
        console.log(updatedResult.user);
        reset();
        setIsLoading(false);

        setIsUpdateProfileOpen(false);
      }
    } catch (error) {
      reset();
      setIsLoading(false);
      setError(error.message);
    }
  };

  return (
    <Modal isOpen={isUpdateProfileOpen} setIsOpen={setIsUpdateProfileOpen}>
      <div className="w-full md:w-1/2 mx-0 md:mx-auto shadow-xl p-2 md:p-5">
        <h1 className="text-center font-semibold mb-5 text-xl">
          Update your Profile
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full mb-5">
            <label
              htmlFor="bio ,"
              className="text-sm font-semibold mb-3 border-b-2 border-blue-500"
            >
              Add Bio
            </label>
            <textarea
              {...register('bio', {
                maxLength: {
                  value: 400,
                  message: 'Bio cannot exceed 400 characters.',
                },
                validate: (value) =>
                  value === '' ||
                  value.trim().length > 0 ||
                  'Bio cannot be empty spaces.',
              })}
              className="w-full p-2 resize-none overflow-y-scroll no-scrollbar focus:outline-none"
              placeholder="Share your thoughts..."
              style={{
                scrollbarWidth: 'none', // For Firefox
                msOverflowStyle: 'none', // For IE and Edge
              }}
            ></textarea>
            {errors.bio && (
              <p className="text-red-500 my-2 text-xs">{errors.bio.message}</p>
            )}
          </div>
          <div className="divider my-5"></div>
          <div className="mb-5">
            <label
              htmlFor="profession"
              className="text-sm font-semibold mb-3 border-b-2 border-blue-500"
            >
              Add Profession
            </label>
            <div>
              <input
                {...register('profession', {
                  maxLength: {
                    value: 20,
                    message: 'Bio cannot exceed 20 characters.',
                  },
                  validate: (value) =>
                    value === '' ||
                    value.trim().length > 0 ||
                    'Profession cannot be empty spaces.',
                })}
                type="text"
                placeholder="eg: Software Developer"
                className="border-b-2 mt-3 w-full text-sm p-2"
              />
            </div>
            {errors.profession && (
              <p className="text-red-500 my-2 text-xs">
                {errors.profession.message}
              </p>
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="profession"
              className="text-sm font-semibold mb-3 border-b-2 border-blue-500"
            >
              Add Location
            </label>
            <div>
              <input
                {...register('location', {
                  maxLength: {
                    value: 20,
                    message: 'Bio cannot exceed 20 characters.',
                  },
                  validate: (value) =>
                    value === '' ||
                    value.trim().length > 0 ||
                    'Location cannot be empty spaces.',
                })}
                type="text"
                placeholder="eg: New York"
                className="border-b-2 mt-3 w-full p-2 text-sm"
              />
            </div>
          </div>
          {errors.location && (
            <p className="text-red-500 my-2 text-xs">
              {errors.location.message}
            </p>
          )}
          <div className="flex items-center justify-between mb-5 ">
            <div>
              <label
                htmlFor="relationshipStatus"
                className="border-b-2 border-blue-500 text-sm"
              >
                Add Gender
              </label>
            </div>
            <select
              {...register('gender')}
              id="gender"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="flex items-center justify-between mb-5 ">
            <div>
              <label
                htmlFor="relationshipStatus"
                className="border-b-2 border-blue-500 text-sm"
              >
                Add Relationship
              </label>
            </div>
            <select
              {...register('relationshipStatus')}
              id="relationshipStatus"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="In_a_relation">In a Relationship</option>
              <option value="Divorced">Divorced</option>
            </select>
          </div>
          <div className="flex items-center mb-5 justify-between gap-5">
            <div>
              <label
                htmlFor="birthday"
                className="border-b-2 border-blue-500 text-sm"
              >
                Add Birthday
              </label>
            </div>
            <input {...register('birthDate')} type="date" />
          </div>
          {!isLoading ? (
            <input
              type="submit"
              className="btn w-full my-2  rounded bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white "
              value="Update"
            />
          ) : (
            <LoadingButton />
          )}
        </form>
        {error && (
          <p className="my-5 text-xs font-semibold text-red-600">{error}</p>
        )}
      </div>
    </Modal>
  );
};

export default UpdateProfileModal;
