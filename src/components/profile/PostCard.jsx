/* eslint-disable react/prop-types */
import { FaHeart } from 'react-icons/fa6';
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
import { io } from 'socket.io-client';

const PostCard = ({ post, id }) => {
  //post object destructuring
  const { content, img, author, createdAt, likes, _id, video } = post;

  //hooks
  const { currentUser } = useSelector((state) => state.loggedInUser);
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const videoRef = useRef(null); // Reference for video
  const [isLiked, setIsLiked] = useState(false);

  // Converts createdAt timestamp into a human-readable relative time format.
  const timeAgo = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  useEffect(() => {
    if (likes.includes(id)) {
      setIsLiked(true);
    }
  }, [id, likes]);

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

  //socket connection
  const socket = io('http://localhost:5000', {
    path: '/socket.io/', // Ensures correct connection path
    transports: ['websocket'], // Use WebSockets for real-time communication
  });

  useEffect(() => {
    //registering user in server for socket.io using user specific mongodb _id
    socket.emit('register', id);
  }, [id, socket]);

  const handleLikeAndNotify = () => {
    socket.emit('liked', { userId: id, postId: _id }, (response) => {
      console.log(response);
    });
  };

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

  let likeIcon;

  if (author._id === id) {
    likeIcon = <FaHeart title="Own post!" className="cursor-not-allowed " />;
  } else if (isLiked) {
    likeIcon = (
      <FaHeart
        onClick={() => handleLikeAndNotify()}
        className="text-red-600 cursor-pointer"
      />
    );
  } else if (!isLiked) {
    likeIcon = (
      <FaHeart
        onClick={() => handleLikeAndNotify()}
        className=" cursor-pointer"
      />
    );
  }

  return (
    <div className="my-8 bg-white border p-5 ">
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
          {likes?.length > 0 ? <span>{likes?.length}</span> : <span>(0)</span>}
        </div>
        <div className="flex text-sm items-center gap-2">
          <MdOutlineInsertComment />
          {comments?.length > 0 ? (
            <span>({comments.length})</span>
          ) : (
            <span>(0)</span>
          )}
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
