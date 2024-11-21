import io from "socket.io-client";
import { createContext } from 'react'

export const socket = io("https://siof.site");

// export const socket = io("https://anonymous10.cloud");

export const SocketContext=createContext()