

import api from "../route/interceptors";


const connection=(userId )=>{
  
    return new Promise((resolve,reject)=>{


        api.get(`/getAllNotification/${userId}`)
        .then((response)=>{
            if(response.data.status){
                resolve(response.data.allNotification)
            }
        })
        .catch((error)=>{
            alert("error")
        })
    })
}

export default connection