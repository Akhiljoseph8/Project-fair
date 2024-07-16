import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";
import { addProject } from '../services/allApis'
import {toast} from 'react-toastify'
import {addProjectResponseContext} from '../Context_api/ContextShare'
function Add() {

  const {addResponse, setAddResponse}=useContext(addProjectResponseContext)

  const [show, setShow] = useState(false);
  const [imageStatus,setImageStatus]=useState(false)
  const [preview,setPreview]=useState("")
  const [project,setProject]=useState({
    title:"",overview:"",languages:"",github:"",demo:"",image:""
  })
  useEffect(() => {
   if(project.image){
    if(project.image.type=="image/jpg" || project.image.type=="image/jpeg" || project.image.type=="image/png"){
      setImageStatus(false)
      setPreview(URL.createObjectURL(project.image))
    }else{
      setImageStatus(true)
      setPreview("")
      setProject({
        title:"",overview:"",languages:"",github:"",demo:"",image:""
      })
    }
   }
  }, [project.image])
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

const handleAddProject=async()=>{
  const {title,overview,languages,github,demo,image}=project
  console.log(project);
  if(!title || !languages || !github || !overview || !demo || !image){
    console.log("Invalid Input")
  }else{
    const formData= new FormData()
    formData.append("title",title)
    formData.append("overview",overview)
    formData.append("languages",languages)
    formData.append("github",github)
    formData.append("demo",demo)
    formData.append("image",image)

    const header={
      "Content-Type":'multipart/form-data',
      "Authorization":`Bearer ${sessionStorage.getItem('token')}`
    }

    const result= await addProject(formData,header)
    console.log(result)
    if(result.status==200){
      toast.success("Project added successfully")
      setProject({
        title:"",overview:"",languages:"",demo:"",github:"",image:""
      })
      setPreview("")
      handleClose()
      setAddResponse(result)
    }else{
      toast.error(result.response.data)
    }

  }
}

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="mb-3">
        Add Project
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard="false"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <label htmlFor="img">
                <input type="file" id="img" onChange={e=>setProject({...project,image:e.target.files[0]})} style={{ display: "none" }}></input>
                <img
                  className="img-fluid"
                  src={preview?preview:"https://w7.pngwing.com/pngs/527/625/png-transparent-scalable-graphics-computer-icons-upload-uploading-cdr-angle-text-thumbnail.png"}
                  alt=""
                />
              </label>
              {imageStatus &&
              <p className="text-danger">file format is not supported</p>
              }
            </Col>
            <Col>
              <FloatingLabel
                controlId="Title"
                label="Project Title"
                className="mb-3"
              >
                <Form.Control type="text" placeholder="Title" onChange={e=>setProject({...project,title:e.target.value})} />
              </FloatingLabel>
              <FloatingLabel
                controlId="over"
                label="Project Overview"
                className="mb-3"
              >
                <Form.Control type="text" placeholder="OverView" onChange={e=>setProject({...project,overview:e.target.value})} />
              </FloatingLabel>
              <FloatingLabel
                controlId="lang"
                label="Used Languages"
                className="mb-3"
              >
                <Form.Control type="text" placeholder="Languages" onChange={e=>setProject({...project,languages:e.target.value})} />
              </FloatingLabel>
              <FloatingLabel
                controlId="demo"
                label="Project Demo Url"
                className="mb-3"
              >
                <Form.Control type="text" placeholder="Demo Url" onChange={e=>setProject({...project,demo:e.target.value})}/>
              </FloatingLabel>
            </Col>
            <FloatingLabel
              controlId="git"
              label="Project Github Url"
              className="mb-3"
            >
              <Form.Control type="text" placeholder="GitHub" onChange={e=>setProject({...project,github:e.target.value})} />
            </FloatingLabel>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddProject}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Add;
