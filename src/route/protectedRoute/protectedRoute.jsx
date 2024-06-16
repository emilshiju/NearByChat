
import React ,{useEffect, useState} from 'react'
import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"
import api from '../interceptors'



const ProtectedRoute=({ children })=>{
    const user=useSelector((state)=>state.auth.userInfo)
     
    let [status,setStatus]=useState('')
    useEffect(()=>{
        api.get('/userStatus')
        .then((response)=>{
           let  sta=response.data.status
            // alert(response.data.status)
           setStatus(sta)
        })
    },[])
     {console.log("hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")}
    console.log(status)

   

    return(
        <div>
            {!user? children :<Navigate to='/'/>}
        </div>
    )
}

export default ProtectedRoute