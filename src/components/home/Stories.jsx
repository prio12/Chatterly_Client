import { FaPlus } from 'react-icons/fa6';

const Stories = () => {
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
  ];

  return (
    <div className="flex items-center gap-5">
      {/* Fixed Div */}
      <div className="fixed_div">
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content w-[75px] md:w-[80px] rounded-full">
            <FaPlus className="font-bold text-xl" />
          </div>
        </div>
        <p className="text-sm hidden md:block font-semibold mt-2">
          Post A Story
        </p>
      </div>

      {/* Scrollable Map Part */}
      <div className="flex gap-5 overflow-x-auto pt-1 ps-1 no-scrollbar ">
        {users.map((user) => (
          <div key={user.id} className="flex-shrink-0">
            <div className="avatar">
              <div className="ring-blue-500 ring-offset-base-100 w-16 md:w-[70px] rounded-full ring ring-offset-2">
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
