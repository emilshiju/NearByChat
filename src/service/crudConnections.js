

import api from "../route/interceptors";


export const Unconnect=(delteSenderId,deleteReceiverId)=>{

     return new Promise((resolve,reject)=>{
          api.patch('/unConnectUser',{delteSenderId,deleteReceiverId})
           .then((res)=>{
               resolve(res.data)
           })
     })
     
}