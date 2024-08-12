


import React,{useState,useEffect,useCallback,useContext,useRef} from "react";
import { useSelector ,useDispatch} from "react-redux";

import { SocketContext } from "../context/socket";
import { useParams ,useNavigate } from 'react-router-dom';
import api from "../route/interceptors";
import getProfile from "../service/getProfile";
import getAllConversation from "../service/conversation";
import VideoCallIcon from '@mui/icons-material/VideoCall';
import PermissionNotification from "../components/permisionNotification";
import VideoCall from "../components/videoCall/videoCall";
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import ImageCropper from "../components/ImageCropper";
import SharePicChat from "../service/sharePic_Chat";
import ReportManagement from "../components/Report";
import Notification from "../components/notification";
import deleteChat, { deleteAllMessage, deleteSingleChat } from "../service/deleteChat";
import ClearAllIcon from '@mui/icons-material/ClearAll';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import NewMessageNotificatoin from "../components/messageNotification";

import Picker from 'emoji-picker-react';
import { removeUserCredential } from "../store/authSlice";

import Swal from 'sweetalert2';
import { userTouserBlock } from "../service/deleteChat";
import { userTouserUnblock } from "../service/deleteChat";


  function isURL(str) {
    {console.log("patetttttttttttttttttttteeeeeeeeeeeeeeeeeennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")}
    {console.log(str)}
    // Regular expression to match URL format
    const urlPattern = /^(?:https?:\/\/)?[\w.-]+\.\w{2,}(?:\/\S*)?$/;
    console.log(urlPattern.test(str))
    // Test if the string matches the URL pattern
    return urlPattern.test(str);
  }

  



const SampleChat=()=>{



    const [showSideBar,setShowSideBar]=useState(false)



  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.auth.userInfo);
  const  userId=userInfo._id
  const socket=useContext(SocketContext)
const { receiverId }=useParams()


    
    




  const [nickName, setNickName] = useState();
  const [profileId,setProfileId]=useState()

  const [image, setImage] = useState(false);
  const [oppositeOne,setOppositeOne]=useState()


  const [blockUnblockchatroomId,setblockUnblockchatroomId]=useState(null)
  
  const [chatroomDetails,setchatroomDetails]=useState()

  const [chatRoomId,setChatRoomId]=useState(false)

  const [messages, setMessages] = useState([]);

  const [sideMessage,setSideMessage]=useState()
  const messageContainerRef = useRef(null);


  // function getAll(){
  //   getAllConversation(userId)
  //   .then((res)=>{
  //     setSideMessage(res)
  //   })
  // }



  useEffect(()=>{
    
    getAllConversation(userId)
    .then((res)=>{
      setSideMessage(res)
    })

  
  },[messages])

  
  

  useEffect(()=>{
    return ()=>{
      socket.off('deletedStaus')
    }
  })



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

   

if(receiverId){
  
    api.post('/getSingleChat',{receiverId,userId})
    .then((resposne)=>{
      console.log(resposne.data.profile)
      if(resposne.data.chat){
        console.log("ooooooooooooooooooooooooooo uuuuuuuuuuuuuu     u                 oooooo")
         resposne.data.chat.map((a)=>{
          console.log(a)
         })
         let array=resposne.data.chat
      setMessages( array);
      }
     


      setOppositeOne(resposne.data.profile)

      const member = resposne.data.chatroom?.members?.find(a => userId === a.userId);
      {console.log(resposne.data.chatroom)}
      console.log("================================================================================================")
      console.log(member)
      setblockUnblockchatroomId(resposne.data.chatroom._id)
      setchatroomDetails(member)
      if(member.status==true){
        
        setSendMessaeInputBox('none')
      }else{
        setSendMessaeInputBox('false')
      }
      
    })
  }
}






 

