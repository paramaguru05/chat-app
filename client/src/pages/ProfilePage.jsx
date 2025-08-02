import React,{useState} from 'react'

import defaultProfilePic from "./../assets/user.jpg"
import {setAuthUser} from "./../slice/user.slice"
import {updateProfile} from "../services/auth"

import { useSelector,useDispatch } from 'react-redux';
import {toast} from "react-hot-toast"

import { CiCamera } from "react-icons/ci";

const ProfilePage = () => {

  

  const [isFileUpload,setIsFileUpload] = useState(false)

  const {fullName,email,createdAt,profilePic} = useSelector((state)=> state.userInfo.authUser)
  const dispatch = useDispatch()

  const handleUpload = async (file) =>{

    console.log(file)

    let formData = new FormData()
    formData.append("image",file)
    
    setIsFileUpload(true)
    let response = await updateProfile(formData)

    if( response.status === 200 ){
       dispatch(setAuthUser(response.data.user))
       toast.success("Profile pic changed")
    }else if(response.status >= 400){
       toast.error(response.response.data.message)
    }
    setIsFileUpload(false)

  }

  return (
    <div className=' mt-5 flex justify-center '>
      <div className='bg-base-300 w-[90%] p-3 md:w-[40%] md:h-[90%] rounded-2xl flex flex-col  items-center'>
        <div className='text-center mt-5'>
          <h2 className='text-2xl'>Profile</h2>
          <p className='mt-3'>Your profile information</p>
        </div>

        <div className='flex flex-col items-center mt-5 '>
          <div className="avatar relative  ">
            <div className="w-24 rounded-full">
              <img src={ profilePic.length ? profilePic : defaultProfilePic} />
            </div>
            <label htmlFor='image' className='absolute bottom-0 -right-1 pl-[4px] pt-[4px] text-2xl w-8 h-8  bg-base-200 rounded-full cursor-pointer '>
              <CiCamera/>
            </label>
            
            <input onChange={(e)=> handleUpload(e.target.files[0]) } className='hidden' type="file"  id="image" />
          </div>
          <div className='mt-2'>
           { !isFileUpload && <p>
              Click camera icon to update your profile photo
            </p>
           }
            {
              isFileUpload && <p>
                Uploading
                <span className="loading loading-spinner loading-xs ml-5"></span>

              </p>
            }
          </div>
        </div>
        
        <div className='w-[90%]  flex flex-col items-center mt-10'>
          <div className='flex flex-col w-[90%] '>
            <label className=''>Full Name</label>
            <input type="text" disabled={true} value={fullName} placeholder='tets' className='mt-1 p-2 rounded-[5px] ring-1 pl-3' />
          </div>
          <div className='flex flex-col  w-[90%] mt-5'>
            <label >Email</label>
            <input type="text" disabled={true} value={email} placeholder='tets' className=' mt-1 p-2 rounded-[5px] ring-1 pl-3 ' />
          </div>
        </div>
        
        <div className='w-[70%] mt-10'>
          <p>Account Information</p>
          <div className='flex justify-between border-b-[1px] mt-5 pb-3'>
            <p>Memeber since</p>
            <p>{createdAt.slice(0,10).split("-").reverse().join("-")}</p>
          </div>
          <div className='flex justify-between mt-4'>
            <p>Account status</p>
            <p className='text-green-400'>Active</p>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default ProfilePage