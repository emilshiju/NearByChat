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
import ChatBox from "./pages/chat/chatBox"

const router=createBrowserRouter([
   
    {
        path:"/",
        element:(<UserProtectedRoute ><Home /></UserProtectedRoute>)
       
        
    },
    {
        path:"/login",
        element:(<ProtectedRoute ><Login /></ProtectedRoute>)
    },
    {
        path:"/register",
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
        path:"/userView/:id",
        element:(<ProfileView  />)
    },{
        path:"/show",
        element:(<LocationPinAnimation />)
    },{
        path:"/notification",
        element:(<NotificationList />)
    },
    {
        path:"/chatBox/:id/:myid",
        element:(<ChatBox />)
    }
])


const App=()=>{
    
    return <RouterProvider router={router} />
}


export default App

