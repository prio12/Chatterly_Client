import { FaHeart } from 'react-icons/fa6';
import CommentInputField from '../CommentInputField';
import CommentBox from '../CommentBox';
import { MdOutlineInsertComment } from 'react-icons/md';

const PostCard = () => {
  return (
    <div className="my-5 bg-white border p-5 ">
      <div className="flex items-center gap-5">
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIwuCp7qc5mRQU5EfJHRzRdJjzWwKUM3uBHQ&s" />
          </div>
        </div>
        <div>
          <h5 className="font-bold">Eren Yeager</h5>
          <span className="text-xs">21 January, 2024</span>
        </div>
      </div>
      <div>
        <p className="my-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, odio
          quia numquam vitae minima a voluptates laborum porro perferendis est
          in sunt facilis consectetur laudantium, veniam dignissimos debitis ex.
          Culpa?
        </p>
        <img
          src="https://static1.thegamerimages.com/wordpress/wp-content/uploads/wm/2024/08/10-10-best-attack-on-titan-episodes-ranked.jpg"
          alt="cover photo"
          className="rounded-md w-full"
        />
      </div>
      <div className="flex items-center my-5 gap-5">
        <div className="flex text-sm items-center gap-2">
          <FaHeart className="text-red-600" />
          <span>(123)</span>
        </div>
        <div className="flex text-sm items-center gap-2">
          <MdOutlineInsertComment />
          <span>(23)</span>
        </div>
      </div>
      <CommentInputField />
      <CommentBox />
    </div>
  );
};

export default PostCard;
