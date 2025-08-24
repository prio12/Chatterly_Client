const SearchBox = () => {
  return (
    <div className="w-full relative">
      <svg
        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="search"
        placeholder="Search For Friends"
        className="w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none resize-none"
      />
    </div>
  );
};

export default SearchBox;
