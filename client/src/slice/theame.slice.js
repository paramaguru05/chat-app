import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theame:"light"
}

const theame =  createSlice({
    name:'theame',
    initialState,
    reducers:{
        setTheame : ( state, {payload} ) =>{
            localStorage.setItem("chat-theame",payload)
            state.theame = payload
        }
    }
})

export const {setTheame} = theame.actions
export default theame.reducer