import io from "socket.io-client";
import { createContext ,useState} from 'react'
// http://localhost:5000
export const socket = io("https://siof.site");
// baseURL:'https://siof.site'

export const SocketContext=createContext()