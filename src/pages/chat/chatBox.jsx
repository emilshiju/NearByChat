


import React,{useState,useEffect,useCallback,useContext} from "react";
import { useSelector } from "react-redux";

import { SocketContext } from "../../context/socket";
import { useParams } from 'react-router-dom';
import api from "../../route/interceptors";
import getProfile from "../../service/getProfile";


const messages = [
    {
      imgSrc: "https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg",
      title: "New Movie! Expendables 4",
      time: "12:45 pm",
      message: "Get Andrés on this movie ASAP!",
      bgColor: "bg-grey-light",
    },
    {
      imgSrc: "https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg",
      title: "Arnold Schwarzenegger",
      time: "12:45 pm",
      message: "I'll be back",
      bgColor: "bg-white",
    },
    {
      imgSrc: "https://www.famousbirthdays.com/headshots/russell-crowe-6.jpg",
      title: "Russell Crowe",
      time: "12:45 pm",
      message: "Hold the line!",
      bgColor: "bg-white",
    },
    {
      imgSrc: "https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg",
      title: "Tom Cruise",
      time: "12:45 pm",
      message: "Show me the money!",
      bgColor: "bg-white",
    },
    {
      imgSrc: "https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg",
      title: "Harrison Ford",
      time: "12:45 pm",
      message: "Tell Java I have the money",
      bgColor: "bg-white",
    },
    {
        imgSrc: "https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg",
        title: "Harrison Ford",
        time: "12:45 pm",
        message: "Tell Java I have the money",
        bgColor: "bg-white",
      },
      {
        imgSrc: "https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg",
        title: "Harrison Ford",
        time: "12:45 pm",
        message: "Tell Java I have the money",
        bgColor: "bg-white",
      },
      {
        imgSrc: "https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg",
        title: "Harrison Ford",
        time: "12:45 pm",
        message: "Tell Java I have the money",
        bgColor: "bg-white",
      },
      {
        imgSrc: "https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg",
        title: "Harrison Ford",
        time: "12:45 pm",
        message: "Tell Java I have the money",
        bgColor: "bg-white",
      },
      {
        imgSrc: "https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg",
        title: "Harrison Ford",
        time: "12:45 pm",
        message: "Tell Java I have the money",
        bgColor: "bg-white",
      },
      {
        imgSrc: "https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg",
        title: "Harrison Ford",
        time: "12:45 pm",
        message: "Tell Java I have the money",
        bgColor: "bg-white",
      },
      {
        imgSrc: "https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg",
        title: "Harrison Ford",
        time: "12:45 pm",
        message: "Tell Java I have the money",
        bgColor: "bg-white",
      },
      {
        imgSrc: "https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg",
        title: "Harrison Ford",
        time: "12:45 pm",
        message: "Tell Java I have the money",
        bgColor: "bg-white",
      },
      {
        imgSrc: "https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg",
        title: "Harrison Ford",
        time: "12:45 pm",
        message: "Tell Java I have the money",
        bgColor: "bg-white",
      },
      {
        imgSrc: "https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg",
        title: "Harrison Ford",
        time: "12:45 pm",
        message: "Tell Java I have the money",
        bgColor: "bg-white",
      },
      {
        imgSrc: "https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg",
        title: "Harrison Ford",
        time: "12:45 pm",
        message: "Tell Java I have the money",
        bgColor: "bg-white",
      },
      {
        imgSrc: "https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg",
        title: "Harrison Ford",
        time: "12:45 pm",
        message: "Tell Java I have the money",
        bgColor: "bg-white",
      },
  ];


