/* eslint-disable react/prop-types */
import Modal from '../../../utilities/Modal';

const UpdateNameModal = ({ isUpdateNameOpen, setIsUpdateNameOpen }) => {
  return (
    <Modal isOpen={isUpdateNameOpen} setIsOpen={setIsUpdateNameOpen}>
      <div>
        <h3>Update Your Name</h3>
      </div>
    </Modal>
  );
};

export default UpdateNameModal;
