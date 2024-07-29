import Sidebar from "../../components/sideBar"
import Button from '@mui/material/Button';

import { useNavigate, useParams } from "react-router-dom";

import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StartIcon from '@mui/icons-material/Start';

const ChatRandom=()=>{
    
    const navigate = useNavigate();

    const divertRoute=()=>{
        navigate('/connectingRandomPepole')
    }


    const onChagneChatToRanodmPepole=()=>{
      navigate('/chatToRandomPepole')
    }

    return (
        <div >
            <Sidebar  current='chatRandom'  />
            
      <div style={{ marginLeft: "387px" }} className="position: fixed">
      <div >
  <div className="pl-10 mt-52" style={{  overflow: "hidden" }}>
    <h1 className="text-6xl flex items-center font-sans ... decoration-inherit text-sky-500">Chat to Random People!</h1>
    <br></br>
    <h2 className=" pl-2 text-4xl font-sans ... decoration-inherit ">Enjoy Random Video Chat</h2>

    <br></br>

    <button class="bg-sky-500 ml-2 text-white text-3xl  w-44  h-12 px-4 rounded" onClick={divertRoute}>
  start <PlayCircleFilledWhiteIcon  style={{ fontSize: 33 }}  />
</button>
<button className="bg-red-600 px-4  ml-5  rounded w-44 h-12 text-white text text-3xl" onClick={onChagneChatToRanodmPepole}>Chat 
<PlayArrowIcon style={{ fontSize: 30 }} />
</button>

  </div>
  
</div>
<img style={{paddingLeft:"460px"  }} className="pl-112" src='https://chatrandom.com/assets/img/chat-app/connect-anywhere.png'></img>
  
      </div>

            
        </div>
    )
}

export default ChatRandom