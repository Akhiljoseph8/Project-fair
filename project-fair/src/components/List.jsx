import React from "react";
import Edit from "./Edit";
import { deleteProject } from "../services/allApis";
import { toast } from "react-toastify";

function List({project}) {

const handleDelete=async(id)=>{
  const header={
    "Content-Type":'application/json',
    "Authorization":`Bearer ${sessionStorage.getItem('token')}`
  }
  const result=await deleteProject(header,id)
  if(result.status==200){
    toast.success("Project deleted Successfully")
    
  }else{
    console.log(result.response.data)
    toast.error("deletion failed")
  }
}

  return (
    <>
      <div className="d-flex justify-content-between border shadow p-3 mb-3">
        <h3>{project.title}</h3>
        <div>
          <a href={project.github}>
            <i className="fa-brands fa-github fa-2xl"></i>
          </a>
          <Edit project={project}/>
         
          <button className="btn ms-2" onClick={()=>{handleDelete(project._id)}}>
            <i className="fa-solid fa-trash fa-2xl"></i>
          </button>
        </div>
   
      </div>
    </>
  );
}

export default List;
