import React, { useRef, useEffect, useState, useCallback } from "react";

import "./Home.css";

import SideBar from "../components/sideBar";
import { useNavigate, useParams } from "react-router-dom";
import CustomMarks from "../components/slider";
import { ThemeContext } from "../context/createContext";
import { useContext } from "react";
import api from "../route/interceptors";
import { useSelector ,useDispatch} from "react-redux";
import Button from "@mui/material/Button";
import locationIcon from "../assets/location.png";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import profileForm, { updateImageUrl } from "../service/profileForm";
import LocationPinAnimation from "../components/locationpinAnimation";
import locationPinAnimation from '../../locationPinAnimation.json';
import NewMessageNotificatoin from "../components/messageNotification";

import Map, {
  GeolocateControl,
  Marker,
  Popup,
  NavigationControl,
} from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import Swal from "sweetalert2";
import locationService from "../service/locationService";
import io from "socket.io-client";
import Lottie from 'lottie-react';
import getProfile from "../service/getProfile";

// export const socket = io("http://localhost:5000");
// import { socket } from '../main';
import Notification from "../components/notification";
import { SocketContext } from "../context/socket";
import { removeUserCredential } from "../store/authSlice";
import { regSw,subscribe } from "../serviceWorker";
// import { messaging ,getToken,onMessage} from "../firebase";
// import {  getToken ,onMessage,getMessaging} from "firebase/messaging";

import { onBackgroundMessage } from "firebase/messaging/sw";
import SearchSubscription from "../components/searchSubscription";
let accessToken =
  "pk.eyJ1IjoiZW1pbGxzaGlqdSIsImEiOiJjbHdkcXQwcXMwN2oyMmlxanpxeHV0MnpvIn0.RNUnWz60Xtvl26z65jOISw";




