import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Footer() {
  return (
   <>
   <div className=''>
    <Row className='p-5 bg-dark text-light'>
       <Col>
          <h3>About us</h3>
          <p style={{textAlign:'justify'}}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem fuga sed maxime velit nobis quia nisi suscipit deleniti, minus omnis reiciendis voluptatum eius ab iste! Asperiores nulla laborum laboriosam soluta.
          </p>
       </Col>
       <Col className='d-flex align-items-center flex-column'>
        <h3>Links</h3>
        <Link to={'/dashboard'} className='mb-3 mt-3 d-block text-decoration-none'>Dashboard</Link>
        <Link to={'/projects'} className='text-decoration-none'>Projects</Link>
       </Col>
       <Col className=' align-items-center flex-column'>
       <h3>Social media</h3>
       <a href='https://getbootstrap.com/' className='text-decoration-none'><i  className="m-3 fa-brands fa-instagram"></i></a>
       <a href='https://getbootstrap.com/' className='text-decoration-none'><i className="fa-brands fa-x-twitter"></i></a>
       <a href='https://getbootstrap.com/' className='text-decoration-none'><i className="m-3 fa-brands fa-linkedin"></i></a>
       <a href='https://getbootstrap.com/' className='text-decoration-none'><i className="fa-brands fa-github"></i></a>
       </Col>
       <Col>
       <h3>Contact Us</h3>
       <div className=''>
       <p className='mt-3'>Submit your email id...</p>
       <input type="email" className='form-contol d-block' placeholder='Enter your email id' />
       <button className='btn mt-3 btn-light '>Send</button>
       </div>
       </Col>
       <div className='text-center '>
          <p >&copy; Project fair 2024</p>
      </div>
    
    </Row>

   </div>
   </>
  )
}

export default Footer