import api from "../route/interceptors";


const profileForm=(userId,nickName,bio,profession)=>{
  
    return new Promise((resolve,reject)=>{


        api.post('/submitProfile',{userId,nickName,bio,profession})
        .then((response)=>{
            if(response.data.status){
                resolve(response.data.data)
            }
        })
        .catch((error)=>{
            alert("error")
        })
    })
}

export default profileForm


export const updateImageUrl=(userId,imageUrl)=>{

    return new Promise((resolve,reject)=>{
   
        api.patch('/updateImageUrl',{userId,imageUrl})
        .then((response)=>{
            resolve(response.data.response)
        })
    })
}