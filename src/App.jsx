import {createBrowserRouter,RouterProvider} from "react-router-dom"

import Login from "./pages/Authentication/login"
import Register from "./pages/Authentication/register"

import Home from "./pages/Home/home"

import Profile from "./pages/Profile/Profile"

import ProfileEditUser from "./pages/Profile/profileEdit"

import UserProtectedRoute from "./route/protectedRoute/userProtectedRoute"
import ProtectedRoute from "./route/protectedRoute/protectedRoute"
import ProfileView from "./pages/Profile/profileView"
import LocationPinAnimation from "./components/locationpinAnimation";
import { useEffect } from "react"
import NotificationList from "../src/pages/Notification/notificationList"
import ChatBox from "./pages/chat/chatBox"
import VideoCall from "./components/videoCall/videoCall"
import PermissionNotification from "./components/permisionNotification"
import ChatRandom from "./pages/chatToRandomPepoles/chatRandom"
import ConnectingToRandomPepole from "./components/connectingToRandomPepole"
import ChatToRandomPepoles from "./components/chatToRandomPepoles"
import Settings from "./pages/settings/settings"
import EditUserDetails from "./pages/settings/editUserDetails"
import ForgotPassword from "./pages/settings/forgotPassword"
import OrderSummary from "./pages/settings/orderSummary"
import Sample from "./pages/sample"
import SampleChat from "./pages/SampleChat"
import NotificationSample from "./pages/notificationSample"


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
        element:(<ChatBox />),
        
    },
    {
        path:'/videoCall/:status?',
        element:(<VideoCall />),
    },
    {
        path:'/permission',
        element:(<PermissionNotification />)
    },{
        path:"/chatRandom",
        element:(<ChatRandom  />)
    },
    {
        path:"/connectingRandomPepole",
        element:(<ConnectingToRandomPepole  />)
    },
    {
        path:"/chatToRandomPepole",
        element:(<ChatToRandomPepoles  />)
    }
    ,{
        path:"/settings",
        element:(<Settings />)
    },
    {
        path:"/editUserDetails",
        element:(<EditUserDetails  />)
    },
    {
        path:"/forgotPassword",
        element:(<ForgotPassword  />)
    },
    {
        path:"/orderSummary",
        element:(<OrderSummary  />)
    }
    ,
    {
        path:'/sample',
        element:(<Sample  />)
    },
    {
        path:"/sampleChat/:receiverId?",
        element:(<SampleChat  />)
    },
    {
        path:"/notificationSample",
        element:(<NotificationSample />)
    }
])


const App=()=>{
    
    return <RouterProvider router={router} />
}


export default App

