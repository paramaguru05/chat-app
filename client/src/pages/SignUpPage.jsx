import React,{useState,useContext} from 'react'

import {SocketContext} from "../context/SocketContext"
import {signup} from "../services/auth"
import {setAuthUser} from "../slice/user.slice"
import { FiMessageSquare } from "react-icons/fi"
import {Link} from "react-router-dom"
import {toast} from "react-hot-toast"
import { useDispatch } from 'react-redux'

const SignUpPage = () => {

 const {connectSocket} = useContext(SocketContext)
 const dispatch = useDispatch()
 
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });


  const handleValidateForm = () =>{
    let success = true
    
    if(!formData.fullName) {
       toast.error("Full Name is required");
       success = false
       return success
    }
    if(!formData.email) {
       toast.error("Email is required");
       success = false
       return success
    }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
       toast.error("Provide valid email format");
       success = false
       return success
    }
    if(!formData.password) {
       toast.error("password is required");
       success = false
       return success
    }
    if(formData.password.length < 6) {
       toast.error("password must be 6 charactors");
       success = false
       return success
    }

    return success

  }

  const handleOnchange = (e) =>{
    let {name,value} = e.target 

    setFormData((prv)=>{
      return {
        ...prv, [name]:value
      }
    })

  }

 const handleOnSubmit = async (e) =>{
  e.preventDefault()
  
  let success = handleValidateForm()

  if(success){
      let response = await signup(formData)

      if(response.status === 201){
        dispatch(setAuthUser(response.data.user))
        toast.success("Account created successfully")
        connectSocket(response.data.user)
      }
      else if(response.status <= 400 ){
        toast.error(response.response.data.message)
      }
     
  }

 }


  return (
    <div className='h-screen flex justify-evenly pt-5 ' >
      <div className='h-[80%] w-full  md:w-[45%]  flex flex-col justify-center items-center '>
        <div className='w-[75%] h-[20%]'>
          <div className='text-4xl flex justify-center w-[75%] '>
           <FiMessageSquare/>
          </div>
          <h3 className='text-center text-3xl font-bold w-[75%] mt-2'>Create Account</h3>
          <h4  className='text-center  w-[75%] text-[12px] mt-2'>Get start with your free account</h4>
        </div>
        <form onSubmit={handleOnSubmit} className='w-[75%]' >
          <div>
            <p>Full Name</p>
          </div>
          <div className='mt-2'>
              <label className="input w-[75%] ">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </g>
                </svg>
                <input
                  type="text"
                  placeholder="Username"
                  name='fullName'
                  onChange={handleOnchange}
                />
              </label>
          </div>
          <div className='mt-5'>
            <p>Email</p>
          </div>
          <div className='mt-2'>

            <label className="input w-[75%]  ">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input type="text" name='email' placeholder="mail@site.com" onChange={handleOnchange} />
            </label>
            

          </div>
          <div className='mt-5'>
            <p>Password</p>
          </div>
          <div  className='mt-2'>
              <label className="input w-[75%] ">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                    ></path>
                    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                  </g>
                </svg>
                <input
                  type="password"
                  placeholder="*********"
                  name='password'
                  onChange={handleOnchange}
                />
              </label>
          </div>

          <button type='submit' className="btn btn-outline btn-primary w-[75%] mt-5 ">Create account</button>
        </form>

        <div className='mt-5 w-full pl-[15%] '>
          <p>Already have an account? <Link to={'/login'} className='text-blue-500 underline'>sign in</Link></p>
        </div>

      </div>
      <div className=' hidden  h-[90%] w-[45%] bg-base-100 md:flex flex-col justify-center items-center  '>
        <div className='w-[60%] grid grid-cols-3 gap-2'>
          <div className="skeleton  h-32 w-32"></div>
          <div className="skeleton  h-32 w-32"></div>
          <div className="skeleton  h-32 w-32"></div>
          <div className="skeleton  h-32 w-32"></div>
          <div className="skeleton  h-32 w-32"></div>
          <div className="skeleton  h-32 w-32"></div>
          <div className="skeleton  h-32 w-32"></div>
          <div className="skeleton  h-32 w-32"></div>
          <div className="skeleton  h-32 w-32"></div>
        </div>
        <div className=' w-[60%] mt-3 '>
          <h2 className='text-3xl mt-3 font-bold text-center'>Join our community</h2>
          <p className='w-[80%] mt-3'>Connect with your friends, shear movements and stay in tuch with loved ones.</p>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage