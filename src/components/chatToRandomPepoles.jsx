

import { useSelector } from "react-redux";

import { socket } from "../context/socket";
import { useEffect, useState ,useRef } from "react";


import AttachFileIcon from '@mui/icons-material/AttachFile';


import { ref, uploadBytes , getDownloadURL  } from "firebase/storage";
import { storage } from "../firebase";



import Picker from 'emoji-picker-react';




const ChatToRandomPepoles=()=>{



  const userInfo = useSelector((state) => state.auth.userInfo);
  const userId=userInfo._id
       
  const oppositeUserId=useRef(null)

      //  const [oppositeUserId,setOppositeUserId]=useState(null)

       const [allMessage,setAllMessage]=useState([])

       const [currentMessage,setCurrentMessage]=useState()

       const [isLoading,setIsLoading]=useState(true)

       const [sendingVideo,setSendingVideo]=useState(false)


       const [sendingImage,setSendingImage]=useState(false)


         const fileInputRef = useRef(null);




       const onChagneCurrentMessage=(e)=>{

        let val=e.target.value
        setCurrentMessage(val)
       }


  useEffect(()=>{
    socket.emit('on',userInfo._id)
    
    
    
    
    
    
    return ()=>{
    socket.off('on')
    
    }
    },[])



        
    const onSkipNextOne=()=>{
 
      

      socket.emit('userTouserOnlyRandomChatSkip',userId,oppositeUserId.current)



    }

    const componentChangeSkip=()=>{
      
      socket.emit('userTouserOnlyRandomChatComponentChange',userId,oppositeUserId.current)

    }




    useEffect(()=>{

      socket.on('userTouserOnlyRandomChat',(current,opposite)=>{

       
        setIsLoading(false)
        // setOppositeUserId(opposite)
        oppositeUserId.current=opposite
        
      })
     
      socket.on('userTouserLiveChatting',(message)=>{
       

        
        
        setAllMessage(prev=> [...prev,message])
      })



      socket.on('userTouserOnlyRandomChatSkip',()=>{

        setAllMessage([])
        setIsLoading(true)
       
       
        socket.emit('userTouserOnlyRandomChat',userId)
        // setOppositeUserId(null)
        oppositeUserId.current=null
      
      })
     

      socket.on('userTouserOnlyRandomChatSkipSecond',()=>{
       
        
        setAllMessage([])
        // setOppositeUserId(null)
        oppositeUserId.current=null
        setIsLoading(true)
      })



      return ()=>{
        socket.off('userTouserOnlyRandomChat')
      socket.off('userTouserLiveChatting')
      socket.off('userTouserOnlyRandomChatSkip')
      socket.off('userTouserOnlyRandomChatSkipSecond')
        
      }


    },[])






    const onSendMessage=()=>{
     
      
 if(oppositeUserId.current){

      socket.emit('userTouserLiveChatting',{userId:userId,receiver:oppositeUserId.current,message:currentMessage})
      setCurrentMessage('')
 }else{
  alert("not connected to any user")
 }
       
     
    }

    const [video,setVideo]=useState(false)

    const [image,setImage]=useState(false)

    const [filePath,setFilePath]=useState(null)


     const handleFileChange=(event)=>{
   

      const file = event.target.files[0];
      setFilePath(file)


      const fileType = file.type;
        



       if (fileType.startsWith('image/')) {
      // Handle image file
      console.log('This is an image file.');
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl)
      event.target.value=null


    } else if (fileType.startsWith('video/')) {
      // // Handle video file
    

      const videoUrl = URL.createObjectURL(file);
      setVideo(videoUrl);
 event.target.value=null


    } else {
      console.log('Unsupported file type.');
      // Handle unsupported file types, if needed
    }





     }



     const handleIconClick = () => {
      fileInputRef.current.click();
    };


    const closeOverlay=()=>{


      if (video) {
        URL.revokeObjectURL(video);
      }



      setVideo(null)
     
    }



    const closeImage=()=>{
      setImage(null)
    }


    const sendVideoToServer=()=>{

      setSendingVideo(true)


      const storageRef = ref(storage,filePath.name);

      uploadBytes(storageRef,filePath).then((snapshot) => {
        console.log('Uploaded a blob or file!');

        getDownloadURL(snapshot.ref).then((downloadURL)=>{
         

          setSendingVideo(false)
          closeOverlay()

          socket.emit('userTouserLiveChatting',{userId:userId,receiver:oppositeUserId.current,video:downloadURL})



        })

      });


    }



    const sendImageToServer=()=>{



      setSendingImage(true)


      const storageRef = ref(storage,filePath.name);

      uploadBytes(storageRef,filePath).then((snapshot) => {
        console.log('Uploaded a blob or file!');

        getDownloadURL(snapshot.ref).then((downloadURL)=>{
          
          closeImage()
          setSendingImage(false)
          

          socket.emit('userTouserLiveChatting',{userId:userId,receiver:oppositeUserId.current,image:downloadURL})



        })

      });



    }


    const [showEmoji,setShowEmoji]=useState(false)


    const handleClickEmoji=()=>{

        setShowEmoji(!showEmoji)

      
    }

     const onEmojiClick=(emojiObject)=>{


      if(currentMessage==undefined){

      setCurrentMessage(emojiObject.emoji)
      }else{
        setCurrentMessage(prev=>prev+emojiObject.emoji)
      }


     }


     useEffect(()=>{

      return ()=>{

        componentChangeSkip()
         
      }
     },[])



    return (
    
<>
  <div className="relative">

    <div className="bg-white rounded shadow-lg mt-5 mx-4 sm:mx-10 md:mx-20 lg:mx-20" style={{ width: "100%", maxWidth: "1400px", height: "590px", overflowY: "auto", position: 'relative' }}>

      {isLoading?
    <h1 className="text-3xl  border-r-black">
        searching new user to connect .....
    </h1>:<h1  className="text-3xl  border-r-black">now  connected</h1>}


        <br></br>
        
     
      {allMessage&&allMessage.map((a,b)=>{
 return  (
         <div>
          <br></br>
       {a.userId==userId ?<h1 className="ml-4 text-blue-500 text-base md:text-xl">YOU:


        {a.message&&<span className="text-black ml-0">{a.message}</span>}

         {a.video && (
        <video
          className=" mt-4"
          src={a.video}
          controls
          width="200"
          height="150"
        >
          Your browser does not support the video tag.
        </video>
      )}


{a.image && (
        <img
          className="pt-4"
          src={a.image}
        
          width="200"
          height="150"
        >
          
        </img>
      )}
      
 </h1>
       :
      <h1 className="ml-4 text-blue-500 text-base md:text-xl">STRANGER:

{a.message&&<span className="text-black ml-0">{a.message}</span>}


       {a.video && (
        <video
          className="mt-4"
          src={a.video}
          controls
          width="200"
          height="150"
        >
          Your browser does not support the video tag.
        </video>
      )}
<br />

{a.image && (
        <img
         className="pt-4"
          src={a.image}
           width="200"
          height="150"
        >
      
        </img>
      )}



      
      
       
       </h1>}
      </div>

      // <div>

      //   {a.userId==userId&&a.message&&<h1 className="ml-4 text-blue-500 text-base md:text-xl">YOU: <span className="text-black ml-1">{a.message}</span></h1>}
      //   {!a.userId&&a.message&&<h1 className="ml-4 text-blue-500 text-base md:text-xl">STRANGER:  <span className="text-black ml-1">{a.message}</span></h1>}
      // </div>

      )})}



        {video && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <button
            onClick={closeOverlay}
            className="absolute top-4 right-4 text-white text-2xl"
          >
            &times;
          </button>
          <div className="flex flex-col items-center">
            <video
              controls
              src={video}
              className="w-full max-w-5xl h-[500px] mb-4"
              autoPlay
            />
            {!sendingVideo?<button
              onClick={sendVideoToServer}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Send Video
            </button>:
            <button
            
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Sending .....
            </button>}
          </div>
        </div>
      )}



