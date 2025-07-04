import Lottie from 'lottie-react';
import {useState ,useEffect} from 'react';
import locationPinAnimation from '../../locationPinAnimation.json';





const LocationPinAnimation = () => {
    const [playAnimation, setPlayAnimation] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
          setPlayAnimation(false);  
        }, 3000);
    
        return () => clearTimeout(timer);  
      }, []);

    return (
      <div style={{ width: '200px', height: '200px' }}>
        <Lottie animationData={locationPinAnimation} loop={false} autoplay={playAnimation} />
      </div>
    );
  };
  
  export default LocationPinAnimation;




