import axios from "axios";
import api from "../route/interceptors";


const locationService=(userInfo,value)=>{
  
  return new Promise((resolve,reject)=>{

   

    api.post("/findUser", {
          userId: userInfo._id,
         
          radius: value,
        })
        .then((response) => {
          
      
          resolve(response.data.data)
          
        })
        .catch((error) => {
          console.log("errrorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
        });
      })
}

export default locationService