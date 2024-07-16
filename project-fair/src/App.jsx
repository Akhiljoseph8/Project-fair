import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import Header from './components/Header'
import Landing from './Pages/Landing'
import Dashboard from './Pages/Dashboard'
import Auth from './Pages/Auth'
import Projects from './Pages/Projects'
import Footer from './components/Footer'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react'
import { tokenAuthContext } from './Context_api/AuthContext'
function App() {
  
  // const authStatus = useContext(tokenAuthContext)
  var authStatus=true
  return (
    <>
    <div className=''>
     <Routes>
     <Route path='/' element={<Landing/>}/>
        <Route path='/dashboard' element={authStatus?<Dashboard/>:<Landing/>}/>
        <Route path='/login' element={<Auth/>}/>
        <Route path='/projects' element={authStatus?<Projects/>:<Landing/>}/>
     </Routes>
     <Footer/>
     <ToastContainer/>
     </div>
    </>
  )
}

export default App
