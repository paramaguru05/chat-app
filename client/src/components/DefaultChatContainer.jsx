import React from 'react'

import { FiMessageSquare } from "react-icons/fi"

const DefaultChatContainer = () => {
  return (<main className=' hidden  w-[80%] md:flex flex-col justify-center items-center '>
        <div className='bg-primary p-5 rounded-2xl text-2xl animate-bounce duration-1000 '>
          <FiMessageSquare/>
        </div>
        <div>
          <h1 className='text-3xl font-bold text-center mt-5'>Welcome to chaty</h1>
          <p className=' mt-3'>Select a converstion from the sidebar to chat </p>
        </div>
    </main>
  )
}

export default DefaultChatContainer