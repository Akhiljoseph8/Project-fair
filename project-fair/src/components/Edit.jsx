import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Row,Col} from 'react-bootstrap'
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import base_url from '../services/server_url';
import { editProject } from '../services/allApis';
import { toast } from 'react-toastify';

function Edit({project}) {
    const [show, setShow] = useState(false);
    const [preview,setPreview]=useState("")
    const [projectData, setProjectData] = useState({
      id:project._id,title:project.title,overview:project.overview,languages:project.languages,github:project.github,demo:project.demo,image:""
    })
 
    useEffect(() => {
      if(projectData.image){
        if(project.image.type=="image/jpg" || project.image.type=="image/jpeg" || project.image.type=="image/png"){
          setImageStatus(false)
          setPreview(URL.createObjectURL(project.image))
        }else{
          setImageStatus(true)
          setPreview("")
        }
      }
    }, [projectData.image])
    

    console.log(projectData)

  const handleClose = () =>{ 
    setShow(false);
    setProjectData(
      {
        id:project._id,title:project.title,overview:project.overview,languages:project.languages,github:project.github,demo:project.demo,image:""
      }
    )
    setPreview("")
  }

  const handleShow = () => setShow(true);

  const handleSubmit=async()=>{
    const {title,overview,languages,github,demo,image}=projectData
    console.log(projectData);
    if(!title || !languages || !github || !overview || !demo){
      console.log("Invalid Input")
    }else{
      const formData= new FormData()
      formData.append("title",title)
      formData.append("overview",overview)
      formData.append("languages",languages)
      formData.append("github",github)
      formData.append("demo",demo)
      formData.append("image",image)
      if (preview) {
        const header={
          "Content-Type":'multipart/form-data',
          "Authorization":`Bearer ${sessionStorage.getItem('token')}`
      }
      const result = await editProject(formData,header,projectData.id)
      if(result.status==200){
        toast.success("Project Updated Successfully")
        handleClose()
      }else{
        console.log(result)
        toast.error(result.response.data)
      }
    }else{
        const header={
          "Content-Type":'application/json',
          "Authorization":`Bearer ${sessionStorage.getItem('token')}`
        }
        const result = await editProject(formData,header,projectData.id)
      if(result.status==200){
        toast.success("Project Updated Successfully")
        handleClose()
      }else{
        console.log(result)
        toast.error(result.response.data)
      }
      }
  }
  }


  return (
    <>
       <button className="btn ms-2" onClick={handleShow}>
            <i className="fa-solid fa-pen-to-square fa-2xl"></i>
          </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <label htmlFor="img">
                <input type="file" id="img" style={{ display: "none" }} onChange={e=>setProjectData({...projectData,image:e.target.files[0]})}></input>
                <img
                  className="img-fluid"
                  src={`${base_url}/uploads/${project.image}`}
                  alt=""
                />
              </label>
            </Col>
            <Col>
              <FloatingLabel
                controlId="Title"
                label="Project Title"
                className="mb-3"
                
              >
                <Form.Control type="text" placeholder="Title" value={projectData.title} onChange={e=>setProjectData({...projectData,title:e.target.value})}/>
              </FloatingLabel>
              <FloatingLabel
                controlId="over"
                label="Project Overview"
                className="mb-3"
              >
                <Form.Control type="text" placeholder="OverView" value={projectData.overview} onChange={e=>setProjectData({...projectData,overview:e.target.value})} />
              </FloatingLabel>
              <FloatingLabel
                controlId="lang"
                label="Used Languages"
                className="mb-3"
              >
                <Form.Control type="text" placeholder="Languages" value={projectData.languages} onChange={e=>setProjectData({...projectData,languages:e.target.value})} />
              </FloatingLabel>
              <FloatingLabel
                controlId="demo"
                label="Project Demo Url"
                className="mb-3"
              >
                <Form.Control type="text" placeholder="Demo Url" value={projectData.demo} onChange={e=>setProjectData({...projectData,demo:e.target.value})}/>
              </FloatingLabel>
            </Col>
            <FloatingLabel
              controlId="git"
              label="Project Github Url"
              className="mb-3"
            >
              <Form.Control type="text" placeholder="GitHub" value={projectData.github} onChange={e=>setProjectData({...projectData,github:e.target.value})}/>
            </FloatingLabel>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Edit