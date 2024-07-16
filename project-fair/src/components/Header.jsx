import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { tokenAuthContext } from '../Context_api/AuthContext';
import { useContext } from 'react'
function Header({status}) {
  const {authStatus,setAuthStatus} =useContext(tokenAuthContext)

  const usenavigate = useNavigate()
  const logout=()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("username")
    usenavigate('/')
    setAuthStatus(false)
  }
  return (
    <Navbar className="bg-body-tertiary d-flex justify-content-between">
      <Navbar.Brand className='ms-3' href="#home">
      <i class="fa-solid fa-diagram-project"></i>{' '}
        Project Fair
      </Navbar.Brand>
      {!status &&
      <button className='btn btn-danger me-4 rounded' onClick={logout}>LogOut <i class="fa-solid fa-right-from-bracket"></i></button>}
  </Navbar>
  )
}

export default Header