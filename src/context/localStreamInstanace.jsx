import { createContext ,useState} from 'react'

export const localInstance = createContext('');

export const LocalStreamProvider = ({ children }) => {


    const [localStream, setLocalStream] = useState(null);
    const [localVideo,setLocalVideo]=useState(null)
    const [startButton,setStartButton]=useState(null)
    const [hangupButton,setHangupButton]=useState(null)
    const [muteAudButton,setmuteAudButton]=useState(null)


    return (
      <localInstance.Provider value={{ localStream, setLocalStream,localVideo,setLocalVideo,startButton,setStartButton,hangupButton,setHangupButton,muteAudButton,setmuteAudButton }}>
        {children}
      </localInstance.Provider>
    );
  };