import { SideBarContext } from "../context/createContext";


  
const Home = () => {

  const {status}=useParams()
  const dispatch = useDispatch();

  
  
  const userInfo = useSelector((state) => state.auth.userInfo);
  const { value } = useContext(ThemeContext);
  const { open , setOpen }=useContext(SideBarContext)
  const socket=useContext(SocketContext)
  const navigate = useNavigate();

  const [isDisabled, setIsDisabled] = useState(false);
  const timeoutRef = useRef(null);

  const [userCoordinates,setuserCoordinates]=useState({longitude:76.2673041 ,latitude: 9.9312328})

  const [notification,setNotification]=useState(null)
  const closeNotification = () => {
    setNotification(null);
  };



  const [playAnimation, setPlayAnimation] = useState(false);
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setPlayAnimation(false);  
  //   }, 3000);

  //   return () => clearTimeout(timer);  
  // }, []);
  useEffect(()=>{
    

    socket.emit('on',userInfo._id)

    return ()=>{
      
    }
  })


  const handleVisibility = () => {
    setIsDisabled(true);
    timeoutRef.current = setTimeout(() => {
      setIsDisabled(false);
    }, 4000);
  };

  const loadingAnimation=()=>{
    setPlayAnimation(true)
   
  }



  useEffect(() => {
    handleVisibility()
    loadingAnimation()
    // profileForm(userInfo._id, userInfo.userName, "", "");
  }, []);

 

  useEffect(()=>{


  
    
    socket.on('blockedUser',()=>{
      alert('Your account has been blocked.')
      dispatch(removeUserCredential());
      navigate('/login');
     
    })

    return ()=>{
      socket.off("blockedUser")
    }
  },[])
   
  

  useEffect(() => {

      
    const userId = userInfo._id;
    const handleLocationUpdate = (position) => {
      const { latitude, longitude } = position.coords;
      const location = { latitude, longitude };
      setuserCoordinates({longitude,latitude})

      if(status){
       
     
        api.post('/saveLocation',{longitude,latitude,userId})
      }
      

      
      

      // socket.emit("locationUpdate", location, userId, value);
    };

    socket.on('notification', (message) => {
      
      console.log('Notification received:', message);
      setNotification(message)
      // alert('Notification: ' + message);
     });

    // Function to handle location errors
    const handleLocationError = (error) => {
      console.error("Error getting location:", error);
    };

    const watchId = navigator.geolocation.getCurrentPosition(
      handleLocationUpdate,
      handleLocationError
    );

    return ()=>{
      navigator.geolocation.clearWatch(watchId);
     
      socket.off('notification');
    
    }
  }, []);

  // useEffect(()=>{
  //   const userId = userInfo._id;
  //   let longitude=userCoordinates.longitude
  //   let latitude=userCoordinates.latitude
  //   alert(longitude,latitude)
  //   api.post('/saveLocation',{longitude,latitude,userId})

  // },[])

  

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(0);
  const [lat, setLat] = useState(0);
  const [zoom, setZoom] = useState(0);

  const [show, setShow] = useState(false);

  const [viewState, setViewState] = React.useState({
    longitude: 78.9629,
    latitude: 20.5937,
    zoom: 4,
  });

  const handleViewportChange = useCallback(
    (newViewport) => setViewState(newViewport),
    []
  );
  const zoomToLocation = (longitude, latitude) => {
    setViewState({
      ...viewState,
      latitude,
      longitude,
      zoom: 13, // Adjust zoom level as needed
    });
  };

  const [users, setUsers] = useState([]);
 
  const [fadeOut, setFadeOut] = useState(false);



  const [showSearchSubscription,setSearchSubscripton]=useState(null)



  
  const handleSearch = () => {

    
   
    getProfile(userInfo._id)
    .then((res)=>{
      
    
      
    
      if(!res.status){
        Swal.fire("please submit your profile!");
      }

      if(res.status){

      // handle paid search
      
      if(res.response.currSearch<=res.response.maxSearch){
         

        if (value == 0) {
      
          Swal.fire("please keep radius!");
        } else {
    
          setPlayAnimation(true);
        setFadeOut(false);
    
         
          handleVisibility()
         
         
    
        zoomToLocation(userCoordinates.longitude,userCoordinates.latitude)
    
       
         
          locationService(userInfo, value).then((data) => {
            // alert(data)
            let location = [];
            let profile = [];
            
    
            console.log(data);
            for (let i of data) {
              location.push({
                longitude: i.location.coordinates[0],
                latitude: i.location.coordinates[1],
                id: i.userId,
                imageUrl: i.userDetails.imageUrl,
              });
            }
         
           if(location.length==0){
            Swal.fire({
              title: "No One is there ",
              text: "Try after some time?",
              icon: "error"
            });
           }else{
            setUsers(location);
           }
            // setPlayAnimation(false)
            console.log("am location am locaiton am locaiotn ");
            



             // api for increment the currSearc (paid subscrition)

             api.patch('/incrementSearchCount',{id:userInfo._id})
            
          })
          .catch((err)=>{
           console.log("error")
          })
        
    
          
        }
       

      }else{

      

        // handle for paid search 
        setSearchSubscripton(true)
      }







        
      }
      
    })

    
    
    


    
  };



  function locationAccess() {
    //   const options = {
    //     enableHighAccuracy: true,
    //     timeout: 5000,
    //     maximumAge: 0,
    //   };
    // function sucess(position) {
    //   const latitude = position.coords.latitude;
    //   const longitude = position.coords.longitude;
    //   // api rqueste to server to ger users
    //   zoomToLocation(longitude, latitude);
    // handleSearch(longitude, latitude);
    //   // console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    //   // zoomToLocation( longitude, latitude)
    //   // setShow(true)
    //   // console.log("kast")
    // }
    // function error(error) {
    //   console.log(error);
    //   switch (error.code) {
    //     case error.PERMISSION_DENIED:
    //       Swal.fire("Please enable your location!");
    //       console.error("User denied the request for geolocation.");
    //       break;
    //     case error.POSITION_UNAVAILABLE:
    //       Swal.fire("Location information is unavailable.!");
    //       console.error("Location information is unavailable.");
    //       break;
    //     case error.TIMEOUT:
    //       Swal.fire("The request to get user location timed out.!");
    //       // console.error("The request to get user location timed out.");
    //       break;
    //     case error.UNKNOWN_ERROR:
    //       Swal.fire("An unknown error occurred.!");
    //       console.error("An unknown error occurred.");
    //       break;
    //   }
    // }
    // if ("geolocation" in navigator) {
    //   // Get the user's current location
    //   navigator.geolocation.getCurrentPosition(sucess, error, options);
    // } else {
    //   Swal.fire("oops!  Geolocation is not available in this browser.");
    //   console.error("Geolocation is not available in this browser.");
    // }
  }

  const [showPopup, setShowPopup] = useState(true);

  const changeMap = (evt) => {
    setViewState(evt.viewState);
    setShow(false);
  };

  let array = [
    {
      longitude: 76.2673045,
      latitude: 9.9312329,
    },
    // {
    //   longitude:76.2673049,
    //   latitude:9.9312323,
    // }
  ];

  const [marker, setMarker] = useState(false);
  const object = [
    { latitude: 37.7749, longitude: -122.4194 }, // Example marker 1
    { latitude: 34.0522, longitude: -118.2437 }, // Example marker 2
    // Add more markers as needed
  ];

  const redirect = (idUser) => {
    navigate(`/userView/${idUser}`);
  };
  


  // Trigger the fade-out effect after the animation completes
  useEffect(() => {
    if (playAnimation) {
      // Assuming the animation duration is 2 seconds (adjust accordingly)
      setTimeout(() => {
        setFadeOut(true);
      }, 1000);
    }
  }, [playAnimation]);




const [newMessage,setNewMessage]=useState(null)

 
  useEffect(()=>{
    socket.on('newMessageNotification',(response)=>{
     
      setNewMessage(response)
    })

    return ()=>{
      socket.off('newMessageNotification')
    }
  })




//servier worker api 


// Handle foreground messages



// onMessage(messaging, (payload) => {
//   alert("dsjhfdshf")
//   console.log('Message received in foreground:', payload);
//   // Customize the notification here if necessary
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     // icon: payload.notification.icon // Uncomment if you have an icon
//   };
  
 
// });





const [notificationShow,setShowNotification]=useState()



useEffect(()=>{


const storedSubscriptionJSON = localStorage.getItem('subscription');
if (storedSubscriptionJSON) {

  
  const storedSubscription = JSON.parse(storedSubscriptionJSON);
  console.log(storedSubscription);
  setShowNotification(true)
  
} else {
  setShowNotification(false)
  console.log('No subscription found in localStorage');
}

})


  // useEffect(() => {
  //   if ('serviceWorker' in navigator) {
  //     navigator.serviceWorker.register('firebase-messaging-sw.js')
  //       .then((registration) => {
  //         console.log('Service Worker registered with scope:', registration.scope);

  //         // After service worker is registered, request notification permission
  //         // requestNotificationPermission();
  //       }).catch((err) => {
  //         console.log('Service Worker registration failed:', err);
  //       });
  //   }
  // }, []);





  
  
  

    const registerAndSubscribe=async()=>{

    
   

//       try{
       
// // const serviceWorkerReg=await regSw()
// // console.log(serviceWorkerReg)

// let url='/firebase-messaging-sw.js'
// await navigator.serviceWorker.register(url,{
//   scope:"/"
// })
 
  


// console.log("ppp")
//   //  let value=  await  subscribe(serviceWorkerReg)
//    console.log("Kkk")
// let currentToken =await getToken(messaging,{vapidKey:"BNpMIfIwkjf6pAglhLNan1__wNS8dFvdiDNDzK7A69E6Fol9fhzV-uqJ7lY-bQQ6mjktLg9Jig0SPwGm52_V4OI"})


//   // let topic='all'


//   // let ress=await getMessaging().subscribeToTopic(currentToken, topic)

  

// console.log("scondtoken ")
// console.log(currentToken)

  


//  api.post('/storePushNotification',{currentToken})
//  console.log("tokennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")


// }catch(error){

//   console.log("erorrrrrrrrrrrrrrrrrrrrrrrrrrrr ibn  browser browser browser")
//   console.log(error)
// }

async function subscribe(serviceWorkerReg) {
  try {
    let subscription = await serviceWorkerReg.pushManager.getSubscription();
    if (!subscription) {
      subscription = await serviceWorkerReg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: 'BMdNWN2lmEXF2F9cjH-zOOA-7ugTGloANQyN5i1w3Pw3hVvyOsjdKPTiGBkWET93CLcO8ix_mZFWJUpPBOI3dbM',
      });

      // Convert subscription object to JSON string
const subscriptionJSON = JSON.stringify(subscription);

// Store subscription in localStorage
localStorage.setItem('subscription', subscriptionJSON);

  setShowNotification(true)

      const res = await api.post('/storePushNotification',{subscription})
      console.log(res,"_______") // Send the subscription object to the server
    }
    console.log({ subscription });
    return subscription;
  } catch (e) {
    console.log(e)
  }
}


