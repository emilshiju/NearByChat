import axios from "axios";
import { useSelector } from "react-redux";

const api=axios.create({
    // baseURL:'http://localhost:5000/'
    baseURL:'https://siof.site'
})


api.interceptors.request.use((config)=>{

  try{

   
  // alert(`Request URL: ${config.url}`);
 
    
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
       
        console.log( 'ereorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr',error)
      }
    },
    (error)=>{
        console.log("ivideeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
        console.log(error)
        alert("error")
        return Promise.reject(error);
    }


)

api.interceptors.response.use(function (response) {



  
    return response;
  }, async function (error) {
alert("error in intercetor")
  
if(error.response.status === 402){
  alert(error.response.data.message)
}

    
    const originalRequest = error.config;
    console.log("orginalllllllllllllllll rquestttttttttttttttttttttttttttttttttttt")
    console.log(originalRequest)
    console.log("stoppppppppppppppppppppppppppppppppp")
    
    if(error.response.status === 403){
      alert("account blocked")
    }
 
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshToken();
        return api(originalRequest);
      } catch (refreshError) {

      
        console.error('Token refresh error:', refreshError);
        localStorage.removeItem('userInfo');
        localStorage.removeItem('accestoken');
        window.location.href = '/login';
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
      // const { accesstoken } = response.data.data
      const accesstoken=response.data.data
      
     
      localStorage.setItem('accestoken', JSON.stringify(accesstoken));
      return Promise.resolve();
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  }
  


export default api