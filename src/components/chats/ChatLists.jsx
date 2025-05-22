const ChatLists = () => {
  return (
    <div>
      <div className="flex items-center gap-5 my-5 rounded-md  p-2">
        <div className="avatar ">
          <div className="w-14 rounded-full">
            <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Eren Yeager</h3>
          <p className="text-sm">Hey, U bloody mf!</p>
        </div>
      </div>
      {/* will be removed */}
      <div className="flex items-center gap-5 my-5">
        <div className="avatar ">
          <div className="w-14 rounded-full">
            <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold">Eren Yeager</h3>
          <p className="text-sm">
            Hey, U bloody mf! I am going to kill u bitch!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatLists;
