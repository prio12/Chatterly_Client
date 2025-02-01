/* eslint-disable react/prop-types */
import Modal from '../../../utilities/Modal';

const UpdateProfileModal = ({
  isUpdateProfileOpen,
  setIsUpdateProfileOpen,
}) => {
  return (
    <Modal isOpen={isUpdateProfileOpen} setIsOpen={setIsUpdateProfileOpen}>
      <div>
        <h1>Update your Profile</h1>
      </div>
    </Modal>
  );
};

export default UpdateProfileModal;
