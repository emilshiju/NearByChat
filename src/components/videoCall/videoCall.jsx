// import React from 'react';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhone, FaTimes, } from 'react-icons/fa';

// import "./videoCall.css";

// import { SocketContext, socket } from "../../context/socket";

// const configuration = {
//     iceServers: [
//       {
//         urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
//       },
//     ],
//     iceCandidatePoolSize: 10,
//   };
  
//   let pc;
//   let localStream;
//   let startButton;
//   let hangupButton;
//   let muteAudButton;
//   let remoteVideo;
//   let localVideo;
  
  
//   socket.on("message", (e) => {
//     if (!localStream) {
//       console.log("not ready yet");
//       return;
//     }
//     switch (e.type) {
//       case "offer":
//         handleOffer(e);
//         break;
//       case "answer":
//         handleAnswer(e);
//         break;
//       case "candidate":
//         handleCandidate(e);
//         break;
//       case "ready":
//         // A second tab joined. This tab will initiate a call unless in a call already.
//         if (pc) {
//           alert("already in call ignoreing")
//           console.log("already in call, ignoring");
//           return;
//         }
//         makeCall();
//         break;
//       case "bye":
//         if (pc) {
//           hangup();
//         }
//         break;
//       default:
//         console.log("unhandled", e);
//         break;
//     }
//   });
  
  
//   async function makeCall() {
//     try {
//       pc = new RTCPeerConnection(configuration);
//       pc.onicecandidate = (e) => {
//         const message = {
//           type: "candidate",
//           candidate: null,
//         };
//         if (e.candidate) {
//           message.candidate = e.candidate.candidate;
//           message.sdpMid = e.candidate.sdpMid;
//           message.sdpMLineIndex = e.candidate.sdpMLineIndex;
//         }
//         socket.emit("message", message);
//       };
//       pc.ontrack = (e) => (remoteVideo.current.srcObject = e.streams[0]);
//       localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
//       const offer = await pc.createOffer();
//       socket.emit("message", { type: "offer", sdp: offer.sdp });
//       await pc.setLocalDescription(offer);
//     } catch (e) {
//       console.log(e);
//     }
//   }
  
  
  
//   async function handleOffer(offer) {
//     if (pc) {
//       console.error("existing peerconnection");
//       return;
//     }
//     try {
//       pc = new RTCPeerConnection(configuration);
//       pc.onicecandidate = (e) => {
//         const message = {
//           type: "candidate",
//           candidate: null,
//         };
//         if (e.candidate) {
//           message.candidate = e.candidate.candidate;
//           message.sdpMid = e.candidate.sdpMid;
//           message.sdpMLineIndex = e.candidate.sdpMLineIndex;
//         }
//         socket.emit("message", message);
//       };
//       pc.ontrack = (e) => (remoteVideo.current.srcObject = e.streams[0]);
//       localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
//       await pc.setRemoteDescription(offer);
  
//       const answer = await pc.createAnswer();
//       socket.emit("message", { type: "answer", sdp: answer.sdp });
//       await pc.setLocalDescription(answer);
//     } catch (e) {
//       console.log(e);
//     }
//   }
  
  
//   async function handleAnswer(answer) {
//     if (!pc) {
//       console.error("no peerconnection");
//       return;
//     }
//     try {
//       await pc.setRemoteDescription(answer);
//     } catch (e) {
//       console.log(e);
//     }
//   }
  
//   async function handleCandidate(candidate) {
//     try {
//       if (!pc) {
//         console.error("no peerconnection");
//         return;
//       }
//       if (!candidate) {
//         await pc.addIceCandidate(null);
//       } else {
//         await pc.addIceCandidate(candidate);
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   }
//   async function hangup() {
//     if (pc) {
//       pc.close();
//       pc = null;
//     }
//     localStream.getTracks().forEach((track) => track.stop());
//     localStream = null;
//     startButton.current.disabled = false;
//     hangupButton.current.disabled = true;
//     muteAudButton.current.disabled = true;
//   }



// const VideoCall = () => {