const [permissionForVideoCall,setPermissionForVideoCall]=useState(false)
const [localId,setLocalId]=useState()
const [remoteId,setRemoteId]=useState()
const [oppositeOneTypingStatus,setOpositeOneTypingStatus]=useState(false)
  
  useEffect(()=>{

   

    socket.emit('on',userInfo._id)

    socket.on('newMessage',(response)=>{
      console.log("00000000000000000000000000000000000")

       console.log(response)
      

      // setComingMessages(prevMessages => [...prevMessages,response.message]);
      console.log("nw messssssssssageeeeeeeeeeeeeeeeeeeeeeee")
      console.log(chatroomDetails)
    
        setMessages(prevMessages => [...prevMessages, response]);
      

    })
    updateSingleChat()


    socket.on('askingPermisionVideoCall',(response,localId,remoteId)=>{
           
     setPermissionForVideoCall(response)
     setLocalId(localId)
     setRemoteId(remoteId)
     
      
    })
     
    socket.on('typingStatus',(res)=>{
  
        setOpositeOneTypingStatus(res)
      
    })

    socket.on('ignoredStatus',(res)=>{
      setVideoCall(false)
    })


    socket.on('deletedStatus',()=>{
    
      updateSingleChat()
    })

    

    return ()=>{
      socket.off('on')
      socket.off('deletedStatus')
      socket.off('skingPermisionVideoCall')
      socket.off('ypingStatus')
      socket.off('ignoredStatus')
      socket.off('newMessage')
    }

  },[receiverId])

  const [textMessage,setTextMessage]=useState()
  const [sendButton,setSendButton]=useState(false)

  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);


  const textMessageSend=(e)=>{
    let value=e.target.value
    
    setTextMessage(value)
    setIsTyping(true);

      socket.emit('isTypingStatus',receiverId,true)
     
    // Clear the previous timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new timeout to reset the typing status after 1 second
    setTypingTimeout(
      setTimeout(() => {
        socket.emit('isTypingStatus',receiverId,false)
        setIsTyping(false);
      }, 2000)
    );


    
    if(value.trim().length==0){
      setSendButton(false)
    }else{
      setSendButton(true)
    }

  }

  const sendMessage=()=>{
   
    if(!chatRoomId){
      if(receiverId){

      api.post('/createChatRoom',{receiverId,userId})
      .then((res)=>{
        setChatRoomId(res.data.response._id)
        const chatRoomId=res.data.response._id
     
        socket.emit('sendMessage',chatRoomId,userId,receiverId,textMessage)
      })
    }
    }else{
     
      
      socket.emit('sendMessage',chatRoomId,userId,receiverId,textMessage)
    }

    

    // setMessages(prevMessages => [...prevMessages, textMessage]);
    setTextMessage('')
  }


  const handleKeyDown = (e) => {

    if(textMessage.length>0){
    if (e.key === 'Enter') {
      sendMessage();
    }
  }
  };

  const navigate = useNavigate();
  const handleClick=(id)=>{

    

    navigate(`/sampleChat/${id}`)
    // updateSingleChat()
    

  }
  {console.log("chatromooooooooooommmmmmmmmmmmmmmmmmmmmmmm detailsssssssssssssssssssssssssssssssssssssssssssssssssss")}
  {console.log(chatroomDetails)}

  const [isCalling,setIsCalling]=useState(false)
  
  const [videoCall,setVideoCall]=useState(false)


  const videoButton=()=>{

    socket.emit('checkUserForVideoCall',userId,receiverId)
    setVideoCall(true)

    // setIsCalling(true)
  }



  const onCloseVideocall=()=>{
    
    socket.emit('ignoredVideoCall',localId,remoteId)
    
    setPermissionForVideoCall(false)
   
  }



  
  const goforcall=()=>{

    setVideoCall(true)

    setPermissionForVideoCall(false)
    
    
  }


  const closeVideoCall=()=>{
   
    setVideoCall(false)
  }



  const fileInputRef = useRef(null);



  const handleFile=()=>{
    fileInputRef.current.click()
  }
 
  const [prevFile,setPrevFile]=useState(false)
  const [prevLoading,setPrevLoading]=useState(false)

   const [pathImage,setPathImage]=useState(null)
  //  const [imageToCrop, setImageToCrop] = useState(undefined);
  //  const [croppedImage, setCroppedImage] = useState(undefined);
  //  const [pathCroped,setPathCropped]=useState(undefined)

const closePreview=()=>{
  setPrevFile(false)

  if (fileInputRef.current) {
    fileInputRef.current.value = ''; // Reset the file input using the ref
  }
 
}


