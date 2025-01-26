import { FaHeart } from 'react-icons/fa6';
import CommentInputField from '../CommentInputField';
import CommentBox from '../CommentBox';
import { MdOutlineInsertComment } from 'react-icons/md';

const PostCard = () => {
  //will be removed
  const comments = [
    {
      id: 1,
      author: 'Captain Levi',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpTREHn1wC6vG6w0AZVb_YtxnCyzi2Lx760VrpxrwG9ObSBSar72nFLWkWblx5t5jYJ7I&usqp=CAU',
      content:
        'Next time, try not to sit around screaming while I clean up your mess, brat. Never forget who had to save your sorry ass again. Make it worth it, Eren!',
    },
    {
      id: 2,
      author: 'Eren Yeager',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpTREHn1wC6vG6w0AZVb_YtxnCyzi2Lx760VrpxrwG9ObSBSar72nFLWkWblx5t5jYJ7I&usqp=CAU',
      content:
        "I'll make sure it's worth it next time, Captain. I promise I won't let you down again.",
    },
    {
      id: 2,
      author: 'Eren Yeager',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpTREHn1wC6vG6w0AZVb_YtxnCyzi2Lx760VrpxrwG9ObSBSar72nFLWkWblx5t5jYJ7I&usqp=CAU',
      content:
        "I'll make sure it's worth it next time, Captain. I promise I won't let you down again.",
    },
  ];

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
      {comments.length && (
        <div className="max-h-48 overflow-y-scroll no-scrollbar">
          {comments.length &&
            comments.map((comment) => (
              <CommentBox comment={comment} key={comment.id} />
            ))}
        </div>
      )}
    </div>
  );
};

export default PostCard;