{image && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <button
            onClick={closeImage}
            className="absolute top-4 right-4 text-white text-2xl"
          >
            &times;
          </button>
          <div className="flex flex-col items-center">
            <img
              controls
              src={image}
              className="w-full max-w-5xl h-[500px] mb-4"
              
            />
            {!sendingImage ?<button
              onClick={sendImageToServer}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Send Image
            </button>:
            <button
            
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Sending .....
            </button>}
          </div>
        </div>
      )}

     
      <br />
      {/* <h1 className="ml-4 text-blue-500 text-base md:text-xl">STRANGER: <span className="text-black ml-1">second</span></h1>
      <h1 className="ml-4 text-blue-500 text-base md:text-xl">YOU: <span className="text-black ml-1">first</span></h1> */}
      
    </div>

   


    <div className="fixed bottom-0 left-0 right-0 bg-white flex flex-col gap-2 px-4 py-2 md:flex-row md:items-center md:gap-4">
      <button className="bg-red-500 text-white text-lg md:text-3xl px-6 md:px-10 py-2 rounded" onClick={onSkipNextOne}>Skip</button>
      <div className="relative flex-grow">
        <input className="w-full h-12 border border-black bg-white border-opacity-40 rounded px-3 py-2 outline-none pl-12"    type="text" placeholder="Enter text..."  value={currentMessage} onChange={onChagneCurrentMessage}   />
        <AttachFileIcon  onClick={handleIconClick} className="absolute top-1/2 transform -translate-y-1/2 left-[1100px] cursor-pointer text-gray-500" />
        <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2"  onClick={handleClickEmoji}>
       
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path opacity=".45" fill="#263238" d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"></path>
          </svg>
        </div>
      </div>
      <button className="bg-green-500 text-white text-lg md:text-3xl px-6 md:px-10 py-2 rounded"   style={{ cursor:oppositeUserId.current? 'pointer' : 'not-allowed' }}  onClick={onSendMessage}>send</button>
      
    </div>
    {showEmoji&&<div className="absolute z-[100] top-20 left-0 right-0 mx-auto mt-10 ">

<Picker  onEmojiClick={onEmojiClick} />
{/* <button className="bg-green-500 text-white text-lg md:text-3xl px-6 md:px-10 py-2 rounded">Next</button> */}
  {/* <div className='pl-1'>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="44" height="54">
      <path d="M3.4,20.2,4.9,14,13.5,12,4.9,10,3.4,3.8a1,1,0,0,1,1.4-1.1L21.1,10.4a1,1,0,0,1,0,1.8L4.8,21.3A1,1,0,0,1,3.4,20.2Z" fill="#263238"/>
    </svg>
  </div> */}
</div>}
  </div>
</>


    )
}

export default ChatToRandomPepoles