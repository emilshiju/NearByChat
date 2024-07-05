import React, { useRef, useEffect, useState, useCallback } from "react";

import "./Home.css";

import SideBar from "../components/sideBar";
import { useNavigate, useParams } from "react-router-dom";
import CustomMarks from "../components/slider";
import { ThemeContext } from "../context/createContext";
import { useContext } from "react";
import api from "../route/interceptors";
import { useSelector } from "react-redux";
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

let accessToken =
  "pk.eyJ1IjoiZW1pbGxzaGlqdSIsImEiOiJjbHdkcXQwcXMwN2oyMmlxanpxeHV0MnpvIn0.RNUnWz60Xtvl26z65jOISw";
const Home = () => {

  const {status}=useParams()

  
  
  const userInfo = useSelector((state) => state.auth.userInfo);
  const { value } = useContext(ThemeContext);
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

  
  const handleSearch = () => {

    
   
    getProfile(userInfo._id)
    .then((res)=>{
      
    
      
    
      if(!res.status){
        Swal.fire("please submit your profile!");
      }

      if(res.status){



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
            
          
            
          })
          .catch((err)=>{
           console.log("error")
          })
        
    
          
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




  
  return (
    <div style={{position:"relative"}}>
     {newMessage&&<NewMessageNotificatoin  message={newMessage}   setIsOpen={setNewMessage} />}
      {notification&&<Notification   message={notification} onClose={closeNotification}  />}
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
      
      <SideBar />

     



      <div className="sidebar">
        Longitude: {viewState.longitude} | Latitude: {viewState.latitude} |
        Zoom: {viewState.zoom}
      </div>
      <div
        style={{
          height: "100vh",
          marginLeft: "290px",
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
