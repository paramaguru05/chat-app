import React,{useState} from 'react'

import {useDispatch, useSelector} from "react-redux"
import { HiOutlineXMark } from "react-icons/hi2";
import {toast} from "react-hot-toast"

import { BsSend } from "react-icons/bs";
import { CiImageOn } from "react-icons/ci";

import convertBase64 from "../utils/conertToBase64"
import {sendMessage} from "../services/messages"
import {setMessages} from "../slice/messages.slice"

const ChatInput = () => {

  const {messages,seletectedUser} = useSelector((state)=> state.messageInfo)
  const dispatch = useDispatch()

  const [text,setText] = useState("")
  const [preview ,setPreview] = useState("")
  const [image,setImage] = useState(null)
  const [isMessageSending,setIsMessageSending] = useState(false)

  const handleImageChange = async (image) =>{
    if(!image) return;
    setImage(image)
    if(image){
      let base64 =  await convertBase64(image)
      setPreview(base64)
    }
  }

  const handleRemoveImage = () =>{
    setPreview("")
    setImage(null)
  }

  const handleSendMessage = async (e) =>{
    
    e.preventDefault()
    const formData = new FormData()

    formData.append("text",text)
    formData.append("image",image)

    setIsMessageSending(true)
    let response = await sendMessage(seletectedUser._id,formData)
    setIsMessageSending(false)

    if(response.status === 201){     

      if(response.data.newMessage.senderId === seletectedUser._id) return
      dispatch(setMessages([...messages,response.data.newMessage]))
      toast.success("Message sent successfully")
    }
    setImage(null)
    setText("")
    setPreview("")
  }

  return (
    <footer className=' absolute -bottom-14 md:bottom-0  w-full sm:w-[95%]   h-15 bg-base-200 flex items-center px-7 z-10 '>
      
      {  preview && 
        <div className='absolute -top-20 left-13 w-20 h-20   '>
        <img src={preview} alt="user image" className='rounded-2xl w-20 h-10 ' />
        <div role='button' onClick={handleRemoveImage} className='absolute -top-2 -right-2 cursor-pointer z-10 bg-primary text-neutral p-1 rounded-full'>
          <HiOutlineXMark />
        </div>
        </div>
      } 
      
      <form onSubmit={handleSendMessage } className='w-full h-[95%] flex items-center'>
        <input 
         type="text"  
         value={text}
         onChange={(e)=> setText(e.target.value)}
         placeholder='Send message....'
         className='outline-none border-[1px] border-gray-300 w-[90%] p-2 px-5 rounded-[7px]'
        />
        <label htmlFor="image" className='text-[27px] cursor-pointer ml-5 '>
          <CiImageOn/>
        </label>
        <input onChange={(e)=> handleImageChange( e.target.files[0] ) } type="file" accept='image/*' className='hidden' id='image' />
        { isMessageSending && <span className="loading loading-spinner loading-md ml-5"></span>}
        { !isMessageSending && < button type='submit' className={`text-[24px] ml-10 ${!text && !image ? "text-gray-600 cursor-not-allowed":"cursor-pointer"}`}  ><BsSend/></button> }
      </form>

    </footer>
  )
}

export default ChatInput