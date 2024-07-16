import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Form, Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import { homeProjects } from "../services/allApis";

function Landing() {
  const [logStatus,setLogStatus]=useState(false)
  const [projects,setProjects]=useState([])
  useEffect(()=>{
    getData()
    if(sessionStorage.getItem("token")){
      setLogStatus(true)
    }else{
      setLogStatus(false)
    }
  },[logStatus])
  console.log(projects);
  
  const getData=async()=>{
    const result=await homeProjects()
    if(result.status=200){
     setProjects(result.data)
    }else{
      console.log(result.response.data)
    }
  }

  return (
    <>
      <div
        className="w-100 d-flex justify-content-center align-items-center"
        style={{ height: "100vh",backgroundColor:"black"}}
      >
        <Row>
          <Col sm={12} md={6} className="p-5">
            <h1 className="text-danger ">Project fair</h1>
            <p style={{ textAlign: "center" }} className="text-light">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
            {
              logStatus?
              <Link to={'/dashboard'} className="btn btn-success">Manage your projects</Link>
              :
            <button className="btn btn-warning" style={{borderRadius:"8%"}}>Explore for more</button>
            }
          </Col>
          <Col sm={12} md={6} className="p-3">
          <img style={{borderRadius:"10px"}} className="img-fluid p-" src="https://clockwise.software/img/blog/software-development-team-structure/header-background.jpg" alt=""  />
          </Col>
        </Row>
      </div>
      <div className="p-5">
         <h3 className="text-center">Few projects for you</h3>
         <div className="d-flex justify-content-evenly mt-3">
       {
        projects.length>0 ?
        projects.map(item=>(
          <ProjectCard project={item}/>
        ))
        :
        <h3 className="text-center text-danger">No projects</h3>
       }
         </div>
         <div className="text-center">
          <Link to={'/projects'}>See more..</Link>
         </div>
      </div>
    </>
  );
}


export default Landing;
