
import React ,{useState,useEffect }from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Navigate, useLocation,useNavigate} from "react-router-dom"
import api from '../interceptors'
import io from "socket.io-client";
import { removeUserCredential } from '../../store/authSlice'


const UserProtectedRoute=({ children })=>{
    const user=useSelector((state)=>state.auth.userInfo)
    
     let [userStatus,setuserStatus]=useState(null)
     const navigate = useNavigate();
     const dispatch = useDispatch();

    useEffect(()=>{
        const fetchUserStatus = async () => {
            try {
              const response = await api.get(`/userStatus/${user._id}`);
              const sta = response.data.status;
              setuserStatus(sta);
              
              
              if (sta === false) {
                alert('Your account has been blocked.');
                dispatch(removeUserCredential());
               
                navigate('/login');
              }
            } catch (error) {
              console.error('Failed to fetch user status:', error);
              // Optionally handle the error, e.g., navigate to an error page or show a notification
            }
          };
      
          fetchUserStatus();
    })
   
    


    return(
        <div>

            {user&&user.role=='user'?(children ):(<Navigate to='/login'/>)}
            
        </div>
    )
}

export default UserProtectedRoute