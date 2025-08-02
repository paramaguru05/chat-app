import React from 'react'

import { useSelector } from 'react-redux'

import SideBar from '../components/SideBar'

import ChatContainer from '../components/ChatContainer'
import DefaultChatContainer from '../components/DefaultChatContainer'

const HomePage = () => { 

  const {seletectedUser} = useSelector((state)=> state.messageInfo)

  return (
    <div className=' w-[95%] h-[calc(100vh-5.5rem)] mx-auto mt-2 flex  '>
      <SideBar/> 
      {seletectedUser ? <ChatContainer/> : <DefaultChatContainer/> }
    </div>
  )
}

export default HomePage