useEffect(()=>{
  socket.on('blockedUser',()=>{
    alert('Your account has been blocked.');
    dispatch(removeUserCredential());
   
    navigate('/login');
  })

  

  return ()=>{
    setChatRoomId(null)
    socket.off('blockedUser')
  }

})





useEffect(() => {
  console.log("prevFile changed:", prevFile);
}, [prevFile]);

   const uploadChatPic=()=>{
    

    setPrevLoading(true)

   

    
    const formData = new FormData();
    formData.append("image", pathImage);

    SharePicChat(formData)
    .then((res)=>{

      if(res){

         let url=res.url

        if(!chatRoomId){
         
    
          api.post('/createChatRoom',{receiverId,userId})
          .then((res)=>{
            setChatRoomId(res.data.response._id)
            const chatRoomId=res.data.response._id
         
            socket.emit('sendMessage',chatRoomId,userId,receiverId,url)
          })
        
        }else{
         
          
          socket.emit('sendMessage',chatRoomId,userId,receiverId,url)
        }

        setPrevLoading(false)
        setPrevFile(false)

        
      }

    })

   }





  const handleFileChange=(event)=>{
 

    // setPrevFile(true)

    // if (event.target.files && event.target.files.length > 0) {
    //   const reader = new FileReader();

    //   reader.addEventListener("load", () => {
    //     const image = reader.result;
    //    console.log("loadedddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd")
    //    console.log(image)
    //     setImageToCrop(image);
    //   });

    //   reader.readAsDataURL(event.target.files[0]);
    // }



    const file = event.target.files[0];


    const maxSizeInBytes = 1 * 1024 * 1024; // 1 MB limit
    
    if (file.size > maxSizeInBytes) {
        alert("File size exceeds the limit (1 MB). Please select a smaller file.");
        // Optionally, reset the file input to clear the selected file
        event.target.value = null;
        return;
    }



    setPathImage(file)
    
    const cachedURL = URL.createObjectURL(file);
    // setSrcImg(cachedURL)
    
    setPrevFile(cachedURL)
  }

  const [reportShow,setReportShow]=useState(false)

 const [showsendMessageInputBox,setSendMessaeInputBox]=useState('false')
  const [option,setOptions]=useState(false)





  
  const reportManagemgentClose=()=>{

    setOptions(false)
    setReportShow(false)
  }


  const [selectMessageOption,setSelectMessaeOption]=useState(false)


const onChangeSelectMessaeOption=(status)=>{

  setOptions(false)

  if(status){
    setSelectMessaeOption(true)
    setSendMessaeInputBox('delete')
  }else{
    setSendMessaeInputBox('false')
    setSelectMessaeOption(false)
  }
 
  
}


  // user connection Notification 
  const [notification,setNotification]=useState(null)
  const closeNotification = () => {
    setNotification(null);
  };

  

