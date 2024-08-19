// import { LockOutlined } from "@mui/icons-material";
import CssBaseline from '@mui/material/CssBaseline'
import {
    Container,
    Box,
    Avatar,
    Typography,
    TextField,
    Button,
    Grid,
  } from "@mui/material";
  
  import { Link } from "react-router-dom";

  import { ToastContainer, toast, Slide } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
  import { Formik,Form } from 'formik'
 
  import { validationSchema } from "../../schema/loginSchema";

  import { GoogleLogin } from '@react-oauth/google'
import api from '../../route/interceptors';

import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserCredential } from "../../store/authSlice";

  
  
  
  
  const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const showToastMessage = () => {
      // toast.success("Success registered !", {
      //   position: "top-right",
      //   autoClose: 1000,
      //   onClose: () => navigate('/')
        navigate('/')
      // })
    };
    const errorToastMessage=(message)=>{
    
      toast.error(message,{
        position: "top-right",
        autoClose: 1000,
      })
    }
    const errorMessage = (error) => {
      errorToastMessage(error)
  };



    const handleLogin =async (values, { setSubmitting, setErrors,setFieldError }) => {
      
     
        const email=values.email
        const password=values.password
       
  
       api.post('/login',{email,password})
       .then((response)=>{
  
        
        if(response.data.status){
          dispatch(setUserCredential({user:response.data.data,accestoken:response.data.AccessToken}))
              showToastMessage()
        }
   
      
        if(!response.data.status){
          console.log(response.data.message)
          let message=response.data.message
          
          setErrors({password:message,email:'   ',types: 'MultipleFieldErrors'})
          
  
        }
  
       })
       .catch((error)=>{
        console.log("error")
        console.log(error)
       })
      
    };
  
  


   



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
           console.log(response)
          
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
    
  };
 
    
      
    
      return (
        <>
          <ToastContainer />
          <Container maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                mt: 20,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
               
              <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
                {/* <LockOutlined /> */}
              </Avatar>
              <Typography variant="h5">Login</Typography>
              <Box sx={{ mt: 1 }}>
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
              >
               {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
                <Form  >
                  
                <TextField
                  margin="normal"
               
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoFocus
                  value={values.email}
                  onChange={handleChange}
                  // onBlur={handleBlur}
                   
                  error={touched.email&&errors.email}
                  helperText={touched.email&&errors.email}
                />
    
                <TextField
                  margin="normal"
              
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  // onBlur={handleBlur}
                  
                  error={errors.password&&errors.password}
                  helperText={errors.password&&errors.password}
                />
              
                <Button
                
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  type='submit'
                  // onSubmit={handleLogin}
                  // disabled={isSubmitting}
                >
                  Login
                </Button>
                </Form>
                
                 )}
                </Formik>
                <div  style={{ display: 'flex', justifyContent: 'center' }}>
                <GoogleLogin    onSuccess={responseMessage} onError={errorMessage}    />
                </div>
                <br></br>
                <div className="pl-8">
                <Grid container justifyContent={"flex-center"} className="pl-4">
                  <Grid item >
                    <Link   className="pl-4" to="/register">Don't have an account?<span className="text-blue-500 pl-2">Register</span></Link>
                  </Grid>
                </Grid>
                </div>
              </Box>
            </Box>
          </Container>
          
        </>
      );
    };
  
  export default Login
  
  
  