/* eslint-disable react/prop-types */
import { Dialog } from '@headlessui/react';
import { FiX } from 'react-icons/fi';

const Modal = ({ isOpen, setIsOpen, children }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => {}} // Prevent closing on background clicks
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        aria-hidden="true"
      ></div>

      {/* Modal Content */}
      <div
        className="relative bg-white rounded-lg shadow-lg max-w-5xl w-full p-8 sm:p-12"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full p-1"
          onClick={() => setIsOpen(false)}
          aria-label="Close Modal"
        >
          <FiX className="w-6 h-6" />
        </button>

        {/* Modal Children */}
        {children}
      </div>
    </Dialog>
  );
};

export default Modal;
