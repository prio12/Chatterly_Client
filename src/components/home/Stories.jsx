/* eslint-disable react/prop-types */
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import ContentUploadModal from '../../utilities/ContentUploadModal ';

const Stories = ({ user }) => {
  //hooks
  const [isOpen, setIsOpen] = useState(false);
  const users = [
    {
      id: 1,
      name: 'Eren Yeager',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIwuCp7qc5mRQU5EfJHRzRdJjzWwKUM3uBHQ&s',
      stories: [
        {
          url: 'https://cdn.pixabay.com/photo/2016/12/04/21/58/rabbit-1882699_960_720.jpg',
          type: 'image',
        },
      ],
    },
    {
      id: 2,
      name: 'Eren Yeager',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIwuCp7qc5mRQU5EfJHRzRdJjzWwKUM3uBHQ&s',
      stories: [
        {
          url: 'https://cdn.pixabay.com/photo/2016/12/04/21/58/rabbit-1882699_960_720.jpg',
          type: 'image',
        },
      ],
    },
    {
      id: 3,
      name: 'Eren Yeager',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIwuCp7qc5mRQU5EfJHRzRdJjzWwKUM3uBHQ&s',
      stories: [
        {
          url: 'https://cdn.pixabay.com/photo/2016/12/04/21/58/rabbit-1882699_960_720.jpg',
          type: 'image',
        },
      ],
    },
    {
      id: 4,
      name: 'Eren Yeager',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIwuCp7qc5mRQU5EfJHRzRdJjzWwKUM3uBHQ&s',
      stories: [
        {
          url: 'https://cdn.pixabay.com/photo/2016/12/04/21/58/rabbit-1882699_960_720.jpg',
          type: 'image',
        },
      ],
    },
    {
      id: 5,
      name: 'Eren Yeager',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIwuCp7qc5mRQU5EfJHRzRdJjzWwKUM3uBHQ&s',
      stories: [
        {
          url: 'https://cdn.pixabay.com/photo/2016/12/04/21/58/rabbit-1882699_960_720.jpg',
          type: 'image',
        },
      ],
    },
    {
      id: 6,
      name: 'Eren Yeager',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIwuCp7qc5mRQU5EfJHRzRdJjzWwKUM3uBHQ&s',
      stories: [
        {
          url: 'https://cdn.pixabay.com/photo/2016/12/04/21/58/rabbit-1882699_960_720.jpg',
          type: 'image',
        },
      ],
    },
    {
      id: 7,
      name: 'Eren Yeager',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIwuCp7qc5mRQU5EfJHRzRdJjzWwKUM3uBHQ&s',
      stories: [
        {
          url: 'https://cdn.pixabay.com/photo/2016/12/04/21/58/rabbit-1882699_960_720.jpg',
          type: 'image',
        },
      ],
    },
    {
      id: 8,
      name: 'Eren Yeager',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIwuCp7qc5mRQU5EfJHRzRdJjzWwKUM3uBHQ&s',
      stories: [
        {
          url: 'https://cdn.pixabay.com/photo/2016/12/04/21/58/rabbit-1882699_960_720.jpg',
          type: 'image',
        },
      ],
    },
    {
      id: 9,
      name: 'Eren Yeager',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIwuCp7qc5mRQU5EfJHRzRdJjzWwKUM3uBHQ&s',
      stories: [
        {
          url: 'https://cdn.pixabay.com/photo/2016/12/04/21/58/rabbit-1882699_960_720.jpg',
          type: 'image',
        },
      ],
    },
  ];

  return (
    <div className="flex items-center gap-5">
      {/* Fixed Div */}
      <div className="fixed_div mb-4 md:mb-0">
        <div
          onClick={() => setIsOpen(true)}
          className="avatar placeholder cursor-pointer"
        >
          <div className="bg-neutral text-neutral-content w-[55px] md:w-[80px] rounded-full">
            <FaPlus className="font-bold text-xl" />
          </div>
        </div>
        <p className="text-sm hidden md:block font-semibold mt-2">
          Post A Story
        </p>
      </div>
      <ContentUploadModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        user={user}
        type="stories"
      />

      {/* Scrollable Map Part */}
      <div className="flex gap-3 md:gap-5 overflow-x-auto md:pt-1 pt-2 ps-1  md:ps-1 no-scrollbar">
        {users.map((user) => (
          <div key={user.id} className="flex-shrink-0">
            <div className="avatar">
              <div className="ring-blue-500 ring-offset-base-100 w-12 md:w-[70px] rounded-full ring ring-offset-2">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <p className="text-sm font-semibold mt-2">{user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;
