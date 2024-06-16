import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import  store from './store/store.js'
import {Provider} from "react-redux"
import {ThemeProvider } from './context/createContext'

import { GoogleOAuthProvider } from "@react-oauth/google"
import io from "socket.io-client";
// export const socket = io("http://localhost:5000");

import { SocketContext,socket } from './context/socket.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='1099245047006-lbgjpha95bfkeso2mjjcpoa9fa76rb3n.apps.googleusercontent.com'>
     
      <SocketContext.Provider value={socket}>
    <Provider store={store}>
      <ThemeProvider >
    <App />
  
    </ThemeProvider > 
    </Provider>
    </SocketContext.Provider>
 
    </GoogleOAuthProvider>
    
  </React.StrictMode>,
)