try {
  const url = '/sw.js'; 
  const reg = await navigator.serviceWorker.register(url,{
    scope:"/"
  });
  console.log('Service worker registered:', reg);
  await navigator.serviceWorker.ready;
  console.log('Service worker is active');

  await subscribe(reg);
} catch (error) {
  console.error('Service worker registration failed:', error);
}


  
    }

    


    const UnsubscribeNotification=()=>{


      
         const storedSubscriptionJSON = localStorage.getItem('subscription');
         if (storedSubscriptionJSON) {
            localStorage.removeItem('subscription');
            setShowNotification(false)
           } 
          



        navigator.serviceWorker.ready.then((reg) => {
          reg.pushManager.getSubscription().then((subscription) => {
            subscription
              .unsubscribe()
              .then((successful) => {
                // You've successfully unsubscribed
                api.post('/UnsubscribeNotification',{subscription})

            
              })
              .catch((e) => {
                // Unsubscribing failed
              });
          });
        });

        

      // navigator.serviceWorker.ready.then((reg) => {
      //   reg.pushManager.getSubscription().then((subscription) => {
      //     subscription

      //     console.log("currrrrrrrrrrrrrrrrrrrentttttttttttttttttttttttttt")
      //     .then((subscription) => {
      //       if (subscription) {
      //         // Log current subscription for debugging
      //         console.log("Current subscription:", subscription);
      
      //         // Perform unsubscribe action
      //         return subscription.unsubscribe();
      //       } else {
      //         console.log("No subscription found.");
      //         throw new Error("No subscription available to unsubscribe.");
      //       }
      //     })
      //     .then((successful) => {
      //       // Handle successful unsubscription
      //       console.log("Unsubscribed successfully:", successful);
      //       alert("Successfully unsubscribed.");
      //     })


      //     // .unsubscribe()
      //     // .then((successful) => {
      //     //   // You've successfully unsubscribed
      //     //   alert("clean")
      //     // })
      //     // .catch((e) => {
      //     //   // Unsubscribing failed
      //     // });

      //     api.post('/UnsubscribeNotification',{subscription})
      //     .then((res)=>{

            
          



      //     })

      
           
      //   });
      // });

      

    }



   
