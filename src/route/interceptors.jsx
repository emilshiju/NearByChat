import axios from "axios";

import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';

const api=axios.create({
    // baseURL:'http://localhost:5000/'
    baseURL:'https://anonymous10.cloud'
})





api.interceptors.request.use((config)=>{

  try{

   

 
    
        if (config.data instanceof FormData) {
       
          config.headers['Content-Type'] = 'multipart/form-data';
          
        } else {
      
          config.headers['Content-Type'] = 'application/json';
        }
       
             
        const token = JSON.parse(localStorage.getItem('accestoken')); // Assuming you store the token in localStorage
        if (token) {
          
          config.headers.Authorization = `Bearer ${token}`;
        }
      
        
       
        config.withCredentials = true;
       
        
     

  

        console.log(config)
        
       
        return config
      
      }catch(error){
       

      }
    },
    (error)=>{
      
        return Promise.reject(error);
    }


)

api.interceptors.response.use(function (response) {



  
    return response;
  }, async function (error) {


if(error.response.status==500){
  // toast.error("Internal Server Error.");
  // toast.error("Internal Server Error.");
  toast.error("Internal Server Error.", {
    position: "top-right",
    autoClose: 1000,
  })
}
  
if(error.response.status === 402){
  toast.error(`${error.response.data.message}`, {
    position: "top-right",
    autoClose: 1000,
  })
 
}

    
    const originalRequest = error.config;
  
    
    if(error.response.status === 403){
      // alert("account blocked")
      toast.error(`${error.response.data.message}`, {
        position: "top-right",
        autoClose: 1000,
      })
      
    }
 
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshToken();
        return api(originalRequest);
      } catch (refreshError) {

      
       
        localStorage.removeItem('userInfo');
        localStorage.removeItem('accestoken');
        
        
        const navigate = useNavigate();
        navigate('/login'); 
        return Promise.reject(refreshError);
      }
    }

    console.log(error)
    return Promise.reject(error);
  });



  async function refreshToken() {
    const { userName ,role , _id } = JSON.parse(localStorage.getItem('userInfo'));
  
    try {
      const response = await api.post('/refresh', { userName ,userId:_id});
     
      const accesstoken=response.data.data
      
     
      localStorage.setItem('accestoken', JSON.stringify(accesstoken));
      return Promise.resolve();
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  }
  


export default api