import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ProjectCard from '../components/ProjectCard'
import { allProjects } from '../services/allApis'
import { Col, Row } from 'react-bootstrap'

function Projects() {
  const [projects, setProjects] = useState([])
  const [logStatus, setLogStatus] = useState(false)
  const [search,setSearch] = useState("")
  useEffect(() => {
    if(sessionStorage.getItem('token')){
     getData()
     setLogStatus(true)
    }else{
   setLogStatus(false)
    }
  }, [search])
  
  const getData=async()=>{
    const header={"Authorization":`Bearer ${sessionStorage.getItem('token')}`}
    const result=await allProjects(header,search)
    console.log(result)
    if(result.status==200){
      setProjects(result.data)
    }else{
      console.log(result.response.data)
    }
  }
  return (
   <>
<Header status={true}/>
<h2>All Products</h2>
<input type='text' name='' id="" className='form-control w-25' placeholder='Enter Language to search' onChange={(e)=>{setSearch(e.target.value)}} />
<div className='p-5'>
  {
    logStatus?
    <Row>
      {
        projects.length >0?
        projects.map(item=>(
          <Col>
          <ProjectCard project={item}/>
          </Col>
        ))
        :
        <h3>No projects available</h3>
      }
    </Row>
    :
    <h2>please login</h2>
  
  }
</div>
   </>
  )
}

export default Projects