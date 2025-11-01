/* eslint-disable react/prop-types */
import { useContext, useRef, useState, useEffect } from 'react';
import { IoIosSend, IoMdClose } from 'react-icons/io';
import { MdEmojiEmotions } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useSendMessageMutation } from '../../redux/api/messaging/messagingApi';
import toast from 'react-hot-toast';
import SocketContext from '../../context/SocketContext';
import EmojiPicker from 'emoji-picker-react';
import { FaRegFileImage } from 'react-icons/fa6';

const ChatFooter = ({ selectedUserData, loggedInUserId }) => {
  const { userProfile } = useSelector((state) => state.chat);
  const [text, setText] = useState('');
  const [sendText] = useSendMessageMutation();
  const socket = useContext(SocketContext);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const emojiPickerRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isImageUploadLoading, setImageUploadLoading] = useState(false);

  let typingTimeout = useRef(null);

  const handleOnChange = (e) => {
    setText(e.target.value);

    if (!socket) return;

    socket.emit('typing', {
      receiver: selectedUserData,
      sender: loggedInUserId,
    });

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }
    typingTimeout.current = setTimeout(() => {
      socket.emit('stopTyping', {
        receiver: selectedUserData,
        sender: loggedInUserId,
      });
    }, 2000);
  };

  const handleEmojiClick = (emojiData) => {
    setText((prev) => prev + emojiData.emoji);
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);

      // Create preview URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async () => {
    if (!text.trim() && !selectedFile) return;

    const textImageUrl = {};

    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('upload_preset', 'Using_Cloudinary_for_First_TIme');
      formData.append('cloud_name', 'dxzvyancg');

      try {
        setImageUploadLoading(true);
        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dxzvyancg/image/upload',
          {
            method: 'POST',
            body: formData,
          }
        );
        const result = await response.json();

        // console.log(result.secure_url, 'checking the secure url');
        if (result.secure_url) {
          textImageUrl.image = result.secure_url.replace(
            '/upload/',
            '/upload/w_1000,h_500,c_pad,b_auto/'
          );
          setImageUploadLoading(false);
        }
      } catch (error) {
        console.log(error, 'checking image upload in cloudinary error');
        setImageUploadLoading(false);
      }
    }

    const messageData = {
      participants: [
        selectedUserData?._id,
        userProfile?.payload?._id || loggedInUserId,
      ],
      sender: userProfile?.payload?._id || loggedInUserId,
      senderUid: userProfile?.payload?.uid,
      receiverUid: selectedUserData?.uid,
      text,
      image: textImageUrl?.image ? textImageUrl?.image : '',
    };

    try {
      const result = await sendText(messageData).unwrap();
      if (result.success) {
        setText('');
        handleRemoveFile();
      }
    } catch (error) {
      toast.error(error.data.error);
      setText('');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="relative w-full bg-slate-100 p-5 rounded-lg">
      {/* Emoji Picker - Positioned absolutely above the footer */}
      {showEmojiPicker && (
        <div
          ref={emojiPickerRef}
          className="absolute bottom-full left-0 mb-2 z-50"
        >
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            width={300}
            height={400}
          />
        </div>
      )}

      {/* Show loader while uploading */}
      {isImageUploadLoading && (
        <div className="absolute bottom-full left-0 mb-2 z-40">
          <div className="bg-white rounded-lg p-2 shadow-lg">
            <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-blue-400 flex items-center justify-center bg-gray-50">
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-blue-600 text-xs font-medium">
                  Uploading...
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-1 truncate max-w-[128px]">
              {selectedFile?.name}
            </p>
          </div>
        </div>
      )}

      {/* Show preview when not uploading */}
      {!isImageUploadLoading && previewUrl && (
        <div className="absolute bottom-full left-0 mb-2 z-40">
          <div className="bg-white rounded-lg p-2 shadow-lg">
            <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-blue-400">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              {/* Remove button */}
              <button
                onClick={handleRemoveFile}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 
          transition-colors"
              >
                <IoMdClose size={16} />
              </button>
            </div>
            <p className="text-xs text-gray-600 mt-1 truncate max-w-[128px]">
              {selectedFile?.name}
            </p>
          </div>
        </div>
      )}

      <textarea
        onChange={handleOnChange}
        value={text}
        className="w-full h-10 p-2 pr-10 resize-none rounded-md focus:outline-none overflow-y-scroll no-scrollbar"
        placeholder="Type a message..."
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      ></textarea>

      <div className="flex items-center justify-between my-3">
        <div className="flex items-center gap-5 text-xl">
          <MdEmojiEmotions
            className="cursor-pointer hover:text-blue-500 transition-colors"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          />

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/jpeg, image/png, image/webp, image/jpg"
          />

          {/* Attach icon that triggers file input */}
          <FaRegFileImage
            className="cursor-pointer hover:text-blue-500 transition-colors"
            onClick={handleFileClick}
          />
        </div>
        <div>
          <IoIosSend
            onClick={text || selectedFile ? handleSubmit : undefined}
            className={`text-2xl ${
              text || selectedFile
                ? 'text-blue-600 cursor-pointer hover:text-blue-700'
                : 'text-gray-400'
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatFooter;
