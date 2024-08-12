import SideBar from "../../components/sideBar";

// import { Button, Modal } from "flowbite-react";
import React, { useEffect, useRef, useState ,useContext} from "react";
import { useSelector ,useDispatch} from "react-redux";

import UploadImage from "../../service/cloudinaryService";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import { Alert } from "@material-tailwind/react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px ",
  boxShadow: 24,
  p: 4,
  borderRadius: 6,
};
import { FaSpinner } from "react-icons/fa";
import profileForm, { updateImageUrl } from "../../service/profileForm";
import getProfile from "../../service/getProfile";


import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { removeUserCredential } from "../../store/authSlice";

import { SocketContext } from "../../context/socket";

const ProfileEditUser = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  const userId=userInfo._id
  const socket=useContext(SocketContext)

  const [nickName,setNickName]=useState('')
  const [profession,setProfession]=useState('')
  const [bio,setBio]=useState('')
  const [image, setImage] = useState(false);

  const [imageUrl,setImageUrl]=useState()

  const showToastMessage = () => {
    toast.success("Success registered !", {
      position: "top-right",
      autoClose: 1000,
    })
  };



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



  useEffect(()=>{
    getProfile(userId)
    .then((res)=>{
   
      if(res.status) {
      setNickName(res.response.nickName)
      setBio(res.response.bio)
      setProfession(res.response.profession)
      setImage(res.response.imageUrl)
      }else{
      setImage('https://res.cloudinary.com/dwqtoz0ig/image/upload/v1717488014/nearbychat/gsu4hmgkwyy286tmq1wp.png')
      }
    })
  },[])

  const [open, setOpen] = useState(false);
  const fileInputRef = useRef(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [uploadUrl, setUploadUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();

  const handleChange = () => {
    fileInputRef.current.click();
  };

  
  const [path, setPath] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [makeChange, setMakeChange] = useState(false);

  const handleFileChange = (e) => {
    setOpen(false);
    const file = e.target.files[0];


    const maxSizeInBytes = 1 * 1024 * 1024; // 1 MB limit
           
    if (file.size > maxSizeInBytes) {
        alert("File size exceeds the limit (1 MB). Please select a smaller file.");
        // Optionally, reset the file input to clear the selected file
        e.target.value = null;
        return;
    }


    setPath(e.target.files[0]);
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
    setMakeChange(true);
    setPrevUrl(image);
    // setFileName(e.target.files[0].name);
  };
  const changeUrl = () => {
   
  

    const formData = new FormData();
    formData.append("image", path);
    UploadImage(formData)
    .then((data)=>{
      
      updateImageUrl(userId,data.url)
      .then((res)=>{

      })
    })

    setUploadUrl(image);
    setMakeChange(false);
    

    
  };
  const changePrevUrl = () => {
    setImage(prevUrl);
    setMakeChange(false);
  };
  
 
   const nickNameChange=(e)=>{
    setNickName(e.target.value)
   }

   const profesionChange=(e)=>{
    setProfession(e.target.value)
   }
   const bioChange=(e)=>{
    setBio(e.target.value)
   
   }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    
      
   let response=await profileForm(userId,nickName,bio,profession)

   if(response){
    showToastMessage()
   }


  }
  return (
    // <div>
    //   <ToastContainer />
    //   {makeChange && (
    //     <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
    //       <div className="relative max-w-sm p-4 text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
    //         <span className="font-medium">Alert!</span> Are you sure to Change.
    //         <button
    //           className="text-lg font-bold "
    //           style={{ paddingLeft: "2px" }}
    //           onClick={changeUrl}
    //         >
    //           Yes
    //         </button>
    //         <button
    //           style={{ paddingLeft: "6px" }}
    //           className="text-lg font-bold "
    //           onClick={changePrevUrl}
    //         >
    //           no
    //         </button>
    //       </div>
    //     </div>
    //   )}
    //   <SideBar  current='profileEdit' />

    //   {/* <Button onClick={handleOpen}>Open Modal</Button> */}

    //   <Modal
    //     open={open}
    //     onClose={handleClose}
    //     aria-labelledby="simple-modal-title"
    //     aria-describedby="simple-modal-description"
    //   >
    //     <Box sx={style}>
    //       <Typography id="simple-modal-title" variant="h6" component="h2">
    //         Change Profile Photo
    //       </Typography>
    //       <hr
    //         style={{
    //           border: "2px solid #000",
    //           width: "100%",
    //           marginTop: "8px",
    //           marginBottom: "8px",
    //         }}
    //       />
    //       <Typography sx={{ mt: 2 }} onClick={handleChange}>
    //         Upload Photo
    //       </Typography>
    //       <hr
    //         style={{
    //           border: "2px solid #000",
    //           width: "100%",
    //           marginTop: "8px",
    //           marginBottom: "8px",
    //         }}
    //       />
    //       <input
    //         type="file"
    //         id="fileInput"
    //         ref={fileInputRef}
    //         style={{ display: "none" }}
    //         onChange={handleFileChange}
    //         name="image"
    //       />
    //       <Typography sx={{ mt: 2 }}>Remove Photo</Typography>

    //       <hr
    //         style={{
    //           border: "2px solid #000",
    //           width: "100%",
    //           marginTop: "8px",
    //           marginBottom: "8px",
    //         }}
    //       />
    //       <Button onClick={handleClose} sx={{ mt: 2 }}>
    //         Close
    //       </Button>
    //     </Box>
    //   </Modal>

    //   <div style={{ marginLeft: "387px" }}>
    //     <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
    //       <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
    //         <div className="p-2 md:p-4">
    //           <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
    //             <h2 className="pl-6 text-2xl font-bold sm:text-xl">
    //               Edit Profile
    //             </h2>
    //             <div className="grid max-w-2xl mx-auto mt-8">
    //               <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
    //                 {image ? (
    //                   <img
    //                     className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
    //                     src={image}
    //                     alt="Bordered avatar"
    //                   />
    //                 ) : (
    //                   <div className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-black  flex items-center justify-center">
    //                     <FaSpinner className="animate-spin text-gray-600 dark:text-gray-400 text-4xl" />
    //                   </div>
    //                   // <img
    //                   //   className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
    //                   //   src={'https://res.cloudinary.com/dwqtoz0ig/image/upload/v1717488014/nearbychat/gsu4hmgkwyy286tmq1wp.png'}
    //                   //   alt="Bordered avatar"
    //                   // />
    //                 )}
    //                 <div className="flex flex-col space-y-5 sm:ml-8">
    //                   <button
    //                     type="button"
    //                     className="py-2.5  px-4 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-[20px] border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200"
    //                     onClick={handleOpen}
    //                   >
    //                     Change picture
    //                   </button>
                     
    //                 </div>
    //               </div>
    //               <div className="items-center mt-8 sm:mt-10 text-[#202142]">
    //                 <form  onSubmit={handleSubmit} >
    //                 <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
    //                   <div className="w-full">
    //                     <label
    //                       htmlFor="first_name"
    //                       className="block mb-2 text-sm font-medium text-indigo-900"
    //                     >
    //                       Nick name
    //                     </label>
    //                     <input
    //                       type="text"
    //                       id="first_name"
    //                       className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
    //                       placeholder="Your Nick name"
    //                       value={nickName}
    //                       onChange={nickNameChange}
    //                       required
    //                     />
    //                   </div>
                    
    //                 </div>
                   
    //                 <div className="mb-2 sm:mb-6">
    //                   <label
    //                     htmlFor="profession"
    //                     className="block mb-2 text-sm font-medium text-indigo-900"
    //                   >
    //                     Profession
    //                   </label>
    //                   <input
    //                     type="text"
    //                     id="profession"
    //                     className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
    //                     placeholder="your profession"
    //                     onChange={profesionChange}
    //                     value={profession}
    //                     required
    //                   />
    //                 </div>
    //                 <div className="mb-6">
    //                   <label
    //                     htmlFor="message"
    //                     className="block mb-2 text-sm font-medium text-indigo-900 "
    //                   >
    //                     Bio
    //                   </label>
    //                   <textarea
    //                     id="message"
    //                     rows="4"
    //                     className="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
    //                     placeholder="Write your bio here..."
    //                     onChange={bioChange}
    //                     value={bio}
    //                     required
    //                   ></textarea>
    //                 </div>
    //                 <div className="flex justify-end">
    //                   <button
    //                     type="submit"
    //                     className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
    //                   >
    //                     Save
    //                   </button>
    //                 </div>
    //                 </form>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </main>
    //     </div>
    //   </div>

      
    // </div>

    <div className="relative">
  <ToastContainer />
  {makeChange && (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative max-w-sm p-4 text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300">
        <span className="font-medium">Alert!</span> Are you sure to Change.
        <button
          className="text-lg font-bold ml-2"
          onClick={changeUrl}
        >
          Yes
        </button>
        <button
          className="text-lg font-bold ml-4"
          onClick={changePrevUrl}
        >
          No
        </button>
      </div>
    </div>
  )}
  <SideBar current="profileEdit" />

  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
  >
    <Box sx={style}>
      <Typography id="simple-modal-title" variant="h6" component="h2">
        Change Profile Photo
      </Typography>
      <hr className="border-2 border-black my-2" />
      <Typography sx={{ mt: 2 }} onClick={handleChange}>
        Upload Photo
      </Typography>
      <hr className="border-2 border-black my-2" />
      <input
        type="file"
        id="fileInput"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        name="image"
      />
      <Typography sx={{ mt: 2 }}>Remove Photo</Typography>
      <hr className="border-2 border-black my-2" />
      <Button onClick={handleClose} sx={{ mt: 2 }}>
        Close
      </Button>
    </Box>
  </Modal>

  <div className="ml-0 md:ml-[150px] lg:ml-[387px]">
    <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-8 lg:px-16 xl:px-28 text-[#161931]">
      <main className="w-full min-h-screen py-1">
        <div className="p-2 md:p-4">
          <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
            <h2 className="pl-6 text-xl md:text-2xl font-bold">
              Edit Profile
            </h2>
            <div className="grid max-w-2xl mx-auto mt-8">
              <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                {image ? (
                  <img
                    className="object-cover w-32 h-32 sm:w-40 sm:h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                    src={image}
                    alt="Bordered avatar"
                  />
                ) : (
                  <div className="object-cover w-32 h-32 sm:w-40 sm:h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-black flex items-center justify-center">
                    <FaSpinner className="animate-spin text-gray-600 dark:text-gray-400 text-4xl" />
                  </div>
                )}
                <div className="flex flex-col space-y-5 sm:ml-8">
                  <button
                    type="button"
                    className="py-2.5 px-4 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-[20px] border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                    onClick={handleOpen}
                  >
                    Change picture
                  </button>
                </div>
              </div>
              <div className="items-center mt-8 sm:mt-10 text-[#202142]">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col items-center w-full mb-2 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                    <div className="w-full">
                      <label
                        htmlFor="first_name"
                        className="block mb-2 text-sm font-medium text-indigo-900"
                      >
                        Nick name
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                        placeholder="Your Nick name"
                        value={nickName}
                        onChange={nickNameChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-2 sm:mb-6">
                    <label
                      htmlFor="profession"
                      className="block mb-2 text-sm font-medium text-indigo-900"
                    >
                      Profession
                    </label>
                    <input
                      type="text"
                      id="profession"
                      className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                      placeholder="Your profession"
                      onChange={profesionChange}
                      value={profession}
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-medium text-indigo-900"
                    >
                      Bio
                    </label>
                    <textarea
                      id="message"
                      rows="4"
                      className="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Write your bio here..."
                      onChange={bioChange}
                      value={bio}
                      required
                    ></textarea>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</div>

  );
};

export default ProfileEditUser;