const ChatBox=()=>{

  const userInfo = useSelector((state) => state.auth.userInfo);
  const socket=useContext(SocketContext)
const {id,myid}=useParams()


  const [nickName, setNickName] = useState();
  const [profileId,setProfileId]=useState()

  const [image, setImage] = useState(false);
  const [oppositeOne,setOppositeOne]=useState()

  const [chatRoomId,setChatRoomId]=useState(false)


  useEffect(() => {
    const fetchProfile = async () => {
      try {  
   
        const res = await getProfile(userInfo._id);
      
        if (res.status) {
          setNickName(res.response.nickName);
          setProfileId(res.response._id)

          

          setImage(res.response.imageUrl)
        
        }

      } catch (error) {
        console.error("Failed to fetch profile", error);
      }
    };

    fetchProfile();
    return () => {};
  }, []);

 



  const updateSingleChat=()=>{


    api.post('/getSingleChat',{id,myid})
    .then((resposne)=>{
      console.log(resposne.data.response)
     
      setOppositeOne(resposne.data.response)
    })
  }
  
  useEffect(()=>{
    updateSingleChat()

  },[])

  const [textMessage,setTextMessage]=useState()
  const [sendButton,setSendButton]=useState(false)
 

  const textMessageSend=(e)=>{
    let value=e.target.value
    
    setTextMessage(value)
    
    if(value.trim().length==0){
      setSendButton(false)
    }else{
      setSendButton(true)
    }

  }

  const sendMessage=()=>{
    if(!chatRoomId){

      api.post('/createChatRoom',{id,myid})
      .then((res)=>{
        setChatRoomId(res.data.response._id)
        const id=res.data.response._id
        socket.emit('sendMessage',{chatRoomId,profileId,messages})
      })
    }else{
      socket.emit('sendMessage',{chatRoomId,profileId,messages})
    }
  }


  return (
    <div  >

<div className="container mx-auto h-screen position: fixed  ml-1" >
      
<div className="py-0 h-screen">
      

<div className="flex border border-gray-300 rounded shadow-lg h-screen w-full ">
     

<div className="w-1/3 border flex flex-col ">

{/* header */}

<div className="py-2 px-3 bg-gray-100 flex flex-row justify-between items-center">
            <div>
            
                <img className="w-10 h-10 rounded-full" src={image} alt="User Avatar" />
            </div>
            <div className="flex">
                {/* <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="#727A7E" d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.229 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.724zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882l-.015.004a7.259 7.259 0 0 0-5.223 8.558.978.978 0 0 1-.955 1.185z"></path>
                    </svg>
                </div> */}
                {/* <div className="ml-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path opacity=".55" fill="#263238" d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"></path>
                    </svg>
                </div> */}
                <div className="ml-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="#263238" fillOpacity=".6" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path>
                    </svg>
                </div>
            </div>
        </div>
     
     {/* search */}
     {/* <div className="py-2 px-2 bg-gray-100">
            <input
                type="text"
                className="w-full px-2 py-2 text-sm"
                placeholder="Search or start new chat"
            />
        </div> */}
   
<form className="py-2 px-2 bg-gray-100">   
    <label for="default-search" class="mb-2 text-sm font-medium sr-only">Search </label>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm  border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500   " placeholder="Search Mockups, Logos..." required />
<button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2  ">Search</button>
    </div>
</form>




        <div className="bg-grey-lighter flex-1 overflow-auto">
      {messages.map((msg, index) => (
        <div key={index} className={`${msg.bgColor} px-3 flex items-center hover:bg-grey-lighter cursor-pointer`}>
          <div>
            <img className="h-12 w-12 rounded-full" src={msg.imgSrc} alt={msg.title} />
          </div>
          <div className="ml-4 flex-1 border-b border-grey-lighter py-4">
            <div className="flex items-bottom justify-between">
              <p className="text-grey-darkest">{msg.title}</p>
              <p className="text-xs text-grey-darkest">{msg.time}</p>
            </div>
            <p className="text-grey-dark mt-1 text-sm">{msg.message}</p>
          </div>
        </div>
      ))}
    </div>


</div>




{/* right */}

<div className="w-2/3 border flex flex-col  relative ">
  


<div className="py-2 px-3 bg-gray-200 flex flex-row justify-between items-center">
      <div className="flex items-center">
        <div>
         {oppositeOne&& <img className="w-10 h-10 rounded-full" src={oppositeOne.imageUrl} alt="Profile"/>} 
        </div>
        <div className="ml-4">
          <p className="text-gray-800">
            {oppositeOne&&oppositeOne.nickName}
          </p>
          <p className="text-gray-600 text-xs mt-1">
            Andrés, Tom, Harrison, Arnold, Sylvester
          </p>
        </div>
      </div>

      <div className="flex">
        <div className="ml-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="#263238" fillOpacity=".5" d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"/>
          </svg>
        </div>
        <div className="ml-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="#263238" fillOpacity=".5" d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 0 0 3.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 0 1-2.829 1.171 3.975 3.975 0 0 1-2.83-1.173 3.973 3.973 0 0 1-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.572.572 0 0 0-.834.018l-7.205 7.207a5.577 5.577 0 0 0-1.645 3.971z"/>
          </svg>
        </div>
        <div className="ml-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="#263238" fillOpacity=".6" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"/>
          </svg>
        </div>
      </div>
    </div>





    <div className="flex-1 overflow-auto bg-gray-300">
      <div className="py-2 px-3">

        <div className="flex justify-center mb-2">
          <div className="rounded py-2 px-4 bg-blue-200">
            <p className="text-sm uppercase">
              February 20, 2018
            </p>
          </div>
        </div>

        <div className="flex justify-center mb-4">
          <div className="rounded py-2 px-4 bg-yellow-200">
            <p className="text-xs">
              Messages to this chat and calls are now secured with end-to-end encryption. Tap for more info.
            </p>
          </div>
        </div>

        <div className="flex mb-2 pl-8">
          <div className="rounded py-2 px-3 bg-gray-200">
            <p className="text-sm text-teal ">
              Sylverter Stallone
            </p>
            <p className="text-sm mt-1">
              Hi everyone! Glad you could join! I am making a new movie.
            </p>
            <p className="text-right text-xs text-gray-600 mt-1">
              12:45 pm
            </p>
          </div>
        </div>

        <div className="flex mb-2 pl-8">
          <div className="rounded py-2 px-3 bg-gray-200">
            <p className="text-sm text-purple">
              Tom Cruise
            </p>
            <p className="text-sm mt-1">
              Hi all! I have one question for the movie
            </p>
            <p className="text-right text-xs text-gray-600 mt-1">
              12:45 pm
            </p>
          </div>
        </div>

        <div className="flex mb-2 pl-8">
          <div className="rounded py-2 px-3 bg-gray-200">
            <p className="text-sm text-orange">
              Harrison Ford
            </p>
            <p className="text-sm mt-1">
              Again?
            </p>
            <p className="text-right text-xs text-gray-600 mt-1">
              12:45 pm
            </p>
          </div>
        </div>

        <div className="flex mb-2 pl-8">
          <div className="rounded py-2 px-3 bg-gray-200">
            <p className="text-sm text-orange">
              Russell Crowe
            </p>
            <p className="text-sm mt-1">
              Is Andrés coming for this one?
            </p>
            <p className="text-right text-xs text-gray-600 mt-1">
              12:45 pm
            </p>
          </div>
        </div>

        <div className="flex mb-2 pl-8">
          <div className="rounded py-2 px-3 bg-gray-200">
            <p className="text-sm text-teal">
              Sylverter Stallone
            </p>
            <p className="text-sm mt-1">
              He is. Just invited him to join.
            </p>
            <p className="text-right text-xs text-gray-600 mt-1">
              12:45 pm
            </p>
          </div>
        </div>

        <div className="flex justify-end mb-2 pr-8">
          <div className="rounded py-2 px-3 bg-green-200">
            <p className="text-sm mt-1">
              Hi guys.
            </p>
            <p className="text-right text-xs text-gray-600 mt-1">
              12:45 pm
            </p>
          </div>
        </div>

        <div className="flex justify-end mb-2 pr-8">
          <div className="rounded py-2 px-3 bg-green-200">
            <p className="text-sm mt-1">
              Count me in
            </p>
            <p className="text-right text-xs text-gray-600 mt-1">
              12:45 pm
            </p>
          </div>
        </div>

        <div className="flex mb-2 pl-8">
          <div className="rounded py-2 px-3 bg-gray-200">
            <p className="text-sm text-purple">
              Tom Cruise
            </p>
            <p className="text-sm mt-1">
              Get Andrés on this movie ASAP!
            </p>
            <p className="text-right text-xs text-gray-600 mt-1">
              12:45 pm
            </p>
          </div>
        </div>

      </div>
    </div>




    <div className="bg-gray-300 px-4 py-4 flex items-center">
    <div style={{display: "flex" ,gap:" 16px"}}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path opacity=".45" fill="#263238" d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"/>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path fill="#263238" d="M12 3c.553 0 1 .447 1 1v7h7c.553 0 1 .447 1 1s-.447 1-1 1h-7v7c0 .553-.447 1-1 1s-1-.447-1-1v-7h-7c-.553 0-1-.447-1-1s.447-1 1-1h7v-7c0-.553.447-1 1-1z"/>
    </svg>
</div>

      

      <div className="flex-1 mx-4">
        <input className="w-full border rounded focus:outline-none px-2 py-2" onChange={textMessageSend} value={textMessage}  type="text" placeholder="Search..." />
      </div>
      <div>
        {sendButton? 
        
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" onClick={sendMessage}>
        <path d="M3.4,20.2,4.9,14,13.5,12,4.9,10,3.4,3.8a1,1,0,0,1,1.4-1.1L21.1,10.4a1,1,0,0,1,0,1.8L4.8,21.3A1,1,0,0,1,3.4,20.2Z" fill="#263238"/>
      </svg>
        :
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" >
          <path fill="#263238" fillOpacity=".45" d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2z"/>
        </svg>
      
}
      </div>
    </div>


</div> 






    </div>


    </div>


    </div>


    </div>
   
  );
}


export default ChatBox

