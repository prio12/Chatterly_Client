/* eslint-disable react/prop-types */
const CommentBox = ({ comment }) => {
  const { avatar, content, author } = comment;
  return (
    <div className="my-5 ">
      <div className="flex items-center rounded-lg gap-3 p-2 bg-gray-200">
        <div className="avatar">
          <div className="w-8 mt-[-36px] rounded-full">
            <img src={avatar} />
          </div>
        </div>
        <div>
          <h5 className="font-bold mb-1">{author}</h5>
          <p className="text-sm">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
