import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux"

import {store} from "../src/store/user.store.js"
import {SocketProvider} from "./context/SocketContext.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
       <SocketProvider>

       
          <BrowserRouter>
              <App /> 
          </BrowserRouter>

      </SocketProvider>
      
    </Provider>
  </StrictMode>,
)
