
import React ,{useEffect, useState} from 'react'
import {useSelector} from "react-redux"
import {Navigate, useLocation, useParams} from "react-router-dom"
import api from '../interceptors'



const ProtectedRoute=({ children })=>{
    const user=useSelector((state)=>state.auth.userInfo)

   let status=true
     
    // let [userStatus,setuserStatus]=useState('')
    // useEffect(()=>{
    //     api.get(`/userStatus/${user._id}`)
    //     .then((response)=>{
    //        let  sta=response.data.status
    //         // alert(response.data.status)
    //        setuserStatus(sta)
    //     })
    // },[])


   

    return(
        <div>
            {!user? children :<Navigate to={`/${status}`} />
        }
        </div>
    )
}

export default ProtectedRoute