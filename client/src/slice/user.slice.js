import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    authUser:null,
    socket:null
}

const user = createSlice({
    name:"user",
    initialState,
    reducers:{
        setAuthUser:(state,{payload})=>{
            state.authUser = payload
        },
        setSocket:(state,{payload})=>{
            state.socket = payload
        }
    }
})

export const {setAuthUser,setSocket} = user.actions

export default user.reducer