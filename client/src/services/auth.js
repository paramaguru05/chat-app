import api from "../lib/axios"

export const checkAuth = async () =>{
    try {
        let response = await api.get("/auth/check")
        return response
    } catch (error) {
         console.log("Error in check auth",error)
        return error
       
    }
}


export const signup = async (userData) =>{
    try {
        let response = await api.post("/auth/signup",userData)
        return response
    } catch (error) {
        return error
    }
}


export const login = async (userdata) =>{
    try {
        let response = await api.post("/auth/login",userdata)
        return response
    } catch (error) {
        return error
    }
}

export const logout = async () =>{
    try {
        let response = await api.post("/auth/logout")
        return response
    } catch (error) {
        return error
    }
}

export const updateProfile = async (data) =>{
    try {
        let response = await api.patch("/auth/update-profile",data)
        return response
    } catch (error) {
        return error
    }
}

