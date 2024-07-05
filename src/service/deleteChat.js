import api from "../route/interceptors";



const deleteChat=(selectedUserId,userId)=>{
alert("999")


    return new Promise((resolve,reject)=>{
        api.post('/clearChat',{selectedUserId,userId})
    })

}


export default deleteChat


export const  deleteAllMessage=(messagesId)=>{


    
return new Promise((resolve,reject)=>{
    api.delete('/deleteMessages',{data:{messagesId}})
    .then((res)=>{
        if(res.data.status){
            resolve(res.data.status)
        }
    })
})
}