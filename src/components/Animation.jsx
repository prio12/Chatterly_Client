import { Player } from '@lottiefiles/react-lottie-player';

const Animation = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Player
        autoplay
        loop
        src="https://lottie.host/a52c96cb-3d77-46a7-a04b-dd616fc30660/h33SpwiAfW.json"
        style={{ height: '300px', width: '300px' }}
      />
    </div>
  );
};

export default Animation;
