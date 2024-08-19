import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./store/store.js";
import { Provider } from "react-redux";
import { ThemeProvider } from "./context/createContext";
import { SideBar } from "./context/createContext";
import { Responsive } from "./context/createContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { SocketContext, socket } from "./context/socket.js";

import { LocalStreamProvider } from "./context/localStreamInstanace.jsx";


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const clientId=import.meta.env.VITE_GOOGLE_CLIENT_ID

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={clientId}>
    <LocalStreamProvider>
    <ToastContainer />
      <SocketContext.Provider value={socket}>
        <Provider store={store}>
          <Responsive>
            <SideBar>
              <ThemeProvider>
                <App />
              </ThemeProvider>
            </SideBar>
          </Responsive>
        </Provider>
      </SocketContext.Provider>
    </LocalStreamProvider>
  </GoogleOAuthProvider>
);
