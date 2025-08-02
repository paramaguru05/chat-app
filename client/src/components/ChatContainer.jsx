import React, { useState , useEffect } from 'react'

import { useDispatch , useSelector } from 'react-redux'

import {setMessages} from "../slice/messages.slice"
import { getMessages } from '../services/messages'

import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import MessageSkeleton from './skeletons/MessageSeleton'
import MessageContainer from './MessageContainer'

const ChatContainer = () => {
  
  const [isMessageLoading,setIsMessageLoading] = useState(false)
  const {seletectedUser} = useSelector((state)=> state.messageInfo)
  const dispatch = useDispatch()

  const handleGetMessage = async () =>{
    setIsMessageLoading(true)
    let response = await getMessages(seletectedUser._id)
    if( response.status === 200 ){
      dispatch(setMessages(response.data.messages))
    }
    setIsMessageLoading(false)
  }

  useEffect(()=>{
    handleGetMessage()
  },[seletectedUser])

  return (
    <div className=' relative w-full   '>
        <ChatHeader/>
        { !isMessageLoading ? <MessageContainer/> : <MessageSkeleton/> }
        <ChatInput/>
    </div>
  )
}

export default ChatContainer