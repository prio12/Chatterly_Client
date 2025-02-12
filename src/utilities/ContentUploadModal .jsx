/* eslint-disable react/prop-types */
import Modal from './Modal';

const ContentUploadModal = ({ isOpen, setIsOpen }) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div>
        <h1>This is content Upload modal</h1>
      </div>
    </Modal>
  );
};

export default ContentUploadModal;
