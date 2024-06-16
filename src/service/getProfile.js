import api from "../route/interceptors";


const getProfile=(userId)=>{
    return new Promise((resolve,reject)=>{
        

        api.get(`/getProfile/${userId}`)
        .then((res)=>{
          
            
           
            if(res.data.status){
              
                
                resolve({status:res.data.status,response:res.data.response})
                
            }
            if(!res.data.status){
                resolve({status:res.data.status})
            }


        })
        .catch((error)=>{
            alert(error)
            alert("get profile error")
        })
    })
}

export default getProfile