const closethesubscription=()=>{

  setSearchSubscripton(false)

}


const showSubscriptionFinishMessage=()=>{

  setSearchSubscripton(false)
  Swal.fire("subscription is over");
}
  
  return (
    <div style={{position:"relative"}}>
     {newMessage&&!newMessage.currentStatus&&<NewMessageNotificatoin  message={newMessage}   setIsOpen={setNewMessage} />}
      {notification&&<Notification   message={notification} onClose={closeNotification}  />}
      {showSearchSubscription&&<SearchSubscription  onClose={closethesubscription}  SubscriptionFinishMessage={showSubscriptionFinishMessage}/>}
      {playAnimation && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            width: '300px',
            height: '400px',
            opacity: fadeOut ? 0 : 1,
            transition: 'opacity 2s', // Adjust the duration as needed
          }}
          onTransitionEnd={() => setPlayAnimation(false)} // Cleanup after transition
        >
          <Lottie
            animationData={locationPinAnimation}
            loop={false}
            autoplay={playAnimation}
          />
        </div>
      )}
      
      <SideBar  current={'Home'} />
            
            <div   className="absolute z-10 flex justify-end right-0 mt-4">

            {!notificationShow&&<button className="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2" onClick={registerAndSubscribe}>
      <svg className="w-4 h-4 me-2 -ms-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="paypal" role="img">
        <path fill="currentColor" d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4 .7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9 .7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"></path>
      </svg>
      Allow Notifiation 
    </button>}


    {notificationShow&&<button className="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2" onClick={UnsubscribeNotification}>
      <svg className="w-4 h-4 me-2 -ms-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="paypal" role="img">
        <path fill="currentColor" d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4 .7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9 .7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"></path>
      </svg>
      Unsubscribe Notifiation 
    </button>}
            </div>
     



      <div className="sidebar">
        Longitude: {viewState.longitude} | Latitude: {viewState.latitude} |
        Zoom: {viewState.zoom}
      </div>
      <div
        style={{
          height: "100vh",
        
          marginLeft: open ? "290px" : "90px",
          // marginLeft: "290px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Map
          {...viewState}
          width="100%"
          height="100%"
          mapStyle="mapbox://styles/mapbox/streets-v11"
          projection="globe"
          onViewportChange={handleViewportChange}
          mapboxAccessToken={accessToken}
          onMove={changeMap}
          onLoad={()=>setPlayAnimation(false)}
          //  onMove={evt => setViewState(evt.viewState)}
        >
          <Box
            sx={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "4px",
              top: "100px",
              left: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              width: "320px",
              height: "80px",
              position: "absolute",
            }}
          >
            
            <CustomMarks />
          </Box>
          {/* <Button sx={{left:'20px',top:'195px'}}  onClick={() => zoomToLocation( 15.22407165006257, 10.379184809701314)}>Zoom to Location</Button> */}
          <Button
            variant="contained"
            sx={{ left: "30px", top: "195px" }}
            disabled={isDisabled}
            onClick={handleSearch}
          >
            Search{" "}
          </Button>
          {/* {object.map((count, index) => {
            <Marker
              key={index}
              longitude={count.longitude}
              latitude={count.latitude}
            >
              <img
                src={locationIcon}
                alt="Marker"
                style={{ width: "40px", height: "40px" }}
              />
            </Marker>;
          })} */}
          {console.log(
            "Ppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp"
          )}
          {users && console.log(users)}
          {users &&
            users.map((marker, index) => (
              <Marker
                key={index}
                latitude={marker.latitude}
                longitude={marker.longitude}
              >
                <img
                  className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                  style={{ width: "40px", height: "40px" }}
                  src={marker.imageUrl}
                  alt="Bordered avatar"
                  onClick={() => redirect(marker.id)}
                />
              

                {/* <img
                  src={locationIcon}
                  alt="Marker"
                  style={{ width: "40px", height: "40px" }}
                /> */}
                {/* {console.log(marker)} */}
                
              </Marker>
              
            ))}
          {/* <NavigationControl /> */}
          {/* {showPopup && (
      <Popup longitude={10.205309505489396} latitude={-1.8900225307315281}
        anchor="bottom"
        onClose={() => setShowPopup(false)}>
        You are here
      </Popup>)} */}
                     {" "}
        </Map>
             {" "}
      </div>
         {" "}
    </div>
  );
};

export default Home;
