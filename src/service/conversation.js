import api from "../route/interceptors";


const getAllConversation=(userId)=>{
  

    return new Promise((resolve,reject)=>{

        api.get(`/getAllConversation?userId=${userId}`,)
        .then((res)=>{
            resolve(res.data.allChat)
        })
    })
}

export default getAllConversation