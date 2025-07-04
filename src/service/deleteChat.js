import api from "../route/interceptors";



const deleteChat=(selectedUserId,userId)=>{



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


export const deleteSingleChat=(chatRoomId,userId)=>{
  
    return new Promise((resolve,reject)=>{
       

        api.delete('/deleteSingleChat',{data:{chatRoomId,userId}})
        .then((res)=>{
          if(res.data.status){
            resolve(res.data.status)
          }
        })
    })
}


export const userTouserBlock=(chatRoomId,userId)=>{

    return new Promise((resolve,reject)=>{
      
        api.patch('/userTouserBlock',{chatRoomId,userId})
        .then((res)=>{
            if(res.data.data){
                resolve(res.data.data)
            }
        })
        
    })
}


export const userTouserUnblock=(chatRoomId,userId)=>{

    return new Promise((resolve,reject)=>{
    
        try{

        api.patch('/userTouserUnblock',{chatRoomId,userId})
        .then((res)=>{
            if(res.data.data){
                resolve(res.data.data)
            }
        })
    }catch(error){
   
        console.log(error)
    }

    })
}