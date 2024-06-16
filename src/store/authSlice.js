import { createSlice } from "@reduxjs/toolkit";

const initialState={
    userInfo:localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null,
    adminInfo:localStorage.getItem('adminInfo')?JSON.parse(localStorage.getItem('adminInfo')):null
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUserCredential:(state,action)=>{
            state.userInfo=action.payload.user
            localStorage.setItem('userInfo',JSON.stringify(action.payload.user))
            localStorage.setItem('accestoken',JSON.stringify(action.payload.accestoken))
        },
        removeUserCredential:(state,action)=>{
            state.userInfo=null;
            localStorage.removeItem('userInfo')
            localStorage.removeItem('accestoken')
        }
    }
})

export const {setUserCredential,removeUserCredential}=authSlice.actions

export default authSlice.reducer