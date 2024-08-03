import Sidebar from "../../components/sideBar"
import Button from '@mui/material/Button';

import { useNavigate, useParams } from "react-router-dom";

import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StartIcon from '@mui/icons-material/Start';

import { useContext,useEffect } from "react";

import { SideBarContext } from "../../context/createContext";
import { responsiveContext } from "../../context/createContext";

const ChatRandom=()=>{
    

  const { open , setOpen }=useContext(SideBarContext)
  const {responsiveMd,setResponsiveMd}=useContext(responsiveContext)


    const navigate = useNavigate();

    const divertRoute=()=>{
        navigate('/connectingRandomPepole')
    }


    const onChagneChatToRanodmPepole=()=>{
      navigate('/chatToRandomPepole')
    }




    const handleResize = () => {
      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;
    
      // const screenWidth = window.innerWidth; // Use innerWidth for viewport width
      // const screenHeight = window.innerHeight; // Use innerHeight for viewport height
    
      console.log("Viewport Size Changed");
      console.log("Width:", screenWidth, "Height:", screenHeight);
    
      if (screenWidth <= 375 && screenHeight <= 667) {
        console.log("Small screen");
      
        setOpen(false);
        setResponsiveMd(false);
      } else if (screenWidth > 400 && screenHeight > 700) {
        console.log("Large screen");
     
        setOpen(true);
        setResponsiveMd(true);
      }
    };
    
    useEffect(() => {
      // Call handleResize once to set the initial state
      handleResize();
    
      // Add the event listener
      window.addEventListener("resize", handleResize);
    
      // Clean up the event listener
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);



    return (
//         <div >
//             <Sidebar  current='chatRandom'  />
            
//       <div style={{ marginLeft: open ? "387px" :"60px" }} className="position: fixed">
//       <div >
//   <div className="pl-10 mt-52" style={{  overflow: "hidden" }}>
//     <h1 className="text-6xl flex items-center font-sans ... decoration-inherit text-sky-500">Chat to Random People!</h1>
//     <br></br>
//     <h2 className=" pl-2 text-4xl font-sans ... decoration-inherit ">Enjoy Random Video Chat</h2>

//     <br></br>

//     <button class="bg-sky-500 ml-2 text-white text-3xl  w-44  h-12 px-4 rounded" onClick={divertRoute}>
//   start <PlayCircleFilledWhiteIcon  style={{ fontSize: 33 }}  />
// </button>

// <button className="bg-red-600 px-4  ml-5  rounded w-44 h-12 text-white text text-3xl" onClick={onChagneChatToRanodmPepole}>Chat 
// <PlayArrowIcon style={{ fontSize: 30 }} />
// </button>

//   </div>
  
// </div>
// <img style={{paddingLeft:"460px"  }} className="pl-112" src='https://chatrandom.com/assets/img/chat-app/connect-anywhere.png'></img>
  
//       </div>

            
//         </div>
<div>
  <Sidebar current="chatRandom" />

  <div
    className={`fixed   ${
      open ? "ml-[387px]" : "ml-[60px]"
    }`}
  >
    <div className="px-4 md:px-10 lg:px-20 mt-10 md:mt-52 overflow-hidden">
      <h1 className="text-3xl pl-5 md:text-6xl flex items-center font-sans text-sky-500">
        Chat to Random People!
      </h1>
      <br />
      <h2 className="text-2xl pl-5 md:text-4xl font-sans">
        Enjoy Random Video Chat
      </h2>
      <br />

      <button
        className="bg-sky-500 ml-3 text-white text-xl md:text-3xl w-full md:w-44 h-12 px-4 rounded"
        onClick={divertRoute}
      >
        Start
        <PlayCircleFilledWhiteIcon style={{ fontSize: 33 }} />
      </button>
 
      <button
        className={`bg-red-600  ${responsiveMd  ? "ml-5" :"ml-2"}  mt-3 md:mt-0 rounded w-full md:w-44 h-12 text-white text-xl md:text-3xl px-4`}
        onClick={onChagneChatToRanodmPepole}
      >
        Chat
        <PlayArrowIcon style={{ fontSize: 30 }} />
      </button>
    </div>

    <img
      className="w-full md:w-auto mt-6 md:mt-0 md:pl-52"
      src="https://chatrandom.com/assets/img/chat-app/connect-anywhere.png"
      alt="Connect Anywhere"
    />
  </div>
</div>

    )
}

export default ChatRandom