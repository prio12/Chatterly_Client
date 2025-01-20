import { RiMenu2Fill } from 'react-icons/ri';
import { useState } from 'react';

const RightSideBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebarWidth = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`${
        isExpanded ? 'w-64' : 'w-16'
      } fixed right-0 h-full bg-white shadow-lg transition-all duration-300 ease-in-out overflow-hidden`}
    >
      <div className="flex flex-col justify-start gap-5 p-3">
        {/* Menu Toggle */}
        <div className="flex items-center gap-2">
          <RiMenu2Fill
            onClick={toggleSidebarWidth}
            className="cursor-pointer text-2xl"
          />
          <span
            className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${
              isExpanded ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0'
            }`}
          >
            Contacts
          </span>
        </div>

        {/* Search Bar */}
        {/* <div
          className={`transition-all duration-300 ${
            isExpanded ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0'
          } overflow-hidden`}
        >
          
        </div> */}
        <form>
          <input
            type="text"
            placeholder="Search..."
            className={`${
              !isExpanded && 'invisible'
            } input input-bordered w-full max-w-xs`}
          />
        </form>

        {/* Contacts */}
        <div className="flex flex-col gap-3">
          {[
            {
              name: 'John Doe',
              image:
                'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
            },
            {
              name: 'Ladies Finger',
              image:
                'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
            },
            {
              name: 'Lady Gaga',
              image:
                'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp',
            },
          ].map((contact, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="avatar">
                <div className="w-8 rounded-full overflow-hidden">
                  <img src={contact.image} alt={contact.name} />
                </div>
              </div>
              <span
                className={`text-sm font-semibold hover:text-blue-500 transition-all duration-300 ${
                  isExpanded ? 'opacity-100 max-w-full' : 'opacity-0 max-w-0'
                }`}
              >
                {contact.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;
