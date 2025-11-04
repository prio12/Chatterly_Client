import logo from '../../assets/icon/letter-c (1).png';
const AuthLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex flex-col items-center gap-6">
        {/* Logo Container with Pulse Animation */}
        <div className="relative">
          {/* Outer Pulse Ring */}
          <div className="absolute inset-0 rounded-full bg-blue-400 opacity-75 animate-ping"></div>

          {/* Middle Pulse Ring */}
          <div className="absolute inset-0 rounded-full bg-blue-500 opacity-50 animate-pulse"></div>

          {/* Logo Image */}
          <div className="relative w-24 h-24 rounded-full bg-white shadow-2xl flex items-center justify-center overflow-hidden">
            <img
              src={logo}
              alt="Chatterly Logo"
              className="w-16 h-16 object-contain"
            />
          </div>
        </div>

        {/* App Name */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            Chatterly
          </h1>

          {/* Loading Text with Fade Animation */}
          <p className="text-sm text-gray-600 animate-pulse">
            Loading Chatterly...
          </p>
        </div>

        {/* Dots Loader (Optional - adds extra polish) */}
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></div>
          <div
            className="w-2 h-2 rounded-full bg-blue-500 animate-bounce delay-100"
            style={{ animationDelay: '0.1s' }}
          ></div>
          <div
            className="w-2 h-2 rounded-full bg-blue-500 animate-bounce delay-200"
            style={{ animationDelay: '0.2s' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AuthLoader;
