import React,{useEffect,useContext} from 'react'

import {Routes, Route, Navigate} from "react-router-dom"
import  {Toaster} from "react-hot-toast"
import { useSelector, useDispatch } from 'react-redux'


import NaveBar from './components/NaveBar'

import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'

import {checkAuth} from "./services/auth"
import {setAuthUser} from "./slice/user.slice"
import {SocketContext} from "./context/SocketContext"


const App = () => {

  const {connectSocket} = useContext(SocketContext)
  const {authUser} = useSelector((state)=> state.userInfo)
  const theame = useSelector((state)=> state.theame.theame)

  const dispatch = useDispatch()

  const handleCheckAuth = async () =>{
     let response = await checkAuth()
     if(response.status === 200 ){
        dispatch(setAuthUser(response.data.user))  
        connectSocket(response.data.user)  
     }
  }

  useEffect(()=>{
   handleCheckAuth()
  },[])

  return (
    <div data-theme={ localStorage.getItem('chat-theame') || theame } className='h-screen p-1 sm:p-3'  >
      <NaveBar/>
      <Routes>
        <Route path='/' element={ authUser ? <HomePage/> : <Navigate to={'/signup'}/>} />
        <Route path='/signup' element={ !authUser ? <SignUpPage/> : <Navigate to={'/'}/>} />
        <Route path='/login' element={ !authUser ? <LoginPage/> : <Navigate to={'/'} />} />
        <Route path='/settings' element={<SettingsPage/>} />
        <Route path='/profile' element={ authUser ? <ProfilePage/> : <Navigate to={'/signup'}/>} />
      </Routes>
      <Toaster
        position='top-center'
        
      />
    
    </div>
  )
}

export default App