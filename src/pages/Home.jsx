import LeftSideBar from '../components/common/LeftSideBar';
import RightSideBar from '../components/common/RightSideBar';

const Home = () => {
  return (
    <div className="flex justify-between bg-gray-100">
      <div className="   bg-white hidden md:block">
        <LeftSideBar />
      </div>
      <div className="w-full md:w-1/2  content ">
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Hello there</h1>
              <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
              <button className="btn btn-primary">Get Started</button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-32 hidden md:block ">
        <RightSideBar />
      </div>
    </div>
  );
};

export default Home;
