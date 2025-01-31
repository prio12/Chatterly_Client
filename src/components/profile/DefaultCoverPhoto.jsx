const DefaultCoverPhoto = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1200 600"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="1200" height="600" fill="#e0e0e0" />
      <path
        d="M0 400 C300 500, 900 300, 1200 400 L1200 600 L0 600 Z"
        fill="#cccccc"
      />
      <path
        d="M0 450 C300 550, 900 350, 1200 450 L1200 600 L0 600 Z"
        fill="#b0b0b0"
      />
      <text
        x="50%"
        y="50%"
        fontSize="48"
        fontFamily="Arial, sans-serif"
        fill="#777"
        textAnchor="middle"
      >
        Your Cover Photo
      </text>
    </svg>
  );
};

export default DefaultCoverPhoto;
