import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    messages:[],
    users:[],
    onlineUsers:[],
    seletectedUser:null,

    isUserLoading:false,
    isMessageLoading:false
}

const message =  createSlice({
    name:"message",
    initialState,
    reducers:{
        setMessages:(state,{payload})=>{
            state.messages = payload
        },
        setusers:(state,{payload})=>{
            state.users = payload
        },
        setOnlineUsers:(state,{payload})=>{
            state.onlineUsers = payload
        },
        setSeletectedUser:(state,{payload})=>{
            state.seletectedUser = payload
        },

        setIsUserLoading:(state,{payload})=>{
            state.isUserLoading = payload
        },
        setIsMessageLoading:(state,{payload})=>{
            state.isMessageLoading = payload
        }
    }
})


export const {setMessages,setusers, setOnlineUsers, setSeletectedUser , setIsUserLoading} = message.actions

export default message.reducer