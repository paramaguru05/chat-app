import React,{useContext} from 'react'

import { HiOutlineXMark } from "react-icons/hi2";
import { CiMenuKebab } from "react-icons/ci";
import {useSelector,useDispatch} from "react-redux"
import {Link} from "react-router-dom"

import {logout} from "../services/auth"

import {SocketContext} from "../context/SocketContext"
import {setAuthUser} from "../slice/user.slice"
import { toggleDropdown} from "../slice/dropdown.slice"

import { FiMessageSquare } from "react-icons/fi"
import { CiSettings } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import toast from 'react-hot-toast';

import useWindowSize from '../hooks/useWindowSize';

const NaveBar = () => {

  const {width} = useWindowSize()
  const {disconnectSocket} = useContext(SocketContext)
  const {authUser} = useSelector((state)=> state.userInfo)
  const {seletectedUser} = useSelector((state)=> state.messageInfo)
  const { dropdown } = useSelector((state)=> state.dropdown)
  const dispatch = useDispatch()

  const handleLogut = async () =>{
    let response = await logout()
    if( response.status === 200 ){
      dispatch(setAuthUser(null))
      toast.success("Logout succssfully...")
      disconnectSocket()
    }
    dispatch(toggleDropdown())
  }

  return (
    <div className={` bg-base-300 h-[7%] w-[95%] mx-auto py-2  px-4 ${ width < 768 && seletectedUser ?'hidden' :""} flex items-center justify-between `}>
       <div className='text-3xl w-[5%] text-primary '>
         <Link to={'/'}>
          <FiMessageSquare  />
         </Link> 
       </div>
       <div className=' hidden w-[40%] md:flex justify-evenly '>
            <div  className='flex items-center bg-base-200 px-4 py-1 rounded-2xl hover:cursor-pointer hover:bg-base-300 transition-all duration-300'>
              <p className='mr-3'><CiSettings/></p>
              <p ><Link to={'/settings'}>Settings</Link></p>
            </div>

            {
              authUser && <>
                  <div className='flex items-center bg-base-200 px-4 py-1 rounded-2xl hover:cursor-pointer hover:bg-base-300 transition-all duration-300'>
                    <p className='mr-3'><CiUser/></p>
                    <p><Link to={'/profile'}>Profile</Link></p>
                  </div>
                  <div onClick={handleLogut} className='flex items-center bg-base-200 px-4 py-1 rounded-2xl hover:cursor-pointer hover:bg-base-300 transition-all duration-300'>
                    <p className='mr-3'><IoIosLogOut/></p>
                    <p>logout</p>
                  </div>
              </>
            }
            
       </div>
       <button  onClick={()=> dispatch( toggleDropdown() ) } className=' md:hidden text-[20px] text-primary cursor-pointer transition-all duration-500'>
        <CiMenuKebab/>
       </button>
       <aside className={` transition-all delay-100 md:hidden absolute top-15 ${dropdown?"left-6 ":"-left-full"} bg-base-200 w-[50%]  h-[87%]  z-10`}>
         <ul className='w-full h-full  pt-2 '>
          <li className='w-[95%] mx-auto py-2 mt-5 rounded-[10px] pl-5 flex items-center'>
            <CiSettings/>
            <span onClick={()=> dispatch( toggleDropdown() ) } className='ml-3'><Link to={'/settings'}>Settings</Link></span>
          </li>
          { authUser && <li className='w-[95%] mx-auto py-2 mt-5 rounded-[10px] pl-5 flex items-center'>
            <CiUser/>
            <span onClick={()=> dispatch( toggleDropdown() ) } className='ml-3'><Link to={'/profile'}>Profile</Link></span>
          </li>
          }
          { authUser && <li className='w-[95%] mx-auto py-2 mt-5 rounded-[10px] pl-5 flex items-center'>
            <IoIosLogOut/>
            <span onClick={handleLogut} className='ml-3 cursor-pointer'>Logout</span>
          </li>
          }

         </ul>
         <button onClick={()=> dispatch( toggleDropdown() ) } className='absolute top-4 right-4 cursor-pointer'><HiOutlineXMark/></button>
       </aside>
      
    </div>
  )
}

export default NaveBar