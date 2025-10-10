const TypingIndicator = () => {
  return (
    <div className="flex items-start gap-2">
      <div className="bg-gray-200 rounded-xl rounded-tl-sm px-3 py-1.5 flex items-center gap-1">
        <div
          className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"
          style={{ animationDelay: '0ms', animationDuration: '1.4s' }}
        ></div>

        <div
          className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"
          style={{ animationDelay: '200ms', animationDuration: '1.4s' }}
        ></div>

        <div
          className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"
          style={{ animationDelay: '400ms', animationDuration: '1.4s' }}
        ></div>
      </div>
    </div>
  );
};

export default TypingIndicator;
