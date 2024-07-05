import {createBrowserRouter,RouterProvider} from "react-router-dom"

import Login from "./pages/Authentication/login"
import Register from "./pages/Authentication/register"

import Home from "./pages/Home"
import Profile from "./pages/Profile/Profile"
import ProfileEditUser from "./pages/Profile/profileEdit"

import UserProtectedRoute from "./route/protectedRoute/userProtectedRoute"
import ProtectedRoute from "./route/protectedRoute/protectedRoute"
import ProfileView from "./pages/Profile/profileView"
import LocationPinAnimation from "./components/locationpinAnimation";
import { useEffect } from "react"
import NotificationList from "../src/pages/Notification/notificationList"
import ChatBox from "../src/pages/chat/chatBox"
import VideoCall from "./components/videoCall/videoCall"
import PermissionNotification from "./components/permisionNotification"
const router=createBrowserRouter([
   
    {
        path:"/:status?",
        element:(<UserProtectedRoute ><Home /></UserProtectedRoute>)
       
        
    },
    {
        path:"/login",
        element:(<ProtectedRoute ><Login /></ProtectedRoute>)
    },
    {
        path:"/register/:status?",
        element:(<ProtectedRoute><Register/></ProtectedRoute >)
        
    },
    {
        path:"/profile",
        element:(<UserProtectedRoute><Profile /></UserProtectedRoute>)
    },
    {
        path:"/editProfile",
        element:(<UserProtectedRoute><ProfileEditUser /></UserProtectedRoute>)
    },
    {
        path:"/userView/:receiverId",
        element:(<UserProtectedRoute><ProfileView  /></UserProtectedRoute>)
    },{
        path:"/show",
        element:(<UserProtectedRoute><LocationPinAnimation /></UserProtectedRoute>)
    },{
        path:"/notification",
        element:(<UserProtectedRoute><NotificationList /></UserProtectedRoute>)
    },
    {
        path:"/chatBox/:receiverId?",
        element:(<ChatBox />)
    },
    {
        path:'/videoCall/:status?',
        element:(<VideoCall />),
    },
    {
        path:'/permission',
        element:(<PermissionNotification />)
    }
])


const App=()=>{
    
    return <RouterProvider router={router} />
}


export default App

