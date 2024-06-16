
import React ,{useState,useEffect }from 'react'
import {useSelector} from "react-redux"
import {Navigate, useLocation} from "react-router-dom"
import api from '../interceptors'
import io from "socket.io-client";



const UserProtectedRoute=({ children })=>{
    const user=useSelector((state)=>state.auth.userInfo)
    
    


    return(
        <div>
            {user&&user.role=='user'?(children ):(<Navigate to='/login'/>)}
        </div>
    )
}

export default UserProtectedRoute