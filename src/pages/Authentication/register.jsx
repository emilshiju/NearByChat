import CssBaseline from '@mui/material/CssBaseline'
import {
    Avatar,
    Button,
    Container,
    Box,
    Grid,
    Select,
    TextField,
    Typography,
    MenuItem,
    colors,
  } from "@mui/material";
  import api  from "../../route/interceptors"
  // import {getUser} from "../../route/interceptors"
  // import axios from "axios";
  //   import { LockOutlined } from "@mui/icons-material";
  // import { DatePicker } from "@mui/x-date-pickers";
  // import DatePicker from 'react-date-picker';
  
  // import  {registerInitialValues} from "../schema/registeration"
  import "../Home.css"
  import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
  import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
  import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
  import { DatePicker } from "@mui/x-date-pickers/DatePicker";
  
  import { ToastContainer, toast, Slide } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

  import { useEffect, useState ,useRef} from "react";
  import { Link } from "react-router-dom";
  import { useDispatch, useSelector } from 'react-redux';
  import { setUserCredential,removeUserCredential } from "../../store/authSlice";
  import { useNavigate } from 'react-router-dom';

  import { GoogleLogin } from '@react-oauth/google'
  import { jwtDecode } from "jwt-decode";

 import { otpSend, verifyOtp } from '../../service/otp';

  const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const showToastMessage = () => {
      
     
    toast.error("Otp Not correct!", {
      position: "top-right",
      autoClose: 1000,
      
    })
   


  };
  
  const errorToastMessage=(message)=>{
  
    toast.error(message,{
      position: "top-right",
      autoClose: 1000,
    })
  }
  

    const [name, setName] = useState("");
    const [nameBox, setNameBox] = useState(false);
    const [nameError, setNameError] = useState("");
  
    const [gender, setGender] = useState("gender");
    const [genderBox, setGenderBox] = useState(false);
    // const [genderError, setGenderError] = useState("feild is required");
  
    const [email, setEmail] = useState("");
    const [emailBox, setEmailBox] = useState(false);
    const [emailError, setEmailError] = useState("");
  
    const [password, setPassword] = useState("");
    const [passwordBox,setPasswordBox]=useState(false)
    const [passwordError,setPasswordError]=useState('')
  
    const [cPassword,setCPassword]=useState('')
    const [cPBox,setCPBox]=useState(false)
    const [cPError,setCPError]=useState('')
  
  
    const [selectedDate, setSelectedDate] = useState();
    const [dateBox, setDateBox] = useState(false);
    

    const [otp,setOtp]=useState(false)

    const nameValidation = (e)=> {
      const value = e.target.value;
      setName(value);
      const nameRegex = /^[a-zA-Zà-ÿÀ-ÿ]+([ '-][a-zA-Zà-ÿÀ-ÿ]+)*$/;
      if (!value) {
        setNameError("feild is requied");
        setNameBox(true);
        return false;
      }
      if (!nameRegex.test(value)) {
        setNameError("name format is not correct");
        setNameBox(true);
        return false;
      }
      setNameError("");
      setNameBox(false);
      return true;
    };
  
    const handleDateChange = (date) => {
      setSelectedDate(date);
      setDateBox(false)
    };
      
    const emailValidation=(e)=>{
      const regex =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  
      const email=e.target.value
      setEmail(email)
      if(!email){
        setEmailError("feild is required")
        setEmailBox(true)
        return false
      }
      if(!regex.test(email)){
        setEmailError("check the feild")
        setEmailBox(true)
        return false
      }
      setEmailError('')
      setEmailBox(false)
      return true
  
    }
  
    const validatePassword=(e)=>{
      const password=e.target.value
      setPassword(password)
  
      const passwordRegex=/^[a-zA-Z0-9]{6,}$/
      if(!password){
        setPasswordError("feild is required")
        setPasswordBox(true)
        return false
      }
      if(!passwordRegex.test(password)){
        setPasswordError("feils is required")
        setPasswordBox(true)
        return false
      }
      setPasswordError("")
       setPasswordBox(false)
      
      return true
    }
    
    const ValidateConformPassword=(e)=>{
      console.log(e.target.value)
      // console.log(password)
      // console.log(cPassword)
      const conformPassword=e.target.value
      setCPassword(conformPassword)
  
      const conformPasswordRegex=/^[a-zA-Z0-9]{6,}$/
      if(!conformPassword){
        setCPError("feild is required")
        setCPBox(true)
        return false
      }
      if(!conformPasswordRegex.test(conformPassword)){
        setCPError("feils is required")
        setCPBox(true)
        return false
      }
   

      if(password!==conformPassword){
        setCPError("passwords not matching")
        setCPBox(true)
       
        return false
      }
      setCPError("")
       setCPBox(false)
     
      return true
    }
  
    const handleGenderChange = (event) => {
      setGender(event.target.value);
      setGenderBox(false)
    };
  
    const options = [
      { value: "female", label: "Female" },
      { value: "male", label: "Male" },
      { value: "other", label: "Other" },
    ];
  
    const handleChange = (event) => {
      setGender(event.target.value);
    };
     const validateDob=()=>{
       if(!selectedDate){
        setDateBox(true)
        return false
       }
       setDateBox(false)
       return true
     }
     const validateGender=()=>{
      if(!gender||gender=='gender'){
        setGenderBox(true)
        return false
      }
      setGenderBox(false)
      return true
     }
    
     const [digits, setDigits] = useState(['', '', '', '']); // Initialize state for four digits
     const inputRefNext = useRef([]);
     // Handler to update digit based on index
     const onSetDigit = (e, index) => {
       const newDigits = [...digits];
       let value=e.target.value;
       newDigits[index] = value
       setDigits(newDigits);
       if (value && index < inputRefNext.current.length - 1) {
        inputRefNext.current[index + 1].focus();
      }
     };

      

     const afterOtpSubmit=()=>{

     

      let otp=digits.join('')

      if(otp.length==0){
        errorToastMessage("ENTER OTP")
        return 
      }
     
     
      verifyOtp(email,otp)
      .then((status)=>{
    
        setDigits(['', '', '', ''])

        if(status)
          {

             api.post('/register',{
                userName:name,
                dob:selectedDate,
                gender:gender,
                email:email,
                password:password
             })
             .then((response)=>{
      
          
              if(response.status==200){
                     
        
              dispatch(setUserCredential({user:response.data.data,accestoken:response.data.Accesstoken}))
             

            
          }
        

        
      })
      .catch((error)=>{
        console.log("errrorrrrrrr")
        console.log(error)
        
        
      })



          }else{
      
            showToastMessage()
          }
      })


     


     }

     

     
    //  const [timer, setTimer] = useState(null);
     const [resendOtp,setResendOtp]=useState(false)
      const  timeRef =useRef(null)
     

     const [timeLeft, setTimeLeft] = useState(60); // 60 seconds countdown

     
     useEffect(() => {


      // Cleanup interval on component unmount
      return () => {
        if (timeRef.current) {
          clearInterval(timeRef.current);
        }
      };
    }, []);
  
       

     

     const sendOtpmessage=()=>{
      
      otpSend(email)
      setResendOtp(false)
      setTimeLeft(60); 

  
      // if(timeRef.current){
      //   clearInterval(timeRef.current)
      // }
 
     
       
    
     const a= setInterval(() => {
     
      if(timeLeft>0){
      setTimeLeft((prevTime) => prevTime - 1);
      }else{
        clearInterval(timeRef.current)
      }
    }, 1000);
    timeRef.current=a


        
      

     }

     
  useEffect(() => {
    if (timeLeft === 0) {
      setResendOtp(true);
     
      
    }

    // return () => clearInterval(timeRef.current); // Cleanup the interval on component unmount
  }, [timeLeft]);


  
    const handleSubmit=(e)=>{
      e.preventDefault();
     
      
      const nameCheck=nameValidation({target:{value:name}})
      const emailCheck=emailValidation({target:{value:email}})
      const  passwordCheck=validatePassword({target:{value:password}})
      const cPasswordCheck=ValidateConformPassword({target:{value:cPassword}})
      const dobCheck=validateDob()
      const genderCheck=validateGender()
      
      
  
      if(nameCheck&&emailCheck&&passwordCheck&&cPasswordCheck&&dobCheck&&genderCheck){
           setOtp(true)
        sendOtpmessage()
         
       
      }
     
  
    }


    const handleGoogleLogin=()=>{

      api.get('/auth/google')
      .then((response)=>{
        console.log("999999999999999999999999999eshfishfoishfosdofjs")
        console.log(response)
      }).catch((error)=>{
        console.log("7777777777777777777777777777ljifisjofhsdiofh")
        console.log(error)
      })
    }


    const responseMessage = async (response) => {
       
      const decodedToken= jwtDecode(response.credential);
   
     
    
    
    const email = decodedToken.email;
    const idToken = response.credential
    const username = decodedToken.name || decodedToken.given_name || decodedToken.preferred_username;
   


    try{


      const checkUser=await api.post('/checkEmail',{email})

      
    
    let {status}=checkUser.data

    
      if(status){

        
        let response=await api.post('/googleLogin',{email,idToken,username})
          
        if(response.status==200){
          // showToastMessage()
          dispatch(setUserCredential({user:response.data.data,accestoken:response.data.Accesstoken}))
          

          
        }
      }else{
        errorToastMessage("create an account here")
      }

    }catch(error){
      console.log(error)
    }
      console.log(response);
  };
  const errorMessage = (error) => {
      errorToastMessage(error)
  };


 


  
    return (
      <>

<ToastContainer />
     
            {!otp&&<div>
         <form>
     
          <Container maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                mt: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
                {/* <LockOutlined /> */}
              </Avatar>
              <Typography variant="h5">Register</Typography>
  
              <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} style={{ position: "relative" }}>
                    <TextField
                      name="userName"
                      fullWidth
                      id="name"
                      label="Name"
                      autoFocus
                      value={name}
                      //  helperText={nameBox ? nameError: ""}
                      //  onChange={(e)=>setName(e.target.value)}
                      onChange={nameValidation}
                      error={nameBox}
                    />
                    {nameError && (
                      <span
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: "25px",
                          color: "red",
                          fontSize: "13px",
                          fontFamily: "Times New Roman",
                        }}
                      >
                        {nameError}
                      </span>
                    )}
                  </Grid>
  
                  <Grid item xs={7} spacing={1} sx={{ mt: 1 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      {/* <DemoContainer components={["DatePicker"]} > */}
  
                      <DatePicker
                        //  @ts-ignore
                        value={selectedDate}
                        onChange={handleDateChange}
                        // defaultValue={yesterday}
                        error={dateBox}
                        disableFuture
                        // views={['year', 'month', 'day']}
  
                        slotProps={{
                          textField: {
                            helperText: dateBox ? "feild is required" : "",
                            error: dateBox,
                          },
                        }}
                      />
  
                      {/* </DemoContainer> */}
                    </LocalizationProvider>
                  </Grid>
  
                  <Grid item xs={5} sx={{ mt: 1 }} >
                    <Select
                      value={gender}
                      onChange={ handleGenderChange}
                      fullWidth
                      label="Gender"
                      id="gender"
                      name="gender"
                      error={genderBox}
                    >
                      <MenuItem value="gender" disabled>
                        Gender
                      </MenuItem>
                      {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {genderBox && (
                      <span
                        style={{
                          // position: "absolute",
                          top: "400px",
                          // left: "25px",
                          
                          color: "red",
                          fontSize: "13px",
                          fontFamily: "Times New Roman",
                        }}
                      >
                        {"feild is required"}
                      </span>
                    )}
                  </Grid>
  
                  <Grid item xs={12} style={{ position: "relative" }}>
                    <TextField
                    
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      value={email}
                      onChange={emailValidation}
                      error={emailBox}
                    />
                        {emailBox&& (
                      <span
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: "25px",
                          color: "red",
                          fontSize: "13px",
                          fontFamily: "Times New Roman",
                        }}
                      >
                        {emailError}
                      </span>
                    )}
                  </Grid>
  
                  <Grid item xs={12} sx={{ mt: 1 }} style={{ position: "relative" }}>
                    <TextField
                   
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      value={password}
                      onChange={validatePassword}
                      error={passwordBox}
                    />
                    
                    {passwordBox&& (
                      <span
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: "25px",
                          color: "red",
                          fontSize: "13px",
                          fontFamily: "Times New Roman",
                        }}
                      >
                        {passwordError}
                      </span>
                    )}
                  </Grid>
  
                  <Grid item xs={12} sx={{ mt: 1 }} style={{ position: "relative" }}>
                    <TextField
                   
                      fullWidth
                      name="conformPassword"
                      label="conformPassword"
                      type="password"
                      id="conformpassword"
                      value={cPassword}
                      onChange={ValidateConformPassword}
                      error={cPBox}
                    />
                       {cPBox&& (
                      <span
                        style={{
                          position: "absolute",
                          top: "100%",
                          left: "25px",
                          color: "red",
                          fontSize: "13px",
                          fontFamily: "Times New Roman",
                        }}
                      >
                        {cPError}
                      </span>
                    )}
                  </Grid>
                </Grid>
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleSubmit}
                >
                  Register
                </Button>
                </Box>
            
               
            <GoogleLogin    onSuccess={responseMessage} onError={errorMessage}    />
        
                
            </Box>
            
          </Container>
          
        </form>
                
  
                <div className="mt-6 text-center">
                  <p>have any account?  <Link to='/login' style={{ color:'blue'}}>LOGIN</Link> </p>
                </div>
             </div> }

                
                {otp&&  <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>{`We have sent a code to your email ${email}`}</p>
            </div>
          </div>

          <div>
          
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  
                  
                {digits.map((digit, index) => (
          <div className="w-16 h-16" key={index}>
            <input
             ref={(el) => (inputRefNext.current[index] = el)}
              className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
              type="text"
              value={digit}
              onChange={(e) => onSetDigit(e, index)} // Pass index to identify which digit to update
            />
          </div>
        ))}


                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <button className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                    onClick={afterOtpSubmit}
                    >
                      Verify Account
                    </button>
                  </div>
           
                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    {/* <p>Didn't receive code?</p> */}
                    {resendOtp&&
                    <p
                      className="flex flex-row items-center text-blue-600"
                   
                      onClick={sendOtpmessage}
                    >
                      Resend
                    </p>
                   }
                    {!resendOtp&&
                    <p
                      className="flex flex-row items-center text-blue-600"
                   
                    
                    >
                     {timeLeft}
                    </p>
                   }
                  </div>
                </div>
              </div>
   
          </div>
        </div>
      </div>
    </div>}
                
  
            
      
           
      </>
    );
  };
  
  export default Register;
  