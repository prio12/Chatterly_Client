const CommentBox = () => {
  return (
    <div className="my-5 flex items-center rounded-lg gap-3 p-2 bg-gray-200">
      <div className="avatar">
        <div className="w-8 mt-[-36px] rounded-full">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpTREHn1wC6vG6w0AZVb_YtxnCyzi2Lx760VrpxrwG9ObSBSar72nFLWkWblx5t5jYJ7I&usqp=CAU" />
        </div>
      </div>
      <div>
        <h5 className="font-bold mb-1">Captain Levi</h5>
        <p className="text-sm">
          Next time, try not to sit around screaming while I clean up your mess,
          brat. Never forget who had to save your sorry ass again. Make it worth
          it, Eren!
        </p>
      </div>
    </div>
  );
};

export default CommentBox;
