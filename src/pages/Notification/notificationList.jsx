import React, { useEffect, useState ,useContext} from "react";
import api from "../../route/interceptors";
import connection from "../../service/connection";
import { useSelector ,useDispatch } from "react-redux";
import Sidebar from "../../components/sideBar";
import { SocketContext, socket } from "../../context/socket";
import { useNavigate } from "react-router-dom";
import Notification from "../../components/notification";
import { Unconnect } from "../../service/crudConnections";
import NewMessageNotificatoin from "../../components/messageNotification";
import { removeUserCredential } from "../../store/authSlice";
import { SideBarContext } from "../../context/createContext";
import { responsiveContext } from "../../context/createContext";



const NotificationList = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [allNotification, setAllNotification] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [notification, setNotification] = useState(null);

  const closeNotification = () => {
    setNotification(null);
  };




  const fetch = () => {
    connection(userInfo._id).then((response) => {
      if (!response) {
        alert(" no notificaiton ");
      }
      setAllNotification(response);
    });
  };




  useEffect(() => {
    socket.emit("on", userInfo._id);

    fetch();

    socket.on("notification", (message) => {
      if (message) {
        setNotification(message);
        fetch();
      } else {
        fetch();
      }
    });

    return () => {
      socket.off("notification");
    };
  }, []);

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
    socket.on("updateConnectionStatus", () => {
      fetch();
    });
  }, [notification]);



  const acceptRequest = (senderId, receiverId) => {
    socket.emit("acceptedRequest", senderId, receiverId);
  };



  const unConnectReqeust = (delteSenderId, deleteReceiverId) => {
    socket.emit("unConnectUser", delteSenderId, deleteReceiverId);
  };



  const gotoSendMessage = (received) => {
    navigate(`/chatBox/${received}`);
  };



  const connectButton = (userName, senderId, receiverId) => {
    try {
      socket.emit("connectionRequested", userName, senderId, receiverId);
    } catch (error) {}
  };


  const [newMessage,setNewMessage]=useState(null)

 
  useEffect(()=>{
    socket.on('newMessageNotification',(response)=>{
     
      setNewMessage(response)
    })

    return ()=>{
      socket.off('newMessageNotification')
    }
  })


  const { open , setOpen }=useContext(SideBarContext)
  const {responsiveMd,setResponsiveMd}=useContext(responsiveContext)



  return (
    // <div>
    //   <Sidebar   current='Notification' />
    //   {notification && (
    //     <Notification message={notification} onClose={closeNotification} />
    //   )}
    //   {newMessage&&<NewMessageNotificatoin message={newMessage}   setIsOpen={setNewMessage}   />}

    //   <div style={{ marginLeft:open? "387px" :"250px"}}>
    //     <div
    //       className="flex flex-col p-8 bg-white shadow-md hover:shadow-lg rounded-2xl"
    //       style={{ marginTop: "60px", width: "1000px" }}
    //     >
    //       {allNotification &&
    //         allNotification.map((allNotification, b) => {
    //           return (
    //             <>
    //               {/* <NewMessageNotificatoin    /> */}
    //               <div
    //                 className="flex items-center justify-between"
    //                 style={{ height: "50px" }}
    //               >
    //                 <div className="flex items-center" >
    //                   <div className="relative w-14 h-14 rounded-full hover:bg-red-700 bg-gradient-to-r from-purple-400 via-blue-500 to-red-400">
    //                     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gray-200 rounded-full border-2 border-white">
    //                       {allNotification.receiverId.imageUrl && (
    //                         <img
    //                           key={b}
    //                           className="w-full h-full object-cover rounded-full"
    //                           src={allNotification.receiverId.imageUrl}
    //                           alt=""
    //                         />
    //                       )}
    //                       {allNotification.senderId.imageUrl && (
    //                         <img
    //                           key={b}
    //                           className="w-full h-full object-cover rounded-full"
    //                           src={allNotification.senderId.imageUrl}
    //                           alt=""
    //                         />
    //                       )}
    //                     </div>
    //                   </div>

    //                   <div className="flex flex-col ml-3">
    //                     <div className="font-medium leading-none">
    //                       {allNotification.receiverId.nickName
    //                         ? allNotification.receiverId.nickName
    //                         : allNotification.senderId.nickName}{" "}
    //                     </div>
    //                     <p className="text-sm text-gray-600 leading-none mt-1">
    //                       {/* {allNotification.message} */}
    //                     </p>
    //                   </div>
    //                 </div>
   
    //           {/* can send message */}
                    
    //                 {allNotification.senderId.connections &&
    //                   allNotification.senderId.connections.map((a, b) => {
    //                     const id = a.userId?.toString();
    //                     const receiverId =
    //                       allNotification.receiverId.toString();

    //                     if (id === receiverId && a.status === "true") {
    //                       return (
    //                         <div className="flex">
    //                           <button
    //                             className="flex-no-shrink bg-blue-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-blue-500 text-white rounded-full"
    //                             onClick={() =>
    //                               gotoSendMessage(allNotification.senderId?._id)
    //                             }
    //                           >
    //                             Message
    //                           </button>
    //                           <button
    //                             className="flex-no-shrink bg-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full
    // "
    //                             onClick={() =>
    //                               unConnectReqeust(
    //                                 userInfo._id,
    //                                 allNotification.senderId?._id
    //                               )
    //                             }
    //                           >
    //                             unConnect
    //                           </button>
    //                         </div>
    //                       );
    //                     }
    //                     return null; // Return null if the condition is not met
    //                   })}



    //                 {allNotification.receiverId.connections &&
    //                   allNotification.receiverId.connections.map((a, b) => {
    //                     // Convert both ObjectIds to strings for comparison
    //                     const id = a.userId?.toString();
    //                     const receiverId = allNotification.senderId.toString();

    //                     if (id === receiverId && a.status === "true") {
    //                       return (
    //                         <div className="flex">
    //                           <button
    //                             className="flex-no-shrink bg-blue-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-blue-500 text-white rounded-full"
    //                             onClick={() =>
    //                               gotoSendMessage(
    //                                 allNotification.receiverId?._id
    //                               )
    //                             }
    //                           >
    //                             Message
    //                           </button>
    //                           <button
    //                             className="flex-no-shrink bg-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full"
    //                             onClick={() =>
    //                               unConnectReqeust(
    //                                 userInfo._id,
    //                                 allNotification.receiverId?._id
    //                               )
    //                             }
    //                           >
    //                             unConnect
    //                           </button>
    //                         </div>
    //                       );
    //                     }
    //                     return null; // Return null if the condition is not met
    //                   })}



    //                   {/* connection request to user */}

    //                 {allNotification.senderId.connections &&
    //                   allNotification.senderId.connections.map((a, b) => {
    //                     // Convert both ObjectIds to strings for comparison
    //                     const id = a.userId?.toString();
    //                     const receiverId =
    //                       allNotification.receiverId.toString();

    //                     if (id === receiverId && a.status === "false") {
    //                       return (
    //                         <div className="flex">
    //                           <button
    //                             className="flex-no-shrink bg-blue-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-blue-500 text-white rounded-full"
    //                             onClick={() =>
    //                               connectButton(
    //                                 userInfo.userName,
    //                                 userInfo._id,
    //                                 allNotification?.senderId?._id
    //                               )
    //                             }
    //                           >
    //                             Connect
    //                           </button>
    //                         </div>
    //                       );
    //                     }
    //                     return null; // Return null if the condition is not met
    //                   })}

    //                 {allNotification.receiverId.connections &&
    //                   allNotification.receiverId.connections.map((a, b) => {
    //                     // Convert both ObjectIds to strings for comparison
    //                     const id = a.userId?.toString();
    //                     const receiverId = allNotification.senderId.toString();
                        
    //                     if (id === receiverId && a.status === "false") {
    //                       return (
    //                         <div className="flex">
    //                           <button
    //                             className="flex-no-shrink bg-blue-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-blue-500 text-white rounded-full"
    //                             onClick={() =>
    //                               connectButton(
    //                                 userInfo.userName,
    //                                 receiverId,
    //                                 allNotification.receiverId._id
    //                               )
    //                             }
    //                           >
    //                             Connect
    //                           </button>
    //                         </div>
    //                       );
    //                     }
    //                     return null; // Return null if the condition is not met
    //                   })}


    //                   {/* accpt the user request */}


    //                 {allNotification.senderId.connections &&
    //                   allNotification.senderId.connections.map((a, b) => {
    //                     // Convert both ObjectIds to strings for comparison
    //                     const id = a.userId?.toString();
    //                     const receiverId =
    //                       allNotification.receiverId.toString();

    //                     if (id === receiverId && a.status == "pending") {
    //                       console.log("aceeepttt");
    //                       console.log(id);
    //                       return (
    //                         <div key={b} className="flex">
    //                           <button
    //                             className="flex-no-shrink bg-blue-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-blue-500 text-white rounded-full"
    //                             onClick={() =>
    //                               acceptRequest(
    //                                 allNotification.senderId?._id,
    //                                 allNotification.receiverId
    //                               )
    //                             }
    //                           >
    //                             Accept
    //                           </button>
    //                         </div>
    //                       );
    //                     }
    //                     return null; // Return null if the condition is not met
    //                   })}


    //                   {/* requests for accept */}



    //                 {allNotification.receiverId.connections &&
    //                   allNotification.receiverId.connections.map((a, b) => {
    //                     // Convert both ObjectIds to strings for comparison
    //                     const id = a.userId?.toString();
    //                     const receiverId = allNotification.senderId.toString();

    //                     if (id === receiverId && a.status == "Accept") {
    //                       return (
    //                         <div key={b} className="flex">
    //                           <button className="flex-no-shrink bg-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full">
    //                             Requested
    //                           </button>
    //                         </div>
    //                       );
    //                     }
    //                     return null; // Return null if the condition is not met
    //                   })}

                   
    //               </div>

    //               <br></br>
    //               <hr></hr>
    //               <br></br>
    //             </>
    //           );
    //         })}

    //     </div>
    //   </div>
    // </div>

    <div>
    <Sidebar current="Notification" />
    {notification && (
      <Notification message={notification} onClose={closeNotification} />
    )}
    {newMessage && (
      <NewMessageNotificatoin
        message={newMessage}
        setIsOpen={setNewMessage}
      />
    )}
  
    <div
      className={`transition-all duration-300 ${
        open ? "ml-[387px]" : "ml-0"
      } flex justify-center`}
    >
      <div className="flex flex-col p-8 bg-white shadow-md hover:shadow-lg rounded-2xl w-full max-w-4xl mt-16">
        {allNotification &&
          allNotification.map((allNotification, b) => (
            <React.Fragment key={b}>
              <div className="flex items-center justify-between h-14">
                <div className="flex items-center">
                  <div className="relative w-14 h-14 rounded-full bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 hover:bg-red-700">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gray-200 rounded-full border-2 border-white">
                      {allNotification.receiverId.imageUrl && (
                        <img
                          className="w-full h-full object-cover rounded-full"
                          src={allNotification.receiverId.imageUrl}
                          alt=""
                        />
                      )}
                      {allNotification.senderId.imageUrl && (
                        <img
                          className="w-full h-full object-cover rounded-full"
                          src={allNotification.senderId.imageUrl}
                          alt=""
                        />
                      )}
                    </div>
                  </div>
  
                  <div className="flex flex-col ml-3">
                    <div className="font-medium leading-none">
                      {allNotification.receiverId.nickName ||
                        allNotification.senderId.nickName}
                    </div>
                    <p className="text-sm text-gray-600 leading-none mt-1">
                      {/* {allNotification.message} */}
                    </p>
                  </div>
                </div>
  
                {/* Conditional buttons */}
                <div className="flex space-x-2 ml-5">
                  {allNotification.senderId.connections &&
                    allNotification.senderId.connections.map((a, b) => {
                      const id = a.userId?.toString();
                      const receiverId = allNotification.receiverId.toString();
  
                      if (id === receiverId && a.status === "true") {
                        return (
                          <React.Fragment key={b}>
                            <button
                              className="bg-blue-500 px-1 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-blue-500 text-white rounded-full"
                              onClick={() =>
                                gotoSendMessage(allNotification.senderId?._id)
                              }
                            >
                              Message
                            </button>
                            <button
                              className="bg-red-500 px-5 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full"
                              onClick={() =>
                                unConnectReqeust(
                                  userInfo._id,
                                  allNotification.senderId?._id
                                )
                              }
                            >
                              unConnect
                            </button>
                          </React.Fragment>
                        );
                      }
                      return null;
                    })}
  
                  {allNotification.receiverId.connections &&
                    allNotification.receiverId.connections.map((a, b) => {
                      const id = a.userId?.toString();
                      const receiverId = allNotification.senderId.toString();
  
                      if (id === receiverId && a.status === "true") {
                        return (
                          <React.Fragment key={b}>
                            <button
                              className="bg-blue-500 px-5 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-blue-500 text-white rounded-full"
                              onClick={() =>
                                gotoSendMessage(
                                  allNotification.receiverId?._id
                                )
                              }
                            >
                              Message
                            </button>
                            <button
                              className="bg-red-500 px-5 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full"
                              onClick={() =>
                                unConnectReqeust(
                                  userInfo._id,
                                  allNotification.receiverId?._id
                                )
                              }
                            >
                              unConnect
                            </button>
                          </React.Fragment>
                        );
                      }
                      return null;
                    })}
  
  
  
  
  {allNotification.senderId.connections &&
                        allNotification.senderId.connections.map((a, b) => {
                          // Convert both ObjectIds to strings for comparison
                          const id = a.userId?.toString();
                          const receiverId =
                            allNotification.receiverId.toString();
  
                          if (id === receiverId && a.status === "false") {
                            return (
                              <div className="flex">
                                <button
                                  className="flex-no-shrink bg-blue-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-blue-500 text-white rounded-full"
                                  onClick={() =>
                                    connectButton(
                                      userInfo.userName,
                                      userInfo._id,
                                      allNotification?.senderId?._id
                                    )
                                  }
                                >
                                  Connect
                                </button>
                              </div>
                            );
                          }
                          return null; // Return null if the condition is not met
                        })}
  
  
  
  
  
  {allNotification.receiverId.connections &&
                        allNotification.receiverId.connections.map((a, b) => {
                          // Convert both ObjectIds to strings for comparison
                          const id = a.userId?.toString();
                          const receiverId = allNotification.senderId.toString();
                          
                          if (id === receiverId && a.status === "false") {
                            return (
                              <div className="flex">
                                <button
                                  className="flex-no-shrink bg-blue-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-blue-500 text-white rounded-full"
                                  onClick={() =>
                                    connectButton(
                                      userInfo.userName,
                                      receiverId,
                                      allNotification.receiverId._id
                                    )
                                  }
                                >
                                  Connect
                                </button>
                              </div>
                            );
                          }
                          return null; // Return null if the condition is not met
                        })}
  
  
                        {/* accpt the user request */}
  
  
                      {allNotification.senderId.connections &&
                        allNotification.senderId.connections.map((a, b) => {
                          // Convert both ObjectIds to strings for comparison
                          const id = a.userId?.toString();
                          const receiverId =
                            allNotification.receiverId.toString();
  
                          if (id === receiverId && a.status == "pending") {
                            console.log("aceeepttt");
                            console.log(id);
                            return (
                              <div key={b} className="flex">
                                <button
                                  className="flex-no-shrink bg-blue-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-blue-500 text-white rounded-full"
                                  onClick={() =>
                                    acceptRequest(
                                      allNotification.senderId?._id,
                                      allNotification.receiverId
                                    )
                                  }
                                >
                                  Accept
                                </button>
                              </div>
                            );
                          }
                          return null; // Return null if the condition is not met
                        })}
  
  
                        {/* requests for accept */}
  
  
  
                      {allNotification.receiverId.connections &&
                        allNotification.receiverId.connections.map((a, b) => {
                          // Convert both ObjectIds to strings for comparison
                          const id = a.userId?.toString();
                          const receiverId = allNotification.senderId.toString();
  
                          if (id === receiverId && a.status == "Accept") {
                            return (
                              <div key={b} className="flex">
                                <button className="flex-no-shrink bg-red-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 text-white rounded-full">
                                  Requested
                                </button>
                              </div>
                            );
                          }
                          return null; // Return null if the condition is not met
                        })}
  
                </div>
  
                {/* Other conditional buttons for connection status */}
              </div>
              <hr className="my-4" />
            </React.Fragment>
          ))}
      </div>
    </div>
  </div>
  );
};

export default NotificationList;
