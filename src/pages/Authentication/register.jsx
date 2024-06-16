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

  import { useState } from "react";
  import { Link } from "react-router-dom";
  import { useDispatch, useSelector } from 'react-redux';
  import { setUserCredential,removeUserCredential } from "../../store/authSlice";
  import { useNavigate } from 'react-router-dom';

  import { GoogleLogin } from '@react-oauth/google'
  import { jwtDecode } from "jwt-decode";

  const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const showToastMessage = () => {
    toast.success("Success registered !", {
      position: "top-right",
      autoClose: 1000,
      onClose: () => navigate('/'),
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

     

  
    const handleSubmit=(e)=>{
      e.preventDefault();
     
      
      const nameCheck=nameValidation({target:{value:name}})
      const emailCheck=emailValidation({target:{value:email}})
      const  passwordCheck=validatePassword({target:{value:password}})
      const cPasswordCheck=ValidateConformPassword({target:{value:cPassword}})
      const dobCheck=validateDob()
      const genderCheck=validateGender()
      
      
  
      if(nameCheck&&emailCheck&&passwordCheck&&cPasswordCheck&&dobCheck&&genderCheck){
       
          console.log(selectedDate.$d)
          console.log(gender)
          console.log(email)
          console.log(password)
          
        api.post('http://localhost:5000/register',{
          userName:name,
          dob:selectedDate,
          gender,
          email,
          password
        })
        .then((response)=>{
        
          
            if(response.status==200){
              dispatch(setUserCredential({user:response.data.data,accestoken:response.data.Accesstoken}))
              showToastMessage()

              
            }
          

          
        })
        .catch((error)=>{
          console.log("errrorrrrrrr")
          console.log(error)
          
          
        })

        alert("had")
       
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
          dispatch(setUserCredential({user:response.data.data,accestoken:response.data.Accesstoken}))
          showToastMessage()

          
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
        <form>
        <ToastContainer />
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
                {/* <Button>Register</Button> */}
               
                {/* <button className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50"  onClick={handleGoogleLogin}>
                  <span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_191_13499)">
                        <path
                          d="M19.999 10.2217C20.0111 9.53428 19.9387 8.84788 19.7834 8.17737H10.2031V11.8884H15.8266C15.7201 12.5391 15.4804 13.162 15.1219 13.7195C14.7634 14.2771 14.2935 14.7578 13.7405 15.1328L13.7209 15.2571L16.7502 17.5568L16.96 17.5774C18.8873 15.8329 19.9986 13.2661 19.9986 10.2217"
                          fill="#4285F4"
                        />
                        <path
                          d="M10.2055 19.9999C12.9605 19.9999 15.2734 19.111 16.9629 17.5777L13.7429 15.1331C12.8813 15.7221 11.7248 16.1333 10.2055 16.1333C8.91513 16.1259 7.65991 15.7205 6.61791 14.9745C5.57592 14.2286 4.80007 13.1801 4.40044 11.9777L4.28085 11.9877L1.13101 14.3765L1.08984 14.4887C1.93817 16.1456 3.24007 17.5386 4.84997 18.5118C6.45987 19.4851 8.31429 20.0004 10.2059 19.9999"
                          fill="#34A853"
                        />
                        <path
                          d="M4.39899 11.9777C4.1758 11.3411 4.06063 10.673 4.05807 9.99996C4.06218 9.32799 4.1731 8.66075 4.38684 8.02225L4.38115 7.88968L1.19269 5.4624L1.0884 5.51101C0.372763 6.90343 0 8.4408 0 9.99987C0 11.5589 0.372763 13.0963 1.0884 14.4887L4.39899 11.9777Z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M10.2059 3.86663C11.668 3.84438 13.0822 4.37803 14.1515 5.35558L17.0313 2.59996C15.1843 0.901848 12.7383 -0.0298855 10.2059 -3.6784e-05C8.31431 -0.000477834 6.4599 0.514732 4.85001 1.48798C3.24011 2.46124 1.9382 3.85416 1.08984 5.51101L4.38946 8.02225C4.79303 6.82005 5.57145 5.77231 6.61498 5.02675C7.65851 4.28118 8.9145 3.87541 10.2059 3.86663Z"
                          fill="#EB4335"
                        />
                      </g>
                    </svg>
                  </span>
                  Sign in with Google
                </button> */}
  
                {/* <Grid container justifyContent="flex-end"> */}
  
                <div className="mt-6 text-center">
                  <p>have any account?  <Link to='/login' style={{ color:'blue'}}>LOGIN</Link> </p>
                </div>
                {/* <Grid item>
                  <Link to="/login">Already have an account? Login</Link>
                </Grid> */}
                {/* </Grid> */}
           
      </>
    );
  };
  
  export default Register;
  