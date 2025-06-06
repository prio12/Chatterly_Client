/* eslint-disable react/prop-types */
import {
  FaHeart,
  FaHeartCircleMinus,
  FaHeartCirclePlus,
} from 'react-icons/fa6';
import CommentInputField from '../CommentInputField';
import CommentBox from '../CommentBox';
import { MdOutlineInsertComment } from 'react-icons/md';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { formatDistanceToNow } from 'date-fns';
import DefaultProfilePIcture from './DefaultProfilePIcture';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import UpdatePostModal from '../../utilities/UpdatePostModal';
import { useLocation } from 'react-router';
import { Link } from 'react-router';
import { useHandleLikeUnlikeMutation } from '../../redux/api/posts/postsApi';
import { useUserInfoByUidQuery } from '../../redux/api/users/usersApi';

const PostCard = ({ post }) => {
  const [handleLikeUnlike] = useHandleLikeUnlikeMutation();
  //post object destructuring
  const { content, img, author, createdAt, likes, _id, video, comments } = post;

  //hooks

  const { currentUser } = useSelector((state) => state.loggedInUser);
  const { data } = useUserInfoByUidQuery(currentUser);

  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const videoRef = useRef(null);

  //getting location to for a css change of the postcard
  const PostDetailsPage = pathname.startsWith('/posts/');

  // Converts createdAt timestamp into a human-readable relative time format.
  const timeAgo = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  // Play/Pause Video on Scroll
  useEffect(() => {
    if (!videoRef.current) return;

    const videoElement = videoRef.current;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !document.fullscreenElement) {
        videoElement.play();
      } else {
        videoElement.pause();
      }
    });

    observer.observe(videoElement);

    return () => observer.unobserve(videoElement);
  }, []);

  const authorUid = author?.uid;

  const handleLikeAndNotify = async ({ action }) => {
    const likePayload = {
      userId: data?.user?._id,
      postId: _id,
      action,
      authorUid,
    };

    // await useHandleLikeUnlikeMutation({ postId: id, data: likePayload });
    try {
      await handleLikeUnlike({ postId: _id, data: likePayload });
    } catch (error) {
      console.log(error);
    }
  };

  let likeIcon;

  if (author.uid === currentUser) {
    likeIcon = (
      <button className="btn btn-disabled">
        <FaHeart className="text-red-500 text-2xl" />
      </button>
    );
  } else if (likes.some((like) => like._id === data?.user?._id)) {
    likeIcon = (
      <button onClick={() => handleLikeAndNotify({ action: 'unLike' })}>
        {' '}
        <FaHeartCircleMinus className="text-red-500 cursor-pointer text-2xl " />
      </button>
    );
  } else {
    likeIcon = (
      <button onClick={() => handleLikeAndNotify({ action: 'like' })}>
        {' '}
        <FaHeartCirclePlus className="text-red-500 cursor-pointer text-2xl" />
      </button>
    );
  }

  return (
    <div
      className={`${PostDetailsPage ? 'my-0' : 'my-5'} bg-white border p-5 `}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          {author?.profilePicture ? (
            <Link to={`/profile/${author.uid}`}>
              <div className="avatar cursor-pointer">
                <div className=" w-10 rounded-full ">
                  <img src={author.profilePicture} />
                </div>
              </div>
            </Link>
          ) : (
            <Link to={`/profile/${author.uid}`}>
              <div className="avatar">
                <div className=" w-10 rounded-full">
                  <DefaultProfilePIcture />
                </div>
              </div>
            </Link>
          )}
          <div>
            <Link to={`/profile/${author.uid}`}>
              <h5 className="font-bold">{author?.name}</h5>
            </Link>
            <span className="text-xs">{timeAgo(createdAt)}</span>
          </div>
        </div>
        {author.uid === currentUser && pathname !== '/' && (
          <div onClick={() => setIsOpen(true)}>
            <HiOutlineDotsHorizontal className="cursor-pointer" />
          </div>
        )}
        <UpdatePostModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          img={img}
          video={video}
          content={content}
          id={_id}
        />
      </div>
      <div>
        <div>
          {content && (
            <p className="my-5">
              {content.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          )}
          {img && (
            <img
              src={img}
              alt="cover photo"
              className="rounded-md w-full my-5"
            />
          )}
          {video && (
            <video
              ref={videoRef}
              src={video}
              controls
              autoPlay
              loop
              className="rounded-md w-full max-h-[500px] object-cover"
            />
          )}
        </div>
      </div>
      <div className="flex items-center my-5 gap-5">
        <div className="flex text-sm items-center gap-2">
          {likeIcon}
          {likes?.length > 0 ? (
            <span className="font-semibold">({likes?.length})</span>
          ) : (
            <span className="font-semibold">(0)</span>
          )}
        </div>
        <div className="flex text-sm items-center gap-2">
          <MdOutlineInsertComment className="text-2xl" />
          {comments?.length > 0 ? (
            <span className="font-semibold">({comments?.length})</span>
          ) : (
            <span className="font-semibold">(0)</span>
          )}
        </div>
      </div>
      {likes?.length > 0 && (
        <p className=" my-5 flex items-center gap-2 text-sm">
          <FaHeart className="text-red-500  " />
          <span className="font-semibold">
            {' '}
            {likes.slice(-1)[0]?.name}
          </span>{' '}
          <span>{likes.length > 1 && ` and ${likes.length - 1} others`}</span>
        </p>
      )}

      <CommentInputField
        post={post}
        user={data?.user}
        userId={data?.user?._id}
      />
      {comments.length > 0 && (
        <div className="max-h-64 overflow-y-scroll no-scrollbar">
          {comments.length > 0 &&
            [...comments]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((comment) => (
                <CommentBox
                  comment={comment}
                  key={comment._id}
                  author={author}
                  postId={_id}
                />
              ))}
        </div>
      )}
    </div>
  );
};

export default PostCard;
