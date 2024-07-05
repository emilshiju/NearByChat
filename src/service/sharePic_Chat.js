import api from "../route/interceptors"


const SharePicChat=async(formData)=>{

    return new Promise((resolve,reject)=>{

        api.post('/uploadChatPic',formData)
        .then((res)=>{
           
            if(res.data.status){
                resolve(res.data.result)
                
            }
        })
    })
}

export default SharePicChat