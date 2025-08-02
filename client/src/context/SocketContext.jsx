import {createContext,useState} from "react"

import {useDispatch,useSelector} from "react-redux"
import {io} from "socket.io-client"

import {setMessages,setOnlineUsers} from "../slice/messages.slice"

export const SocketContext = createContext(null)


export const SocketProvider = ({children}) =>{
    const BASE_URL = "http://localhost:3000"

    const {messages} = useSelector((state)=> state.messageInfo)
    const dispatch = useDispatch()

    const [socket,setSocket] = useState(null)

    const connectSocket = (authUser) =>{
        if(socket && !authUser) return;
        const socketInstance = io(BASE_URL,{
            query:{
                userId:authUser._id
            }
        })
        setSocket(socketInstance)    
        socketInstance.on('getOnlineUsers',(userIds)=>{
            dispatch( setOnlineUsers(userIds) )
        })
    }

    const disconnectSocket = () =>{
        if( !socket ) return;
        socket.disconnect()
    }

    const subscripToMessage = () =>{
        socket.on("newMessage",(newMessage)=>{
            dispatch(setMessages([...messages,newMessage]))
            console.log(newMessage)
        })
    }

    const unsubscripFromMessage = () =>{
        socket.off("newMessage")
    }

    return (
        <SocketContext.Provider value={{socket,connectSocket,disconnectSocket,subscripToMessage,unsubscripFromMessage}}>
            {children}
        </SocketContext.Provider>
    )
}