/* eslint-disable react/prop-types */
import DefaultProfilePIcture from '../components/profile/DefaultProfilePIcture';
import Modal from './Modal';

const ContentUploadModal = ({ isOpen, setIsOpen, type, user }) => {
  const { profilePicture, name } = user;
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="md:w-1/2 md:mx-auto mt-5 p-2 md:p-5 shadow-md">
        <div className="flex items-center gap-5">
          <div>
            {profilePicture ? (
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src={profilePicture} />
                </div>
              </div>
            ) : (
              <div className="w-12">
                <DefaultProfilePIcture />
              </div>
            )}
          </div>
          <div>
            <h5 className="text-sm font-semibold">{name}</h5>
          </div>
        </div>
        <div className="divider "></div>
        <div className="w-full">
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
        </div>
        <div className="my-5">
          <input
            type="file"
            accept="image/jpeg, image/png, image/webp, image/jpg"
            className="file-input w-full max-w-xs"
            // onChange={handleOnChange}
          />
          <button
            // onClick={handleSubmit}
            className="btn  rounded  btn-outline mt-5 w-full md:w-auto lg:w-auto  md:mt-0 "
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ContentUploadModal;
