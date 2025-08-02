import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setSeletectedUser } from "../slice/messages.slice"
import { HiOutlineXMark } from "react-icons/hi2";

const ChatHeader = () => {

  const {seletectedUser,onlineUsers} = useSelector((state)=> state.messageInfo)
  const dispatch = useDispatch()

  return (
    <header className=' w-full h-15 bg-base-200 flex items-center  sm:p-4'>
      
              {
        seletectedUser.profilePic ? 
        <div className="avatar  pl-5 ">
          <div className=" w-10  sm:w-12 rounded-full">
            <img src={seletectedUser.profilePic} />
          </div>
        </div> 
        : 
       <div className="avatar  avatar-placeholder w-[10%]">
          <div className="bg-neutral text-neutral-content w-14 rounded-full">
            <span className="text-xl"> {seletectedUser.fullName[0].toUpperCase()} </span>
          </div>
       </div>
      }

      <div className='text-[13px] pl-5  items-start  w-[10%] '>
        <p className='text-[15px] mb-2'>{seletectedUser.fullName}</p>
        <p className={`${onlineUsers.includes(seletectedUser._id) ? "text-green-400" :"text-gray-400" }`}>{ onlineUsers.includes(seletectedUser._id) ? "online" :"offline" }</p>
      </div>
      <div className=' mr-5 sm:mr-0 w-[80%] flex justify-end text-2xl '>
        <HiOutlineXMark className='cursor-pointer'  onClick={()=> dispatch( setSeletectedUser(null) )} role='button'/>
      </div>
      
    </header>
  )
}

export default ChatHeader