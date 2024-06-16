
import React from 'react';
import api from '../route/interceptors';
// import { useSelector } from 'react-redux';

const UploadImage=async (formData)=>{

  return new Promise((resolve,reject)=>{

    api.post('/uploadProfile',formData)
    .then((response)=>{
      
      
        if(response.data.status){
        resolve(response.data.result)
        }else{
        alert("error")
        }
    })
    .catch((error)=>{
      console.log(error)
    })

  })
    

    

}

export default UploadImage



