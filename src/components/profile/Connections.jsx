const Connections = () => {
  return (
    <div className="p-5 bg-white border my-5">
      <h4 className="font-bold text-xl mb-8">Connections</h4>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-5">
          <div className="avatar cursor-pointer">
            <div className="w-16 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <div className="cursor-pointer">
            <h5 className="font-bold">Captain Levi</h5>
            <p className="text-sm ">Team Lead of Levi Team</p>
          </div>
        </div>
        <div className="hidden md:block">
          <button className="btn btn-sm  rounded bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white">
            Message
          </button>
          <button className="btn ms-2 btn-sm rounded bg-red-100 text-red-500 hover:bg-red-500 hover:text-white">
            Delete
          </button>
        </div>
      </div>
      <div className=" md:hidden my-5 flex items-center gap-5">
        <button className="btn btn-md  rounded bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white">
          Message
        </button>
        <button className="btn ms-2 btn-md rounded bg-red-100 text-red-500 hover:bg-red-500 hover:text-white">
          UnFollow
        </button>
      </div>
    </div>
  );
};

export default Connections;
