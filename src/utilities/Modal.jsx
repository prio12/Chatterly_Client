/* eslint-disable react/prop-types */
import { Dialog } from '@headlessui/react';
import { FiX } from 'react-icons/fi';

const Modal = ({ isOpen, setIsOpen, children }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        aria-hidden="true"
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-md md:max-w-lg lg:max-w-xl p-4 mx-4 bg-white rounded-lg shadow-lg">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={() => setIsOpen(false)}
          aria-label="Close"
        >
          <FiX className="w-6 h-6" />
        </button>

        {/* Modal Children */}
        <div className="p-4">{children}</div>
      </div>
    </Dialog>
  );
};

export default Modal;
