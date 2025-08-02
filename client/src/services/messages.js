import api from "./../lib/axios"

export const getUsers = async () =>{
    try {
        let response = await  api.get("/message/users") 
        return response
    } catch (error) {
        return error
    }
}

export const getMessages = async (userToChatId) =>{
    try {
        let response = await api.get(`/message/${userToChatId}`)
        return response
    } catch (error) {
        return error
    }
}

export const sendMessage = async (reciverId,data) =>{
    try {
        let response = await api.post(`/message/send/${reciverId}`,data)
        return response
    } catch (error) {
        return error
    }
}