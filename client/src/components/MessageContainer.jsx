import React, {useContext, useEffect, useRef} from 'react'

import { useSelector } from 'react-redux'

import {SocketContext} from "../context/SocketContext"
import defaultProfile from "../assets/user.jpg"

const MessageContainer = () => {
    
    const containerRef = useRef(null)
    const { subscripToMessage,unsubscripFromMessage } = useContext(SocketContext)
    const authuser = useSelector((state)=> state.userInfo.authUser)
    const {seletectedUser,messages} = useSelector((state)=> state.messageInfo)

    useEffect(()=>{
        
        if( containerRef.current && messages.length ){
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }

        subscripToMessage()

        return ()=> unsubscripFromMessage()

    },[messages,subscripToMessage,unsubscripFromMessage])


  return (
    <main ref={containerRef} className='block w-full z-10 h-[72vh] p-4 overflow-y-auto'>

        {
            messages.map((val,i)=>{
                return (
                        <div key={i} className={`chat ${authuser._id === val.senderId ? "chat-end" :"chat-start"} `}>
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                    <img 
                                      src={
                                        authuser._id === val.senderId 
                                        ?
                                        authuser.profilePic || defaultProfile
                                        :
                                        seletectedUser.profilePic || defaultProfile
                                      }
                                    />
                                </div>    
                            </div>
                            <div className="chat-header ">
                                <time className="text-xs opacity-50 mb-1">{val?.createdAt?.slice(0,10).split('-').reverse().join('-')}</time>
                            </div>
                            <div className='chat-bubble'>
                                { val?.image  && <img src={val.image } className='w-72' /> }
                                { val.text && <p className='my-3'>{val.text}</p>}
                            </div>
                            
                        </div>    
                )
            })
        }

    </main>
  )
}

export default MessageContainer