//     if (pc) {
//         pc.close();
//         pc = null;
//       }
//       localStream.getTracks().forEach((track) => track.stop());
//       localStream = null;
//       startButton.current.disabled = false;
//       hangupButton.current.disabled = true;
//       muteAudButton.current.disabled = true;
//     }
    
//     function App() {
//       startButton = useRef(null);
//       hangupButton = useRef(null);
//       muteAudButton = useRef(null);
//       localVideo = useRef(null);
//       remoteVideo = useRef(null);
//       useEffect(() => {
//         hangupButton.current.disabled = true;
//         muteAudButton.current.disabled = true;
//       }, []);
//       const [audiostate, setAudio] = useState(false);
    
//       const startB = async () => {
//         try {
//           localStream = await navigator.mediaDevices.getUserMedia({
//             video: true,
//             audio: { echoCancellation: true },
//           });
//           localVideo.current.srcObject = localStream;
//         } catch (err) {
//           console.log(err);
//         }
    
//         startButton.current.disabled = true;
//         hangupButton.current.disabled = false;
//         muteAudButton.current.disabled = false;
    
//         socket.emit("message", { type: "ready" });
//       };
    
//       const hangB = async () => {
//         hangup();
//         socket.emit("message", { type: "bye" });
//       };
    
//       function muteAudio() {
//         if (audiostate) {
//           localVideo.current.muted = true;
//           setAudio(false);
//         } else {
//           localVideo.current.muted = false;
//           setAudio(true);
//         }
//       }
//   return (
//     <>
//       <div className="flex justify-center h-screen" style={{ marginTop: "100px" }}>
//         <div className="flex flex-col md:flex-row">
//           <div className="w-full md:w-1/2 p-4">
//             {/* Box 1 (Participant video feed) */}
//             <div className="bg-gray-200 h-[400px] w-[500px] rounded-lg shadow-md">
//               {/* Image */}
//               <video
//             ref={localVideo}
//             className="video-item"
//             autoPlay
//             playsInline
//             src=" "
//           ></video>

//               {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s" alt="Participant Video" className="w-full h-full rounded-lg object-cover" /> */}
//             </div>
//           </div>
//           <div className="w-full md:w-1/2 p-4">
//             {/* Box 2 (Your video feed) */}
//             <div className="bg-gray-200 h-[400px] w-[500px] rounded-lg shadow-md">
//               {/* Image */}
//               <video
//             ref={remoteVideo}
//             className="video-item"
//             autoPlay
//             playsInline
//             src=" "
//           ></video>
              
//               <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s" alt="Your Video" className="w-full h-full rounded-lg object-cover" />
//             </div>
//           </div>
//         </div>
//         <div className=" absolute flex justify-center items-center mt-4 mb-4" style={{paddingTop:"480px"}}>
//         <div className="flex space-x-4">
//           <button className="p-2 rounded-full bg-gray-300 hover:bg-gray-400" ref={muteAudButton}
//             onClick={muteAudio}>
//                  {audiostate ? <FaMicrophoneSlash className="text-gray-600" /> : <FaMicrophoneSlash className="text-gray-600" />}
            
//           </button>
//           <button className="p-2 rounded-full bg-gray-300 hover:bg-gray-400"  ref={startButton}
//             onClick={startB}>
//             <FaVideoSlash className="text-gray-600" />
//           </button>
//           <button className="p-2 rounded-full bg-gray-300 hover:bg-gray-400">
//             <FaPhone className="text-gray-600" />
//           </button>
//           <button className="p-2 rounded-full bg-gray-300 hover:bg-gray-400"      ref={hangupButton}
//             onClick={hangB} >
//             <FaTimes className="text-gray-600" />
//           </button>
//         </div>
//       </div>
//       </div>
//       {/* Footer bar for controls */}
   
//     </>
//   );
// }

// export default VideoCall;



import { useRef, useEffect, useState } from "react";
import { FiVideo, FiVideoOff, FiMic, FiMicOff } from "react-icons/fi";
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useSelector } from "react-redux";


import { SocketContext, socket } from "../../context/socket";