const [selectUsers,setSelectUsers]=useState(false)
const [selectedUsersId,setSelectedUsersId]=useState([])


  const onSelectUsers=()=>{
    setSelectUsers(!selectUsers)
  }



  const allSelectedUsers=(e)=>{
    let val=e.target.value
  
   
    if(e.target.checked){
      
    setSelectedUsersId([...selectedUsersId,val])
    }else{
    let fil=selectedUsersId.filter((a)=>a!=val)
   
    setSelectedUsersId(fil)
    }
  
  }
   
  


  const deleteSelectedUsers=()=>{
    


    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
      
        setSelectedUsersId([])
    setSelectUsers(false)
    deleteSingleChat(selectedUsersId,userId)
    .then((res)=>{
      if(res){
       
        updateSingleChat()
        navigate('/sampleChat')
      }
    })


  }})
  

  }



  const clearSingleChat=(clearChatId)=>{


    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to clear this chat?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, clear it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteChat(clearChatId,userId) // Call your clear function
        Swal.fire(
          'Cleared!',
          'The chat has been cleared.',
          'success'
        ).then(()=>{
          updateSingleChat()
        })
       
      }
    
    });
   
  }


  
  const [messagesId,setMessagesId]=useState([])

  const allSelectedMessagesId=(e)=>{
    const id = e.target.value;
  
    if (messagesId.includes(id)) {
      // If ID is already in the array, remove it
      setMessagesId(messagesId.filter(msgId => msgId !== id));
  } else {
      // Otherwise, add the ID to the array
      setMessagesId([...messagesId, id]);
  }


  }


  const deleteAllMessageId = () => {


    Swal.fire({
      title: 'Are you sure you want to delete?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
     
        socket.emit("deleteMessage",messagesId,userId,receiverId)
        setSelectMessaeOption(false)
        setSendMessaeInputBox('false')
        setMessagesId([])

        // deleteAllMessage(messagesId)
        // .then((res) => {
        //   setSelectMessaeOption(false)
        //   setSendMessaeInputBox(true)
        //   updateSingleChat()
        // });
      }
    });
  };
  


  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);


  const[showEmoji,setShowEmoji]=useState(false)

  const onChageshowemoji=()=>{

   
    setShowEmoji(true)
    // setShowEmoji(!showEmoji)
    
  }

  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [inputStr, setInputStr] = useState("");


  const onEmojiClick = ( emojiObject) => {
    setChosenEmoji(emojiObject);

    const selectedEmoji = emojiObject.emoji || emojiObject.character || emojiObject.native;
    console.log(emojiObject)
    console.log("above")
    console.log(emojiObject.emoji)
    setInputStr((prevInput) => prevInput + emojiObject.emoji);
    console.log("emojiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
    console.log(textMessage)
  console.log(emojiObject.emoji)
  if(textMessage==undefined){
    setTextMessage(emojiObject.emoji)
  }else{
    setTextMessage((prev)=>prev+emojiObject.emoji)
  }
  
  setSendButton(true)
    
  };



   // handle opppostie user blocking
  const onChangeBlockUser=(chatRoomId,userId)=>{

  

   
    userTouserBlock(chatRoomId,userId)
    .then((res)=>{
      updateSingleChat()
    })


   

    setOptions(false)

 
  }


  const member = chatroomDetails?.members?.find(a => userId === a.userId);
console.log("111111111111111111111111111111111111             2222222222222222222222      current user chatroom details details chatroomdetails details ")
  console.log(chatroomDetails)



  const unBlockUser=(chatRoomId,userId)=>{

   

     userTouserUnblock(chatRoomId,userId)
      .then((res)=>{
        updateSingleChat()
      })
  }

  
  return (
    <div  >
      {/* <NewMessageNotificatoin    /> */}
      {videoCall&&<VideoCall  receiver={receiverId}  closeVideoCall={closeVideoCall} />}
      {permissionForVideoCall&& <PermissionNotification    response={permissionForVideoCall} onAccept={goforcall}  onclose={onCloseVideocall} />}
      {reportShow&&<ReportManagement  reportedUser={receiverId} onclose={reportManagemgentClose} />}
      {notification&&<Notification   message={notification} onClose={closeNotification}  />}

<div className="container mx-auto h-screen position: fixed  ml-1" >
      
<div className="py-0 h-screen">
      

<div className="flex border border-gray-300 rounded shadow-lg h-screen w-full ">
     












{!receiverId&&<div className="w-full border flex flex-col ">


<div className="py-2 px-3 bg-gray-100 flex flex-row justify-between items-center">
            <div>
            
                <img className="w-10 h-10 rounded-full" src={image} alt="User Avatar" />
            </div>
            <div className="flex">
               
          {selectUsers&&<><svg xmlns="http://www.w3.org/2000/svg"      style={{ cursor:selectedUsersId.length > 0 ? 'pointer' : 'not-allowed' }}   viewBox="0 0 24 24" width="24" height="24" fill="currentColor" onClick={deleteSelectedUsers}>
  <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/>
</svg>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor" onClick={onSelectUsers}>
  <path d="M18.3 5.71L12 12l6.3 6.3-1.42 1.42L12 14.41l-6.3 6.3-1.42-1.42L10.59 12 4.29 5.71 5.71 4.29 12 10.59l6.3-6.3z"/>
</svg>
</>}




               {!selectUsers&&<div className="ml-4">
                  
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" widh="24" height="24" onClick={onSelectUsers} >
                        <path fill="#263238" fillOpacity=".6" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path>
                    </svg>
                </div>}
            </div>
        </div>
     
    
   
<form className="py-2 px-2 bg-gray-100">   
    <label for="default-search" class="mb-2 text-sm font-medium sr-only">Search </label>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm  border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500   " placeholder="Search ..." required />
<button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2  ">Search</button>
    </div>
</form>
















<div className="bg-grey-lighter flex-1 overflow-auto">
  {console.log("side message message sidemesasge sidemssage")}
  {console.log(sideMessage)}
  {sideMessage&&sideMessage.map((msg, index) => {
       let time=msg?.all?.timeStamp
      
    const formattedTime = time? new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) :""
    let imageUrl=msg?.userDetails?.imageUrl
    let id=msg?.userDetails?._id
    let messCheck=msg?.all?.message

    const pic=isURL(messCheck)

  
   
    return (
      <div key={index} className={`bg-white px-3 flex items-center hover:bg-grey-lighter cursor-pointer`}>
        <div>
          {selectUsers&&  <input
                  id="checkbox-item-11"
                  type="checkbox"
                  value={msg?.all?.chatroom}
                  onChange={allSelectedUsers}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />}
                
          <img className="h-12 w-12 rounded-full" src={imageUrl} alt={'sdjfi'} />
        </div>
        <div className="ml-4 flex-1 border-b border-grey-lighter py-4" onClick={()=>handleClick(id)}>
          <div className="flex items-bottom justify-between">

            <p className="text-grey-darkest">{msg?.userDetails?.nickName}</p>
            <p className="text-xs text-grey-darkest">{formattedTime?formattedTime:""}</p>
            
          </div>
         
          {msg?.all?.receiver==userId&&isURL(msg?.all?.message)&&
          
           
           <p className="text-grey-dark  mt-1 text-sm">image</p>
          }
          {msg?.all?.receiver==userId&&!isURL(msg?.all?.message)&&
          
          
          <p className="text-grey-dark  mt-1 text-sm">{msg?.all?.message}</p>
        }
       
          
        
          {msg?.all?.sender==userId&&isURL(msg?.all?.message)&&
        <p className="text-grey-dark mt-1 pr-8 text-sm text-right">image</p>}
           {msg?.all?.sender==userId&&!isURL(msg?.all?.message)&&
          <p className="text-grey-dark mt-1 pr-8 text-sm text-right">{msg?.all?.message}</p>}
         
        </div>
      </div>
    );
  })}
</div>

        


   

</div>}























{option&&<div>
  

<div  class="absolute top-5 right-10 z-50">
        <div id="toast-notification" className=" w-full max-w-xs p-4  bg-white rounded-lg shadow  text-gray-300" role="alert">
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                   
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14" onClick={()=>setOptions(false)}>
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
              
            </div>

                
         

      <span className="mb-1 text-sm  text-black  " onClick={()=>onChangeSelectMessaeOption(true)} >select message</span>
                <br/>
                <span className="mb-1 text-sm  text-black  " onClick={()=>setReportShow(true)} >report</span>
                <br></br>
                <span  className="mb-1 text-sm  text-black  " onClick={()=>onChangeBlockUser(blockUnblockchatroomId,userId)}>block</span>
            </div>
            
            
        </div>
</div>} 

























 {receiverId&&
 <div className="w-full border flex flex-col  relative ">
  
  {isCalling && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', position: 'absolute', width: '100%', top: 0, left: 0 }}>
        <div className="bg-white text-black border border-black p-5 w-42 h-16 shadow-lg">
      Ringing
    </div>
        </div>
      )}


<div className="py-2 px-3 bg-gray-200 flex flex-row justify-between items-center">
      <div className="flex items-center">
        <div>
        
         {oppositeOne&& <img className="w-10 h-10 rounded-full" src={oppositeOne.imageUrl} alt="Profile"/>} 
        </div>
        <div className="ml-4">
          <p className="text-gray-800">
            {oppositeOne&&oppositeOne.nickName}
          </p>
          {oppositeOneTypingStatus&&<p>typing....</p>}
         
        </div>
      </div>

     

      <div className="flex" >
       
        <div  onClick={videoButton}>
       <VideoCallIcon />

       </div>
  {messages&& <div className="ml-3" onClick={()=>clearSingleChat(messages[0].chatroom)}>
       <ClearAllIcon />
       </div>
}
       

        <div className="ml-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" onClick={()=>setOptions(true)}>
            <path fill="#263238" fillOpacity=".6" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"/>
          </svg>
        </div>


      </div>
    </div>





    <div className="flex-1 overflow-auto bg-gray-300" ref={messageContainerRef}>
      <div className="py-2 px-3">

        <div className="flex justify-center mb-2">
          
        </div>

       
        

        {messages&&messages.map((mess,index)=>{
       
          
          if(mess?.receiver==userId){

          
            const pic=isURL(mess.message)
            const formattedTime = new Date(mess?.timeStamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          return (
        
        <div className="flex mb-2 pl-8" key={index}>
          {selectMessageOption&&<input
                  id="checkbox-item-11"
                  type="checkbox"
                  value={mess?._id}
                  onChange={allSelectedMessagesId}
                  className="w-4 h-4 mr-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />}
          <div className="rounded py-2 px-3 bg-gray-200">
            {pic?
          
                      
            <img src={mess.message} style={{height:"300px",width:"300px"}}></img>
            :
            <p className="text-sm text-purple">
              {mess?.message}
            </p>
          }
         
            <p className="text-right text-xs text-gray-600 mt-1">
              {formattedTime}
            </p>
          </div>
        </div>
        )
      
      }else{
        if(mess?.sender==userId){
          const formattedTime = new Date(mess?.timeStamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          const pic=isURL(mess.message)

          return (
          
          <div className="flex justify-end mb-2 pr-8" key={index}>
            {selectMessageOption&&<input
                  id="checkbox-item-11"
                  type="checkbox"
                  value={mess?._id}
                  onChange={allSelectedMessagesId}
                  className="w-4 h-4 mr-2 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />}
             <div className="rounded py-2 px-3 bg-gray-200">
            {pic?
          
                      
            <img src={mess.message} style={{height:"300px",width:"300px"}}></img>
            :
            <p className="text-sm text-purple">
              {mess?.message}
            </p>
          }
         
            <p className="text-right text-xs text-gray-600 mt-1">
              {formattedTime}
            </p>
          </div>
          </div>
             )
            }

      }
      })
      }
       
         

      </div>
    </div>





 
 

<div>


    {showsendMessageInputBox=='delete' && (
                <div className="bg-white border border-gray-200 rounded-md shadow-md flex items-center justify-between px-3 py-2" style={{ width: "300px", height: "40px" }}>
                    <div className="pl-4">
                        <svg
                            className="w-4 h-4 cursor-pointer"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            onClick={() => onChangeSelectMessaeOption(false)}
                        >
                            <path d="m1 1 12 12M1 13 13 1" />
                        </svg>
                    </div>
                    <div style={{paddingLeft:'20px'}}><span>{messagesId.length +'selected'}</span></div>
                    <div style={{ marginLeft: "800px" }}>
                        <DeleteForeverIcon
                            onClick={deleteAllMessageId}
                            style={{
                                opacity: messagesId.length > 0 ? 1 : 0.5,
                                cursor: messagesId.length > 0 ? 'pointer' : 'not-allowed',
                            }}
                        />
                    </div>
                </div>
            )}





    {showEmoji && (
     
        <div >
       
          <div className="absolute z-50 top-32 left-0 ">

            <button
          
              className=" pr-2  z-50 "
              onClick={() => setShowEmoji(false)}
          
            >
              <div className="pl-4">
                        <svg
                            className="w-4 h-4 cursor-pointer"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                           
                        >
                            <path d="m1 1 12 12M1 13 13 1" />
                        </svg>
                    </div>
            </button>

            <br></br>
            <br></br>
            <Picker  onEmojiClick={onEmojiClick} />
          </div>
        </div>
      

      )}











      

    {showsendMessageInputBox=='false'&&<div className="bg-gray-300 px-4 py-4 flex items-center">
      
    <div style={{display: "flex" ,gap:" 16px"}}>
    
   
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" onClick={onChageshowemoji}>
        <path opacity=".45" fill="#263238" d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"/>
    </svg>
    <div >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" onClick={handleFile}>
        <path fill="#263238" d="M12 3c.553 0 1 .447 1 1v7h7c.553 0 1 .447 1 1s-.447 1-1 1h-7v7c0 .553-.447 1-1 1s-1-.447-1-1v-7h-7c-.553 0-1-.447-1-1s.447-1 1-1h7v-7c0-.553.447-1 1-1z"/>
    </svg>
    <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
</div>

      


      <div className="flex-1 mx-4">
      
        <input className="w-full border rounded focus:outline-none px-2 py-2" onChange={textMessageSend} onKeyDown={handleKeyDown}  value={textMessage}  type="text" placeholder="Search..." />
      </div>

      <div>
        {sendButton? 
        <button>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" onClick={sendMessage}>
        <path d="M3.4,20.2,4.9,14,13.5,12,4.9,10,3.4,3.8a1,1,0,0,1,1.4-1.1L21.1,10.4a1,1,0,0,1,0,1.8L4.8,21.3A1,1,0,0,1,3.4,20.2Z" fill="#263238"/>
      </svg>
      </button>
        :
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" >
          <path fill="#263238" fillOpacity=".45" d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.469 2.35 8.469 4.35v7.061c0 2.001 1.53 3.531 3.53 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2z"/>
        </svg>
      
}
      </div>
  
    </div>}

</div> 

{chatroomDetails?.status==true&&<button  onClick={()=>unBlockUser(blockUnblockchatroomId,userId)} className="bg-white border-gray-200 rounded-md shadow-md flex items-center justify-center px-3 py-2">UN BLOCK</button>}


</div>

}








 





{/* {receiverId==undefined&&

 <div className="w-2/3 border flex flex-col items-center justify-center  relative bg-gray-100">
 
        <img src="https://www.kindpng.com/picc/m/241-2411768_facebook-messenger-icon-white-hd-png-download.png" alt="Facebook Messenger Icon White, HD Png Download@kindpng.com"   style={{ width: '500px', height: '300px',
 
        }} ></img>
 </div>
} */}






    </div>


    </div>



    </div>


    {prevFile && (
  <div
    className="fixed inset-0 flex justify-center items-center p-4 sm:p-6 md:p-8 lg:p-10"
    style={{ paddingLeft: '5%', marginTop: '4%' }}
  >
    <div className="bg-gray-200 w-full h-full flex flex-col items-center relative overflow-hidden">
      <svg
        className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 absolute top-2 right-2 sm:top-4 sm:right-4 cursor-pointer"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 14"
        onClick={closePreview}
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
        />
      </svg>

      <div className="flex justify-center items-center w-full h-full px-4 overflow-auto">
        <img
          src={prevFile}
          className="max-w-full max-h-full object-contain"
          alt="Preview"
        />
      </div>

      {prevLoading ? (
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 flex justify-center items-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div
          className="absolute bottom-12 right-4 sm:bottom-14 sm:right-6 md:bottom-16 md:right-8 lg:bottom-20 lg:right-10 flex justify-center items-center cursor-pointer"
          onClick={uploadChatPic}
        >
          <SendTwoToneIcon className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16" />
        </div>
      )}
    </div>
  </div>
)}






    {/* {prevFile && (
  <div
    className="fixed inset-0 flex justify-center items-center p-4 sm:p-6 md:p-8 lg:p-10"
    style={{ paddingLeft: '5%', marginTop: '4%' }}
  >
    <div className="bg-gray-200 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-4xl h-full flex flex-col items-center relative">
      <svg
        className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 absolute top-2 right-2 sm:top-4 sm:right-4 cursor-pointer"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 14"
        onClick={closePreview}
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
        />
      </svg>

      <div className="flex justify-center items-center w-full h-full px-4">
        <img
          src={prevFile}
          className="w-full h-auto max-w-[75%] max-h-[75%] sm:max-w-[80%] sm:max-h-[80%] md:max-w-[85%] md:max-h-[85%] lg:max-w-[90%] lg:max-h-[90%] xl:max-w-[95%] xl:max-h-[95%]"
          alt="Preview"
        />
      </div>

      {prevLoading ? (
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 flex justify-center items-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div
          className="absolute bottom-12 right-4 sm:bottom-14 sm:right-6 md:bottom-16 md:right-8 lg:bottom-20 lg:right-10 flex justify-center items-center cursor-pointer"
          onClick={uploadChatPic}
        >
          <SendTwoToneIcon className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16" />
        </div>
      )}
    </div>
  </div>
)} */}



    </div>
   
  );
}






export default SampleChat