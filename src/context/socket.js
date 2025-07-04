import io from "socket.io-client";
import { createContext ,useState} from 'react'

export const socket = io('https://siof.site');

export const SocketContext=createContext()