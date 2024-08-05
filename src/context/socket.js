import io from "socket.io-client";
import { createContext ,useState} from 'react'

// export const socket = io("http://localhost:5000");

export const socket = io("https://anonymous10.cloud");

export const SocketContext=createContext()