const configuration = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};
// const socket = io("http://localhost:3000", { transports: ["websocket"] });




function VideoCall({receiver,closeVideoCall}) {

  const userInfo = receiver

  let pc=useRef(null)
  let localStream=useRef(null)
  let startButton = useRef(null);
  let hangupButton = useRef(null);
  let muteAudButton = useRef(null);
  let localVideo = useRef(null);
  let remoteVideo = useRef(null);
  let muteVideoButton=useRef(null);
  let muteVideo=useRef(null)


socket.on("message", (e) => {
  if (!localStream.current) {
    console.log("not ready yet");
    return;
  }
  switch (e.type) {
    case "offer":
      handleOffer(e);
      break;
    case "answer":
      handleAnswer(e);
      break;
    case "candidate":
      handleCandidate(e);
      break;
    case "ready":
      // A second tab joined. This tab will initiate a call unless in a call already.
      if (pc.current) {
        alert("already in call ignoreing")
        console.log("already in call, ignoring");
        return;
      }
      makeCall();
      break;
    case "bye":
      if (pc.current) {
        hangup();
      }
      break;
    default:
      console.log("unhandled", e);
      break;
  }
});


socket.on('ignoredStatus',(res)=>{

  hangup()
  Swal.fire({
    title: 'cuted the call',
  
  })

})




async function makeCall() {
    
  try {
    pc.current = new RTCPeerConnection(configuration);
    pc.current.onicecandidate = (e) => {
      const message = {
        type: "candidate",
        candidate: null,
        id:userInfo,
      };
      if (e.candidate) {
        message.candidate = e.candidate.candidate;
        message.sdpMid = e.candidate.sdpMid;
        message.sdpMLineIndex = e.candidate.sdpMLineIndex;
      }
      socket.emit("message", message);
    };
    pc.current.ontrack = (e) => (remoteVideo.current.srcObject = e.streams[0]);
    localStream.current.getTracks().forEach((track) => pc.current.addTrack(track, localStream.current));
    const offer = await pc.current.createOffer();
    socket.emit("message", {id:userInfo, type: "offer", sdp: offer.sdp });
    await pc.current.setLocalDescription(offer);
  } catch (e) {
    console.log(e);
  }
}



async function handleOffer(offer) {
  if (pc.current) {
    console.error("existing peerconnection");
    return;
  }
  try {
    pc.current = new RTCPeerConnection(configuration);
    pc.current.onicecandidate = (e) => {
      const message = {
        type: "candidate",
        id:userInfo,
        candidate: null,
      };
      if (e.candidate) {
        message.candidate = e.candidate.candidate;
        message.sdpMid = e.candidate.sdpMid;
        message.sdpMLineIndex = e.candidate.sdpMLineIndex;
      }
      socket.emit("message", message);
    };
    pc.current.ontrack = (e) => (remoteVideo.current.srcObject = e.streams[0]);
    localStream.current.getTracks().forEach((track) => pc.current.addTrack(track, localStream.current));
    await pc.current.setRemoteDescription(offer);

    const answer = await pc.current.createAnswer();
    socket.emit("message", {id:userInfo, type: "answer", sdp: answer.sdp });
    await pc.current.setLocalDescription(answer);
  } catch (e) {
    console.log(e);
  }
}


async function handleAnswer(answer) {
  if (!pc.current) {
    console.error("no peerconnection");
    return;
  }
  try {
    await pc.current.setRemoteDescription(answer);
  } catch (e) {
    console.log(e);
  }
}

async function handleCandidate(candidate) {
  try {
    if (!pc.current) {
      console.error("no peerconnection");
      return;
    }
    if (!candidate) {
      await pc.current.addIceCandidate(null);
    } else {
      await pc.current.addIceCandidate(candidate);
    }

    
  } catch (e) {
    console.log(e);
  }
}
async function hangup() {
  if (pc.current) {
    pc.current.close();
    pc.current = null;
  }
  localStream.current.getTracks().forEach((track) => track.stop());
  localStream.current = null;
  startButton.current.disabled = false;
  hangupButton.current.disabled = true;
  muteAudButton.current.disabled = true;

  closeVideoCall()
  


}




 
  
  useEffect(() => {
    hangupButton.current.disabled = true;
    muteAudButton.current.disabled = true;
    muteVideo.current.disabled=true
  }, []);

  const [audiostate, setAudio] = useState(true);
  const [videoState,setVideoState]=useState(true)

  const startB = async () => {
    try {
      localStream.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: { echoCancellation: true },
      });
      localVideo.current.srcObject = localStream.current;
    } catch (err) {
      console.log(err);
    }

    startButton.current.disabled = true;
    hangupButton.current.disabled = false;
    muteAudButton.current.disabled = false;
    muteVideo.current.disabled=false

    socket.emit("message", {id:userInfo, type: "ready" });
  };

  const hangB = async () => {

    Swal.fire({
      title: 'Are you sure to  correct!',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((res)=>{

      if(res.isConfirmed){
        hangup();
      
        socket.emit("message", { id:userInfo,type: "bye" });
      }

    })
   

   
  };


  function muteAudio() {
    if (localStream.current) {
        localStream.current.getAudioTracks().forEach(track => {
         
            track.enabled = !track.enabled; // Toggle mute/unmute
        });
        setAudio(!audiostate); // Update state for UI toggle
    }
}

     function pauseVideo(){

      if (localStream.current) {
        localStream.current.getVideoTracks().forEach(track => {
          track.enabled = !track.enabled; // Toggle video track
        });
        setVideoState(!videoState); // Update state for UI toggle
      }

       }







  return (
    <>
    <div className='bg-white w-screen h-screen position: fixed ' style={{ position: 'absolute', zIndex: '99' ,backgroundColor:"white"}}>
      <div className="flex justify-center h-screen bg-white position: fixed  " style={{ marginTop: "100px" ,paddingLeft:"250px"}}>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-4">
            {/* Box 1 (Participant video feed) */}
            <div className="bg-gray-200 h-[400px] w-[500px] rounded-lg shadow-md">
              {/* Image */}
              <video
            ref={localVideo}
            className="video-item"
            autoPlay
            playsInline
            src=" "
          ></video>

              {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s" alt="Participant Video" className="w-full h-full rounded-lg object-cover" /> */}
            </div>
          </div>
          <div className="w-full md:w-1/2 p-4">
            {/* Box 2 (Your video feed) */}
            <div className="bg-gray-200 h-[400px] w-[500px] rounded-lg shadow-md">
              {/* Image */}
              <video
            ref={remoteVideo}
            className="video-item"
            autoPlay
            playsInline
            src=" "
          ></video>
              
              {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHZqj-XReJ2R76nji51cZl4ETk6-eHRmZBRw&s" alt="Your Video" className="w-full h-full rounded-lg object-cover" /> */}
            </div>
          </div>
        </div>
        <div className=" absolute flex justify-center items-center mt-4 mb-4" style={{paddingTop:"480px"}}>
        <div className="flex space-x-4">
          <button className="p-2 rounded-full bg-gray-300 hover:bg-gray-400" ref={muteAudButton}
            onClick={muteAudio}>
                {audiostate ? <FiMic /> : <FiMicOff />}
            
          </button>
          <button className="p-2 rounded-full bg-gray-300 hover:bg-gray-400"  ref={startButton}
            onClick={startB}>
            <FaPhone  className="text-gray-600" />
          </button>
          <button className="p-2 rounded-full bg-gray-300 hover:bg-gray-400" ref={muteVideo}
          onClick={pauseVideo}>
            {videoState?  <FaVideo className="text-gray-600" />:<FaVideoSlash className="text-gray-600" />}
           
          </button>
          <button className="p-2 rounded-full bg-gray-300 hover:bg-gray-400"      ref={hangupButton}
            onClick={hangB} >
            <FaTimes className="text-gray-600" />
          </button>
        </div>
      </div>
      </div>
      {/* Footer bar for controls */}
      </div>
    </>

  )
}

export default VideoCall