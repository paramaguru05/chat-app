import {configureStore} from "@reduxjs/toolkit"
import userRducer from "./../slice/user.slice"
import messageReducer from "../slice/messages.slice"
import theameReducer from "../slice/theame.slice"
import dropdownReducer from "../slice/dropdown.slice"

export const store = configureStore({
    reducer:{
        userInfo:userRducer,
        messageInfo:messageReducer,
        theame:theameReducer,
        dropdown:dropdownReducer
    }
})