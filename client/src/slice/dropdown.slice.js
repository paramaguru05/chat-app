import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dropdown:false
}

const theame =  createSlice({
    name:'dropdown',
    initialState,
    reducers:{
        toggleDropdown : ( state ) =>{
            state.dropdown = !state.dropdown
        }
    }
})

export const {toggleDropdown} = theame.actions
export default theame.reducer