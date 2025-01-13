import { Link } from 'react-router';
import Animation from '../../components/Animation';
import { FcGoogle } from 'react-icons/fc';

const SignIn = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Div */}
      <div className="w-full md:w-1/2 flex flex-col md:pt-12 pt-5 items-center">
        <h2 className="text-2xl font-semibold">Get Started Now</h2>
        <p>Enter your credential to access your account</p>
        <div className="my-5">
          <button className="text-center flex items-center gap-2 p-3 shadow-md">
            <span>
              <FcGoogle />
            </span>{' '}
            Sign in with Google
          </button>
        </div>
        <div className="divider mx-5 text-xs">or</div>
        <div className="shadow-slate-600 p-5 shadow-sm">
          <form action="">
            <div>
              <label htmlFor="Email" className="text-sm ">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Type here"
                className="input input-bordered  w-full max-w-xs my-2"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm ">
                Password
              </label>
              <input
                type="password"
                placeholder="Type here"
                className="input input-bordered  w-full max-w-xs my-2"
                required
              />
            </div>
            <input
              type="submit"
              className="btn w-full bg-slate-600 text-white hover:bg-slate-500 my-5"
              value="Submit"
            />
            <p className="text-xs my-3">
              New here?{' '}
              <Link className="text-blue-700 font-semibold" to="/signUp">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right Div (Animation) */}
      <div className="hidden md:flex w-1/2 bg-slate-600 justify-center items-center">
        <Animation />
      </div>
    </div>
  );
};

export default SignIn;
