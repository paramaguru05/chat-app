import React,{useEffect} from 'react'

import { FiUsers } from "react-icons/fi"
import {useDispatch,useSelector} from "react-redux"

import SideBarSkeleton from "./skeletons/SideBarSkeleton"

import {getUsers} from "./../services/messages"
import {setusers,setSeletectedUser,setIsUserLoading} from "./../slice/messages.slice"

import useWindowSize from "../hooks/useWindowSize"

const SideBar = () => {

  const { dropdown } = useSelector((state)=> state.dropdown)
  const {users,seletectedUser,isUserLoading,onlineUsers} = useSelector((state)=> state.messageInfo)
  const {width} = useWindowSize()
  const dispatch = useDispatch()

  const handleSelectUser = (selectedUser) =>{
    dispatch(setSeletectedUser(selectedUser))
  }

  const handleGetUsers = async () =>{
    dispatch(setIsUserLoading(true))
    let response = await getUsers()
    if( response.status === 200 ){
      dispatch(setusers(response.data.users))
    }
    
    dispatch(setIsUserLoading(false))
   
  }

  useEffect(()=>{
    handleGetUsers()
  },[])

 

  if (isUserLoading) return <SideBarSkeleton/>

  return (

    <aside className={` ${ width < 768 && dropdown?"hidden": width < 768 && seletectedUser ? "hidden" : 'block' }  bg-base-100 w-[90%]  md:w-[30%] h-full  p-5`}>
      <div className=' flex items-center p-3 '>
        <FiUsers/>
        <span className='ml-5'>Contacts</span>
      </div>
      <div className=' h-[92%] overflow-y-auto'>
        {
          users.length ? users.map((val,index)=>{
            return(
                      <div key={index} role='button' onClick={()=> handleSelectUser(val)}  className={`mt-5 h-20 ${seletectedUser?._id === val._id ? "bg-base-300":"" }  flex items-center p-2 cursor-pointer`}>
                        {
                          val.profilePic ? 
                          <div className={`avatar ${onlineUsers.includes(val._id) ? "avatar-online" :"avatar-offline" } `}>
                            <div className="w-12 rounded-full">
                              <img src={val.profilePic} />
                            </div>
                          </div> 
                          : 
                        <div className={`avatar ${onlineUsers.includes(val._id) ? "avatar-online" :"avatar-offline" } avatar-placeholder`}>
                            <div className="bg-neutral text-neutral-content w-14 rounded-full">
                              <span className="text-xl"> {val.fullName[0].toUpperCase()} </span>
                            </div>
                        </div>
                        }
                          <div className='w-[50%] h-16 flex flex-col justify-center  ml-4'>
                            <p className='mb-2'>{val.fullName}</p>
                            <p className={`${onlineUsers.includes(val._id) ? "text-green-400" :"text-gray-400" }`} >{ onlineUsers.includes(val._id) ? "online" :"offline" }</p>
                          </div>
                        </div>
            )
          }) : <p className='text-center mt-5'>No users found</p>
        }
      </div>
    </aside>
  )
}

export default SideBar