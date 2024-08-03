

import { useState,useEffect ,useContext} from "react"
import Sidebar from "../../components/sideBar"
import api from "../../route/interceptors"
import { useSelector ,useDispatch} from "react-redux";
import { ToastContainer, toast, Slide } from 'react-toastify';
import alertFilled from "@material-tailwind/react/theme/components/alert/alertFilled";
import { useNavigate } from "react-router-dom";

import { SideBarContext } from "../../context/createContext";
import { responsiveContext } from "../../context/createContext";

const EditUserDetails=()=>{

  const navigate=useNavigate()

  const { open , setOpen }=useContext(SideBarContext)
  const {responsiveMd,setResponsiveMd}=useContext(responsiveContext)

  

    const userInfo = useSelector((state) => state.auth.userInfo);
     const userId=userInfo._id

    const [changePassword,setChangePassword]=useState(false)
    const [checkCurrentPassword,setCheckCurrentPassword]=useState(null)




    const showToastMessage = () => {
      
     
      toast.success("SucesFuly updated!", {
        position: "top-right",
        autoClose: 1000,
        
      })
     
  
  
    };



    const [userName,setUserName]=useState()
    const [dob,setDob]=useState()
    const [gender,setGender]=useState()


     const onChangePassword=(e)=>{
        e.preventDefault();
        setChangePassword(true)

     }

     const onCheckCurrentPassword=(e)=>{
        e.preventDefault();
        setCheckCurrentPassword(true)
     }
      const [userDetails,setUserDetails]=useState(null)




      const formatDate = (dateString) => {
       
        if (!dateString) return '';
        const date = new Date(dateString);
      
        return date.toISOString().split('T')[0]; // Extract the date part in YYYY-MM-DD format
      };





       function getUserDetails(){

        
        api.get(`/displayUserDetails/${userId}`)
        .then((res)=>{
            if(res.data.data){
                setUserDetails(res.data.data)
                setUserName(res?.data?.data?.userName)
                setDob(formatDate(res?.data?.data?.dob))
                setGender(res?.data?.data?.gender)
            }
        })


       }

     useEffect(()=>{

      getUserDetails()

     },[])


   

    const [checkPassword,setCheckPassword]=useState('')
    const [showCheckPasswordError,setShowCheckPasswordError]=useState(false)

    const onsetCheckPassword=(e)=>{
        e.preventDefault();

        setCheckPassword(e.target.value)
    }


      const onCheckIsCorrect=(e)=>{

        e.preventDefault()

     
       
        api.post('/hashPassword',{currentPassword:checkPassword,hashedPassword:userDetails.password})
         .then((res)=>{
            if(res.data.status){
                   

                setShowCheckPasswordError(false)
                setCheckCurrentPassword(false)
               
                setChangePassword(true)
              
            }else{

                setShowCheckPasswordError(true)
            }
         })

        setCheckPassword('')

       

      }


      const [newPassword,setNewPassword]=useState('')
      const [conformPassword,setConformPassword]=useState('')
      const [errorMessage,setErrorMessage]=useState(false)
      const [conformErrorMessage,setConformErrorMessage]=useState(false)

     
  const onChangeNewPassword = (e) => {
    const value = e.target.value;
    setNewPassword(value);

    
    if (value.length <6) {
        setErrorMessage(true);
        return false
      } else {
        setErrorMessage(false);
        return true
      }
   
  };   

  // const onkeyDownChangePassword=()=>{
      
  //   if (newPassword.length <6) {
  //       setErrorMessage(true);
  //       return false
  //     } else {
  //       setErrorMessage(false);
  //       return true
  //     }

  // }

  


      const onChangeConformPassword=(e)=>{

        const value=e.target.value

        setConformPassword(value)
       

        if(newPassword!==value){
                setConformErrorMessage(true)
                return false
            }else{
                
                setConformErrorMessage(false)
                return true
    
            }

        
      }


      // const onkeyDownChangeConformPassword=()=>{
          

        
      //   if(newPassword!==conformPassword){
      //       setConformErrorMessage(true)
      //       return false
      //   }else{
            
      //       setConformErrorMessage(false)
      //       return true

      //   }

      // }




      const onSubmitNewPassword=(e)=>{
             
        e.preventDefault()



        //  const isValidPassword=onkeyDownChangePassword()
        //  const isValidCPasswor=onkeyDownChangeConformPassword()

         const isValidPassword=onChangeNewPassword({target:{value:newPassword}})
         const isValidCPasswor=onChangeConformPassword({target:{value:conformPassword}})

         if(isValidPassword&&isValidCPasswor){
          
  
          api.patch('/changePassword',{password:newPassword,userId:userId})
          .then((res)=>{
            if(res.data.status){


              showToastMessage()
              setNewPassword('')
              
              setConformPassword('')
              setChangePassword(false)

              getUserDetails()

            }
          })
         }
        // if(onkeyDownChangePassword&&onkeyDownChangeConformPassword){
            
        //     alertFilled("in")

        //     api.post('/savePassword',{newPassword,userId})

        // }else{

        // }

        
        

      }

        

      const onChangeUserName=(e)=>{

        setUserName(e.target.value)

      }


      const onChangeDob=(e)=>{

        setDob(e.target.value)

      }



      const onChangeGender=(e)=>{

        setGender(e.target.value)

      }



      const onSubmitUserDetails=(e)=>{

        e.preventDefault()
       

        api.put('/editUserDetails',{userId,userName,dob,gender})
        .then((res)=>{
          if(res.data.status){
            showToastMessage()
            getUserDetails()
          }
        })
      console.log("userrrrrrrrrrrrrrrrrrrrrrrrrr deeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
      
        console.log(userName)
        console.log(dob)
        console.log(gender)
      }


      const onRedirectUserDetails=()=>{
       
        navigate('/settings')

      }


      const onRedirectOrderSummary=()=>{

        navigate('/orderSummary')

      }

      const onRedirectForgotPassword=()=>{
        navigate('/forgotPassword')
      }
      


      const [isOpen, setIsOpen] = useState(false);

      const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };



      const handleResize = () => {
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
      
        // const screenWidth = window.innerWidth; // Use innerWidth for viewport width
        // const screenHeight = window.innerHeight; // Use innerHeight for viewport height
      
        console.log("Viewport Size Changed");
        console.log("Width:", screenWidth, "Height:", screenHeight);
      
        if (screenWidth <= 375 && screenHeight <= 667) {
          console.log("Small screen");
        
          setOpen(false);
          setResponsiveMd(false);
        } else if (screenWidth > 400 && screenHeight > 700) {
          console.log("Large screen");
       
          setOpen(true);
          setResponsiveMd(true);
        }
      };
      
      useEffect(() => {
        // Call handleResize once to set the initial state
        handleResize();
      
        // Add the event listener
        window.addEventListener("resize", handleResize);
      
        // Clean up the event listener
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);
      
      


    return (
      <>
        <div>

        {responsiveMd&&<Sidebar current="settings" />}
        <ToastContainer />
       <div className="flex justify-start"  style={{ paddingLeft: open ?'350px' : responsiveMd ? "110px" : '20px' ,  marginTop: '100px' }} >
       
        <form className="w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-4 font-sans">Edit Personal Details</h1>
     <br></br>
     
   
     {!responsiveMd&&<button
  type="button"
  style={{
    position: 'absolute', // or 'fixed' if you want it to stay on top while scrolling
    top: '10px', // adjust as needed
    right: '10px', // adjust as needed
    zIndex: 9999, // a high value to ensure it's on top
  }}
  onClick={toggleDropdown}
>
  <svg
    className="w-6 h-6"
    aria-hidden="true"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      clipRule="evenodd"
      fillRule="evenodd"
      d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
    />
  </svg>
</button>}


    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full px-3">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
          Name
        </label>
        <input
          className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-password"
          type="text"
          value={userName}
          placeholder=""
        onChange={onChangeUserName}
        required
        minLength={4}
        />
        
      </div>
    </div>
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full px-3">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
          dob
        </label>
        
        <input
          className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id="grid-password"
          type="date"
          value={dob}
          onChange={onChangeDob}
       
  
          
        />
        
      </div>
    </div>
    <div className="flex flex-wrap -mx-3 mb-6">
      <div className="w-full px-3">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
          gender
        </label>
        
        <select
      className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
      id="grid-gender"
      value={gender}
      onChange={onChangeGender}
   
    >
      
      <option value="male">Male</option>
      <option value="female">Female</option>

    </select>
       
      </div>
    </div>



     <div className="flex items-center -mx-3 mb-6">
  
  <div className="w-full md:w-1/2 px-3">
    <button className="  text-gray-700 text-xs font-bold mb-2"  onClick={onCheckCurrentPassword}>
      Change Password
    </button>
  </div>
  <div className=" justify-end ml-auto px-3">
    <button
   
      onClick={onSubmitUserDetails}
      className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
    >
      Save
    </button>
  </div>
  
    
  
    
</div>
{checkCurrentPassword&&<div className="flex flex-wrap -mx-3 mb-6 items-center">
  <div className="w-full px-3">
    <label
      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
      htmlFor="grid-password"
    >
      Enter current Password
    </label>
    <div className="flex items-center">
      <input
        className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id="grid-password"
        type="text"
        placeholder=""
        value={checkPassword}
        onChange={onsetCheckPassword}
      />
      <svg
        className="w-4 h-4 ml-2"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 14"
        onClick={()=>setCheckCurrentPassword(null)}
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
        />
      </svg>
           
    </div>
    {showCheckPasswordError&&<p className="text-red-500 text-xs pt-2 italic">Password is wrong try again or   forgotPassword</p>}
  </div>
  
  <br></br>
  <div className=" justify-end ml-auto px-3 mt-4">
    <button
     
      className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
      onClick={onCheckIsCorrect}
    >
      change
    </button>
  </div>
</div>
}
    

  </form>
  <div className="h-[200px] w-[1px] bg-black ml-20"></div>


  {responsiveMd==true&&<div className="ml-2">
     
      <div className="inline-flex items-center px-4 py-3 rounded-lg  w-full bg-gray-50  border-gray-800 " onClick={onRedirectUserDetails}>
        <svg className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
          <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
        </svg>
        User Details
      </div>
   
    <br></br>

<div className="inline-flex items-center px-4 py-3 rounded-lg w-full bg-gray-50" onClick={onRedirectOrderSummary}>
  <div className="border border-gray-300 p-1 rounded">
    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
      <path d="M21 3H3c-1.1 0-1.99.9-1.99 2L1 19c0 1.1.89 2 1.99 2H21c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-11-1h2v-5h3l-4-4-4 4h3z"/>
    </svg>
  </div>
  <span className="ms-2">Order Summary</span>
</div>

<br></br>

<div className="inline-flex items-center px-4 py-3 rounded-lg w-full bg-gray-50" onClick={onRedirectForgotPassword}>
  <div className="border border-gray-300 p-1 rounded">
    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 1c-3.86 0-7 3.14-7 7 0 2.97 1.94 5.48 4.65 6.34.14.04.24.15.24.29v.7c0 .28-.22.5-.5.5H7v2h1.5v1.5h-5V18H6v-1.5H4v-2h2.85c.63 0 1.15-.52 1.15-1.15v-.7c0-.14-.1-.25-.24-.29A7.007 7.007 0 0 1 5 8c0-3.31 2.69-6 6-6s6 2.69 6 6h-2l2.25 3L20 8h-2c0-3.86-3.14-7-7-7zm-2.5 15v2H14v-2h-4.5z"/>
    </svg>
  </div>
  <span className="ms-2">Forgot Password</span>
</div>




  </div>}


  
{isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          <div
            className="inline-flex items-center px-4 py-3 rounded-lg w-full bg-gray-50 hover:bg-gray-100 cursor-pointer"
            onClick={onRedirectUserDetails}
          >
            <svg
              className="w-4 h-4 me-2 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 18"
            >
              <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
            </svg>
            User Details
          </div>

          <div
            className="inline-flex items-center px-4 py-3 rounded-lg w-full bg-gray-50 hover:bg-gray-100 cursor-pointer"
            onClick={onRedirectOrderSummary}
          >
            <div className="border border-gray-300 p-1 rounded">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21 3H3c-1.1 0-1.99.9-1.99 2L1 19c0 1.1.89 2 1.99 2H21c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-11-1h2v-5h3l-4-4-4 4h3z" />
              </svg>
            </div>
            <span className="ms-2">Order Summary</span>
          </div>

          <div
            className="inline-flex items-center px-4 py-3 rounded-lg w-full bg-gray-50 hover:bg-gray-100 cursor-pointer"
            onClick={onRedirectForgotPassword}
          >
            <div className="border border-gray-300 p-1 rounded">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 1c-3.86 0-7 3.14-7 7 0 2.97 1.94 5.48 4.65 6.34.14.04.24.15.24.29v.7c0 .28-.22.5-.5.5H7v2h1.5v1.5h-5V18H6v-1.5H4v-2h2.85c.63 0 1.15-.52 1.15-1.15v-.7c0-.14-.1-.25-.24-.29A7.007 7.007 0 0 1 5 8c0-3.31 2.69-6 6-6s6 2.69 6 6h-2l2.25 3L20 8h-2c0-3.86-3.14-7-7-7zm-2.5 15v2H14v-2h-4.5z" />
              </svg>
            </div>
            <span className="ms-2">Forgot Password</span>
          </div>
        </div>
      )}


  </div>

  
 
      </div>

      {changePassword&& <div
         
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md">
          
            <div className="relative bg-white rounded-lg shadow ">
           
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                <h3 className="text-xl font-semibold text-gray-900 ">
                  create new Password
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200  rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  "
                  onClick={()=>setChangePassword(false)}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              
              <div className="p-4 md:p-5">
                <form className="space-y-4" action="#">
                  

                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      new password
                    </label>
                    <input
                      type="test"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={onChangeNewPassword}
                  
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      required
                    />
                  </div>
                    {errorMessage&&<p className="text-red-500 text-xs italic">must be above 6 </p>}
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      conform password
                    </label>
                    <input
                      type="test"
                      name="password"
                      id="password"
                      value={conformPassword}
                      onChange={onChangeConformPassword}
                      
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      required
                    />
                  </div>
                  {conformErrorMessage&&<p className="text-red-500 text-xs pt-2 italic">Password and conform password must be same</p>}


                  

            

                  <button
                    onClick={onSubmitNewPassword}
                    className="w-full mt-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                    save
                  </button>
                  
                </form>
              </div>
            </div>
          </div>
        </div>}
      </>
    )
}

export default EditUserDetails