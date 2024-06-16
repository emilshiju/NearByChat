
import React  ,{useEffect,useState} from "react"
import api from "../../route/interceptors"
import connection from "../../service/connection"
import { useSelector } from "react-redux";
import Sidebar from "../../components/sideBar"
import { SocketContext, socket } from "../../context/socket";
import { useNavigate } from "react-router-dom";
import Notification from "../../components/notification";

const NotificationList=()=>{

    const userInfo = useSelector((state) => state.auth.userInfo);
    const [allNotification,setAllNotification]=useState(null)

    const navigate = useNavigate();

   


    // useEffect(() => {
  
    //   const userId = userInfo._id;
        


    //   socket.on('notification', (message) => {
      
    //     console.log('Notification received:', message);
    //     // setNotification(message)
    //     // alert('Notification: ' + message);
    //    });
  
      
  
    //   return ()=>{
    //     alert("Poui")
    //     socket.off('notification');
    //   }
    // }, []);

    const [notification,setNotification]=useState(null)
  const closeNotification = () => {
    setNotification(null);
  };



    useEffect(()=>{

      const fetch=()=>{
        connection(userInfo._id)
        .then((response)=>{
          setAllNotification(response)
        })
      }

      socket.emit('on',userInfo._id)

        socket.on('notification',(message)=>{
          
          if(message){
          setNotification(message)
          }
         
            
            fetch()
          
         
        })
        fetch()

        return ()=>{
          socket.off('notification')
        }

    },[])
      const handleAcceptedRequest=()=>{


      }
     const acceptRequest=(senderId,receiverId,senderProfile,receiverIdProfile)=>{
  
      socket.emit('acceptedRequest',senderId,receiverId,senderProfile,receiverIdProfile)

     }

     const unConnectReqeust=()=>{

     }

     const connectRequest=()=>{

     }
    // alert(allNotification)

    const gotoSendMessage=(senderProfile,receiverIdProfile)=>{
      
      
      let idOf
      let myid
      if(senderProfile._id){
        idOf=senderProfile._id
        myid=receiverIdProfile
      }else{
        idOf=receiverIdProfile._id
        myid=senderProfile
      }

      

      navigate(`/chatBox/${idOf}/${myid}`)

         
        


    }

    return(
        <div>
            <Sidebar />
            {notification&&<Notification   message={notification} onClose={closeNotification}  />}

            <div style={{ marginLeft: "387px" }}>
              

            <div className="flex flex-col p-8 bg-white shadow-md hover:shadow-lg rounded-2xl" style={{marginTop:'60px',width:"1000px"}}>

  
    {allNotification&&
    allNotification.map((allNotification,b)=>{

      return (
<>
 
    <div className="flex items-center justify-between" style={{ height: '50px',}}>
    <div className="flex items-center">
 
   
     <div className="relative w-14 h-14 rounded-full hover:bg-red-700 bg-gradient-to-r from-purple-400 via-blue-500 to-red-400">
     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gray-200 rounded-full border-2 border-white">
     {allNotification.receiverIdProfile.imageUrl&&<img key={b} className="w-full h-full object-cover rounded-full" src={allNotification.receiverIdProfile.imageUrl} alt="" />}
     {allNotification.senderProfile.imageUrl&&<img key={b} className="w-full h-full object-cover rounded-full" src={allNotification.senderProfile.imageUrl} alt="" />}
      </div>
      </div>

      <div className="flex flex-col ml-3">
        <div className="font-medium leading-none">{allNotification.receiverIdProfile.nickName?allNotification.receiverIdProfile.nickName :allNotification.senderProfile.nickName} </div>
        <p className="text-sm text-gray-600 leading-none mt-1">
          {allNotification.message}
        </p>
      </div>
    </div>
    {allNotification.status=='true'&&
    <div className="flex">
    


    <button className="flex-no-shrink bg-blue-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-blue-500 text-white rounded-full"
    onClick={() => gotoSendMessage(allNotification.senderProfile,allNotification.receiverIdProfile )}
    >
      Message
    </button>
    <button className="flex-no-shrink bg-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full">
      unConnect
    </button>
    </div>
    }


     
     {allNotification.status=="pending"&&allNotification.senderProfile.userId&&
    <div className="flex">
    


    {/* <button className="flex-no-shrink bg-blue-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-blue-500 text-white rounded-full">
    Requested
    </button> */}
    <button className="flex-no-shrink bg-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full"
    onClick={()=>acceptRequest(allNotification.senderId,allNotification.receiverId,allNotification.senderProfile._id,allNotification.receiverIdProfile)}
    >
      
      Accept
    </button>
    </div>
    }
    
      {allNotification.status=="pending"&&allNotification.receiverIdProfile.userId&&
    <div className="flex">
    


    <button className="flex-no-shrink bg-blue-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-blue-500 text-white rounded-full">
    Requested
    </button>
    
    </div>
    }
    
    {allNotification.status=='false'&&
    <div className="flex">
    


  
    <button className="flex-no-shrink bg-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full">
      connect
    </button>
    </div>
    }
    
    
  </div>

      
   
<br></br>
<hr></hr>
<br></br> 

</>
      )
})
}



{/* <div className="flex items-center justify-between" style={{ height: '50px',}}>
    <div className="flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 h-16 rounded-2xl p-3 border border-blue-100 text-blue-400 bg-blue-50"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <div className="flex flex-col ml-3">
        <div className="font-medium leading-none">Delete Your Account?</div>
        <p className="text-sm text-gray-600 leading-none mt-1">
          By deleting your account you will lose all your data
        </p>
      </div>
    </div>
    <div className="flex">
    <button className="flex-no-shrink bg-blue-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-blue-500 text-white rounded-full">
      Message
    </button>
    <button className="flex-no-shrink bg-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full">
      Delete
    </button>
    </div>
  </div> */}


</div>


            </div>
        </div>
    )
}

export default NotificationList