import { BsThreeDots } from 'react-icons/bs';
import { CiHeart, CiLocationOn } from 'react-icons/ci';
import { FaRegCalendar } from 'react-icons/fa6';
import { LiaBirthdayCakeSolid } from 'react-icons/lia';
import { MdOutlineEmail } from 'react-icons/md';
import { PiSuitcaseSimple } from 'react-icons/pi';

const About = () => {
  return (
    <div className="p-5 border bg-white my-5">
      <h3 className="text-xl font-bold">Profile Info</h3>
      <div className="p-5 border my-5">
        <div className="font-semibold mb-3 flex items-center justify-between">
          <h5>Overview</h5>
          <BsThreeDots className="cursor-pointer" />
        </div>
        <p>
          I’m someone who’ll stop at nothing to achieve freedom for my people.
          My mission: to break the chains that bind us and explore the world
          beyond the walls. No matter the cost, I fight for what I believe in,
          even if it means going against my friends or making impossible
          choices. The Titans? They will fall. Oppression? It ends with me.
          Freedom is the ultimate goal, and I’ll do whatever it takes to achieve
          it—no matter the consequences.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-5 items-start">
        <div className="flex  flex-col items-center border w-full p-3 text-sm rounded-lg">
          <LiaBirthdayCakeSolid className="text-xl mb-1" />
          <span className="font-semibold">October 20, 1990</span>
        </div>
        <div className="flex flex-col items-center border w-full p-3 text-sm rounded-lg">
          <CiHeart className="text-xl mb-1" />
          <span className="font-semibold">Single</span>
        </div>
        <div className="flex flex-col items-center border w-full p-3 text-sm rounded-lg">
          <PiSuitcaseSimple className="text-xl mb-1" />
          <span className="font-semibold">Titan Hunter</span>
        </div>
        <div className="flex flex-col items-center border w-full p-3 text-sm rounded-lg">
          <CiLocationOn className="text-xl mb-1" />
          <span className="font-semibold">Shiganshina</span>
        </div>
        <div className="flex flex-col items-center border w-full p-3 text-sm rounded-lg">
          <FaRegCalendar className="text-xl mb-1" />
          <span className="font-semibold">Since : Nov 26, 2019</span>
        </div>
        <div className="flex flex-col items-center border w-full p-3 text-sm rounded-lg">
          <MdOutlineEmail className="text-xl mb-1" />
          <span className="font-semibold">eren@gmail.com</span>
        </div>
        {/* <div className="flex flex-col items-center cursor-pointer hover:text-blue-600 border w-full p-3 text-sm rounded-lg">
          <MdOutlineWorkOutline className="text-xl mb-1" />
          <span>Add a workplace</span>
        </div> */}
        {/* <div className="flex flex-col items-center cursor-pointer hover:text-blue-600 border w-full p-3 text-sm rounded-lg">
          <IoBookOutline className="text-xl mb-1" />
          <span>Add Education</span>
        </div> */}
      </div>
    </div>
  );
};

export default About;
