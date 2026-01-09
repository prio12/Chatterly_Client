import { useEffect, useState } from 'react';

const useBreakpoint = () => {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  //checking with useEffect
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    const handleResize = () => {
      setIsSmallScreen(mediaQuery.matches);
    };

    //run the function
    handleResize();

    mediaQuery.addEventListener('change', handleResize);

    //cleanUp function
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  //return the value
  return isSmallScreen;
};
export default useBreakpoint;
