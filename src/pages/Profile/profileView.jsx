import React ,{useEffect,useState,useContext} from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import Sidebar from '../../components/sideBar';
import { FaSpinner } from "react-icons/fa";
import getProfile from "../../service/getProfile";
import connection from "../../service/connection"
import { useSelector ,useDispatch} from "react-redux";
// import { Socket } from 'socket.io-client';
// import { socket } from '../../main';
import Notification from '../../components/notification';
import { SocketContext } from "../../context/socket";
import api from '../../route/interceptors';
import NewMessageNotificatoin from '../../components/messageNotification';
import { removeUserCredential } from '../../store/authSlice';

import { responsiveContext } from '../../context/createContext';
import { SideBarContext } from '../../context/createContext';

const profileView=()=>{
    const { receiverId } = useParams();
    const userInfo = useSelector((state) => state.auth.userInfo);
    const socket=useContext(SocketContext)

    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [nickName,setNickName]=useState('name')
    const [profession,setProfession]=useState('bio')
    const [bio,setBio]=useState('profession')
    const [image, setImage] = useState(false);
    const [userProfileId,setUserProfile]=useState(null)
    const [receiverProfileId,setReceiverId]=useState(null)
    const [userStatus,setUserStatus]=useState(false)
    const [profileImage,setProfileImage]=useState(null)




    useEffect(()=>{
      socket.on('blockedUser',()=>{
        alert('Your account has been blocked.');
        dispatch(removeUserCredential());
       
        navigate('/login');
      })
  
      return ()=>{
        socket.off('blockedUser')
      }
  
    })




    useEffect(() => {
        getProfile(receiverId).then((res) => {
          
          {console.log("responseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")}
          {console.log(res)}
          setReceiverId(res.response._id)

          
            setNickName(res.response.nickName);
          
         
            setBio(res.response.bio);
          
         
            setProfession(res.response.profession);
          
          setImage(res.response.imageUrl);

          setProfileImage(res.response.profileUrl)
          
        });
        // getProfile(userInfo._id).then((res)=>{
          
        //   setUserProfile(res.response._id)
        // })
        
      }, []);

      const [newMessage,setNewMessage]=useState(null)

 
      useEffect(()=>{
        socket.on('newMessageNotification',(response)=>{
       
          setNewMessage(response)
        })
    
        return ()=>{
          socket.off('newMessageNotification')
        }
      })





     
    const [notification,setNotification]=useState(null)
    const closeNotification = () => {
      setNotification(null);
    };
    

    const getConnectionStatus=()=>{


      api.get(`/checkConnectionStatus?userId=${userInfo._id}&id=${receiverId}`)
        .then((res)=>{
        
          setUserStatus(res.data.status)
         
        })


    }

      useEffect(()=>{
        socket.emit('on',(userInfo._id))

        getConnectionStatus()
      
        socket.on('notification', (message) => {
      
          console.log('Notification received:', message);
       
          setNotification(message)
         
          // alert('Notification: ' + message);
         });

         socket.on('updateConnectionStatus',()=>{
         
          getConnectionStatus()
         })

        return ()=>{
          socket.off('notification');
        }
      },[])

      useEffect(()=>{
        getConnectionStatus()
      },[notification])


      const connectButton=(userName,senderId,receiverId)=>{
       
        try{
    
          socket.emit('connectionRequested',userName,senderId,receiverId)
     
        }catch(error){
          alert(error)
        }
      
          
      }

      const messageButton=(received)=>{
        navigate(`/chatBox/${received}`)
      }

      

      const acceptRequest=(senderId,receiverId)=>{
        
        
    
        socket.emit('acceptedRequest',senderId,receiverId)
        // getConnectionStatus()
  
       }

     const gotoSendMessage=()=>{

      navigate(`/chatBox/${receiverId}`)
      
     }

     const { open , setOpen }=useContext(SideBarContext)
     const {responsiveMd,setResponsiveMd}=useContext(responsiveContext)
  
     
 
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.screen.width;
      const screenHeight = window.screen.height;

      if (screenWidth <= 915 && screenHeight <= 915) {
        setOpen(false);
        setResponsiveMd(false);
      } else {
        setOpen(true);
        setResponsiveMd(true);
      }

      console.log(screenHeight, screenWidth);
      console.log("=====================================================");
    };

    // Add event listener on mount
    window.addEventListener('resize', handleResize);

    // Call handleResize on initial render
    handleResize();

    // Remove event listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  

    return(
      <>
        {responsiveMd ?<div>
         {newMessage&&<NewMessageNotificatoin  message={newMessage}   setIsOpen={setNewMessage} />}
             <Sidebar   current='profileView' />
             {notification&&<Notification   message={notification} onClose={closeNotification}  />}
             <main
        className="bg-gray-100 bg-opacity-25"
        style={{ paddingLeft: "200px" }}
      >
        <div className="lg:w-8/12 lg:mx-auto mb-8">
          <header className="flex flex-wrap items-center p-4 md:py-8">
            <div className="md:w-3/12 md:ml-16">
           
              {image ? (
                      <img
                        className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                        src={image}
                        alt="Bordered avatar"
                      />
                    ) : (
                      <div className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-black  flex items-center justify-center">
                        <FaSpinner className="animate-spin text-gray-600 dark:text-gray-400 text-4xl" />
                      </div>
                  
                    )}
            </div>

         
            <div className="w-8/12 md:w-7/12 ml-4">
              <div className="md:flex md:flex-wrap md:items-center mb-4">
              
                <input
                  type="text"
                  className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0"
                  value={nickName}
           
                />

              
              </div>

             
              <ul className="hidden md:flex space-x-8 mb-4">
                <li>
                  <span className="font-semibold">136</span> posts
                </li>
              
                <li>
                  <span className="font-semibold">302</span> Connections
                </li>
              </ul>

          
              <div className="hidden md:block">
                <input
                  type="text"
                  className="font-semibold  mb-0 block"
                  value={nickName}
                 
                />
                <input
                  type="text"
                  className="mb-0 block"
                  value={profession}
                 
                />

                <input
                  type="text"
                  className="block"
                  value={bio}
              
                />

               
              </div>
            </div>

       
            <div className="md:hidden text-sm my-2">
              <h1 className="font-semibold">Mr Travlerrr...</h1>
              <span>Travel, Nature and Music</span>
              <p>Lorem ipsum dolor sit amet consectetur</p>
            </div>
          </header>

          <div style={{ paddingLeft: "320px" }}>


     {userStatus&&userStatus?.status == 'false'&&
            <button
              
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              onClick={()=>connectButton(userInfo.userName,userInfo._id,receiverId)}
            >
              Connect
            </button>
             }

{userStatus&&userStatus?.status == 'Accept'&&
            <button
              
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              onClick={()=>acceptRequest( receiverId,userInfo._id)}
            >
              Accept
            </button>
             }


{userStatus&&userStatus == 'false'&&
            <button
              
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              onClick={()=>connectButton(userInfo.userName,userInfo._id,receiverId)}
            >
              Connect
            </button>
             }

             {userStatus&&userStatus?.status == 'pending'&&
              <button
                
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                
              >
                  Requested
              </button>
               }

{userStatus&&userStatus?.status == 'true'&&
              <button
                
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                onClick={gotoSendMessage}
              >
                  message
              </button>
               }


          </div>

         
          <br></br>

        



          
          <div className="px-px md:px-3">
           
          

            <ul className="flex items-center justify-around md:justify-center space-x-12 uppercase tracking-widest font-semibold text-xs text-gray-600 border-t">
              
              <li className="md:border-t md:border-gray-700 md:-mt-px md:text-gray-700">
                <a className="inline-block p-3" href="#">
                  <i className="fas fa-th-large text-xl md:text-xs"></i>
                  <span className="hidden md:inline">post</span>
                </a>
              </li>
            </ul>
        

            <div className="flex flex-wrap items-center max-w-4xl mx-auto p-4">
      {profileImage && profileImage.map((imageSrc, index) => (
        <div 
          key={index} 
          className="relative w-full md:w-1/3 p-2 overflow-hidden group"
        >
          <img
            className="w-full h-full aspect-square object-cover"
            src={imageSrc}
            alt="Profile Background"
          />
          <div className="overlay bg-gray-300 bg-opacity-50 w-full h-full absolute left-0 top-0 flex justify-center items-center space-x-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className=" flex items-center space-x-2 text-white cursor-pointer hover:bg-gray-700 rounded-full p-1" >
              <i className="fas fa-trash" onClick={()=>onChangedeleteImage(index)}></i>
            </span>
          </div>
        </div>
      ))}
    </div>



          
          </div>



        </div>
      </main>

        </div>:


















<div>
  {newMessage && <NewMessageNotification message={newMessage} setIsOpen={setNewMessage} />}
  <Sidebar current='profileView' />
  {notification && <Notification message={notification} onClose={closeNotification} />}
  <main className="bg-gray-100 bg-opacity-25 p-4 md:p-8">
    <div className="lg:w-8/12 lg:mx-auto mb-8">
      <header className="flex flex-wrap items-center p-4 md:py-8">
        <div className="w-1/3 md:w-1/4 lg:w-1/6 flex items-center justify-center mb-4 md:mb-0">
          {image ? (
            <img
              className="object-cover w-32 h-32 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
              src={image}
              alt="Bordered avatar"
            />
          ) : (
            <div className="object-cover w-32 h-32 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-black flex items-center justify-center">
              <FaSpinner className="animate-spin text-gray-600 dark:text-gray-400 text-4xl" />
            </div>
          )}
        </div>

        <div className="w-full md:w-2/3 lg:w-5/12 ml-4">
          <div className="flex flex-wrap items-center mb-4">
            <input
              type="text"
              className="text-2xl md:text-3xl font-light md:mr-2 mb-2 sm:mb-0"
              value={nickName}
            />
          </div>

          <ul className="hidden md:flex space-x-8 mb-4">
            <li><span className="font-semibold">136</span> posts</li>
            <li><span className="font-semibold">302</span> Connections</li>
          </ul>

          <div className="hidden md:block">
            <input
              type="text"
              className="font-semibold mb-1 block"
              value={nickName}
            />
            <input
              type="text"
              className="mb-1 block"
              value={profession}
            />
            <input
              type="text"
              className="block"
              value={bio}
            />
          </div>
        </div>

        <div className="md:hidden text-sm my-2">
          <h1 className="font-semibold">Mr Travlerrr...</h1>
          <span>Travel, Nature and Music</span>
          <p>Lorem ipsum dolor sit amet consectetur</p>
        </div>
      </header>

      <div className="flex flex-col items-center space-y-4 md:space-y-0 md:items-start">
        {userStatus && userStatus.status === 'false' && (
          <button
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            onClick={() => connectButton(userInfo.userName, userInfo._id, receiverId)}
          >
            Connect
          </button>
        )}

        {userStatus && userStatus.status === 'Accept' && (
          <button
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            onClick={() => acceptRequest(receiverId, userInfo._id)}
          >
            Accept
          </button>
        )}

        {userStatus && userStatus.status === 'pending' && (
          <button
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Requested
          </button>
        )}

        {userStatus && userStatus.status === 'true' && (
          <button
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            onClick={gotoSendMessage}
          >
            Message
          </button>
        )}
      </div>

      <br />

      <div className="px-2 md:px-3">
        <ul className="flex items-center justify-around md:justify-center space-x-8 md:space-x-12 uppercase tracking-widest font-semibold text-xs text-gray-600 border-t">
          <li className="md:border-t md:border-gray-700 md:-mt-px md:text-gray-700">
            <a className="inline-block p-3" href="#">
              <i className="fas fa-th-large text-xl md:text-xs"></i>
              <span className="hidden md:inline">Post</span>
            </a>
          </li>
        </ul>

        <div className="flex flex-wrap items-center max-w-4xl mx-auto p-4">
          {profileImage && profileImage.map((imageSrc, index) => (
            <div
              key={index}
              className="relative w-full md:w-1/3 p-2 overflow-hidden group"
            >
              <img
                className="w-full h-full aspect-square object-cover"
                src={imageSrc}
                alt="Profile Background"
              />
              <div className="overlay bg-gray-300 bg-opacity-50 w-full h-full absolute left-0 top-0 flex justify-center items-center space-x-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="flex items-center space-x-2 text-white cursor-pointer hover:bg-gray-700 rounded-full p-1">
                  <i className="fas fa-trash" onClick={() => onChangedeleteImage(index)}></i>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </main>
</div>

        }
</>
    )
}

export default profileView