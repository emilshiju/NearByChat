import ImageEditor from "../../components/ImageEditor";
import SideBar from "../../components/sideBar";
import UploadImage from "../../service/cloudinaryService";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { useEffect,useContext ,useRef, useId} from "react";
import getProfile from "../../service/getProfile";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import NewMessageNotificatoin from "../../components/messageNotification";
import { SocketContext } from "../../context/socket";
import { removeUserCredential } from "../../store/authSlice";
import { SideBarContext } from "../../context/createContext";
import { responsiveContext } from "../../context/createContext";
import '@fortawesome/fontawesome-free/css/all.min.css'; 

import AddIcon from '@mui/icons-material/Add';

import { getStorage, ref, uploadBytes , getDownloadURL  } from "firebase/storage";
import { storage } from "../../firebase";
import api from "../../route/interceptors";

import Swal from 'sweetalert2';

const Profile = () => {

  const socket=useContext(SocketContext)


  const userInfo = useSelector((state) => state.auth.userInfo);
  const userName = useSelector((state) => state.auth.userInfo.userName);
  const userId = userInfo._id;
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [nickName, setNickName] = useState(userName);
  const [profession, setProfession] = useState("profession");
  const [bio, setBio] = useState("bio");
  const [image, setImage] = useState(false);
  const [profileImage,setProfileImage]=useState(null)




  const fetchProfile = async () => {
    try {
      const res = await getProfile(userId);
    
      if (res.status) {
        setNickName(res.response.nickName);

        setBio(res.response.bio);

        setProfession(res.response.profession);

        setImage(res.response.imageUrl)

        {console.log("resssssssssssssssssssss useriddddddddddddddddddddddddddddddddddddddddddd")}
        {console.log(res.response.profileUrl)}
        setProfileImage(res.response.profileUrl)
      }else{
        setImage('https://res.cloudinary.com/dwqtoz0ig/image/upload/v1717488014/nearbychat/gsu4hmgkwyy286tmq1wp.png')
      }
    } catch (error) {
      console.error("Failed to fetch profile", error);
    }
  };



  useEffect(() => {
    

    fetchProfile();
    return () => {};
  }, []);

  const nickNameChange = (e) => {
    setNickName(e.target.value);
  };

  const profesionChange = (e) => {
    setProfession(e.target.value);
  };
  const bioChange = (e) => {
    setBio(e.target.value);
  };

  const gotoedit = () => {
    navigate("/editProfile");
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


  const  inputChange=useRef(null)

  const onChangeUploadImage=()=>{

    if (inputChange.current) {
      inputChange.current.click(); // Programmatically trigger the click event
    }


  }


  const [imageFile,setImageFile]=useState(false)
  const [imagePreview,setImagePrev]=useState(false)
  const [isModalOpen,setIsModalOpen]=useState(false)
  const [loading,isLoading]=useState(false)


  const onCloseModalOpen=()=>{
    setIsModalOpen(false)
    setImagePrev(null)
    setImageFile(null)

  }


  const handleFileChange=(e)=>{
    let file= e.target.files[0];
    setImageFile(file)

   const url= URL.createObjectURL(file)
   setImagePrev(url)
   setIsModalOpen(true)


  }


const onChangeUploadImageToFirebase=()=>{

  isLoading(true)


    const storageRef = ref(storage,imageFile.name);

      uploadBytes(storageRef,imageFile).then((snapshot) => {
        console.log('Uploaded a blob or file!');

        getDownloadURL(snapshot.ref).then((downloadURL)=>{
          console.log("downnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnloaddddddddddddddurllllllllllllllllllllll")
          console.log(downloadURL)

          api.patch('/uploadUserProfileImage',{imageUrl:downloadURL,userId})
          .then((res)=>{
            if(res.data.status){
              isLoading(false)
              onCloseModalOpen()
              fetchProfile()
            }

          })
         

          

        })

      });

    }


    const onChangedeleteImage=(index)=>{



      Swal.fire({
        title: 'Are you sure?',
        text: 'This action cannot be undone.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
      

      api.post('/deleteProfileImage',{userId,index})
      .then((res)=>{

        if(res.data.status){
        fetchProfile()
        }

      })
    
      

    }

  })
  }
  

  return (
    <div class="component-background-black">
      {newMessage&&!newMessage.currentStatus&&<NewMessageNotificatoin  message={newMessage}   setIsOpen={setNewMessage} />}
      <SideBar current='Profile' />

      <br></br>

      <main
        className="bg-gray-100 bg-opacity-25"
        style={{ paddingLeft: open ? "200px" :"60px" }}
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




            {responsiveMd ? <div className="w-8/12 md:w-7/12 ml-4" >
              <div className="md:flex md:flex-wrap md:items-center mb-4">
                <input
                  type="text"
                  className="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0"
                  value={nickName}
                  onChange={nickNameChange}
                />

                {/* <span
                  className="inline-block fas fa-certificate fa-lg text-blue-500 relative mr-6 text-xl transform -translate-y-2"
                  aria-hidden="true"
                >
                  <i className="fas fa-check text-white text-xs absolute inset-x-0 ml-1 mt-px"></i>
                </span> */}
              </div>

             

              <div className="hidden md:block">
                <input
                  type="text"
                  className="font-semibold  mb-0 block"
                  value={nickName}
                  onChange={nickNameChange}
                />
                <input
                  type="text"
                  className="mb-0 block"
                  value={profession}
                  onChange={profesionChange}
                />

                <input
                  type="text"
                  className="block"
                  value={bio}
                  onChange={bioChange}
                />
              </div>
            </div>:
           <div className="w-full max-w-screen-lg mx-auto px-4">
           <div className="flex flex-col md:flex-row md:items-center mb-4">
             <input
               type="text"
               className="text-3xl font-light mb-2 md:mr-2 md:mb-0 w-full md:w-auto"
               value={nickName}
               onChange={nickNameChange}
               placeholder="Nickname"
             />
         
             {/* <span
               className="inline-block fas fa-certificate fa-lg text-blue-500 relative mr-6 text-xl transform -translate-y-2"
               aria-hidden="true"
             >
               <i className="fas fa-check text-white text-xs absolute inset-x-0 ml-1 mt-px"></i>
             </span> */}
           </div>
         
           <div className="md:hidden mb-4">
             <input
               type="text"
               className="font-semibold w-full mb-2"
               value={nickName}
               onChange={nickNameChange}
               placeholder="Nickname"
             />
             <input
               type="text"
               className="w-full mb-2"
               value={profession}
               onChange={profesionChange}
               placeholder="Profession"
             />
             <input
               type="text"
               className="w-full"
               value={bio}
               onChange={bioChange}
               placeholder="Bio"
             />
           </div>
         
           <div className="hidden md:block">
             <input
               type="text"
               className="font-semibold mb-2 w-full"
               value={nickName}
               onChange={nickNameChange}
               placeholder="Nickname"
             />
             <input
               type="text"
               className="mb-2 w-full"
               value={profession}
               onChange={profesionChange}
               placeholder="Profession"
             />
             <input
               type="text"
               className="w-full"
               value={bio}
               onChange={bioChange}
               placeholder="Bio"
             />
           </div>
         </div>
         
          }

            
          </header>


          

          <div style={{ paddingLeft: responsiveMd? "310px": "20px" }}>
            <button
              onClick={gotoedit}
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Edit Profile
            </button>
          </div>

          <br></br>


          {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
            {/* Close and Upload Buttons */}
            <button
              className="absolute top-2 right-12 bg-gray-200 p-1 rounded-full text-gray-500 hover:bg-gray-300"
              onClick={onChangeUploadImageToFirebase}
            >
             {!loading&&<i className="fas fa-upload text-xl"></i>}
              {loading&&<i className="fas fa-spinner fa-spin text-xl"></i>}
            </button>
            <button
              className="absolute top-2 right-2 bg-gray-200 p-1 rounded-full text-gray-500 hover:bg-gray-300"
              onClick={onCloseModalOpen}
            >
              &times;
            </button>
            <div className="w-full h-64 overflow-hidden rounded-lg">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}





          <div className="px-px md:px-3">
            {" "}
           
            <ul className="flex items-center justify-around md:justify-center space-x-12 uppercase tracking-widest font-semibold text-xs text-gray-600 border-t">
              <li className="md:border-t md:border-gray-700 md:-mt-px md:text-gray-700">
                <a className="inline-block p-3" href="#">
                  <i className="fas fa-th-large text-xl md:text-xs"></i>
                  <span className="hidden md:inline">post</span>
                </a>
              </li>
              <div className="ml-[800px]" onClick={onChangeUploadImage}  > <AddIcon  /></div>
              <input type="file"  style={{ display: "none" }} ref={inputChange} onChange={handleFileChange} ></input>
            </ul>
            


          </div>



          {/* <div className="flex flex-wrap items-center max-w-4xl mx-auto p-4">
  {profileImage && profileImage.map((a, b) => (
    <div 
      key={b} 
      className="w-full md:w-1/3 p-2 overflow-hidden"
    >
      <img
        className="w-full h-full aspect-square object-cover"
        src={a}
        alt="Profile Background"
      />
      <div class="overlay bg-gray-800 bg-opacity-50 w-full h-full absolute 
                    left-0 top-0 flex justify-center items-center space-x-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <span class="p-2 flex items-center space-x-2">
          <i class="fas fa-heart"></i>
          <span>412K</span>
        </span>

        <span class="p-2 flex items-center space-x-2">
          <i class="fas fa-comment"></i>
          <span>2,909</span>
        </span>
      </div>
    </div>
  ))}
</div> */}

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
      </main>
    </div>
  );
};

export default Profile;
