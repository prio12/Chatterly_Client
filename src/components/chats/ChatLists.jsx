/* eslint-disable react/prop-types */
const ChatLists = ({ chatList }) => {
  return (
    <div>
      <div className="flex items-center gap-5 my-3 rounded-md  p-5 bg-slate-50">
        <div className="avatar ">
          <div className="w-12 rounded-full">
            <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-bold">Eren Yeager</h3>
          <p className="text-xs">Hey, U bloody mf!</p>
        </div>
      </div>
    </div>
  );
};

export default ChatLists;
