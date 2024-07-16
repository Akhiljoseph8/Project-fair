const { json } = require("express")
const projects = require("../Models/projectModel")

exports.addProject=async(req,res)=>{
    console.log("inside addproject")
    const {title,overview,languages,demo,github} =req.body
    console.log(req.file)
    const image= req.file.filename
    const userId= req.payload
    
    try{
  const result=await projects.findOne({github})
  if(result){
    res.status(401),json("project already exist")
  }else{
    const newProject= new projects({
        title,overview,languages,demo,github,image,userId
    })
    await newProject.save()
    res.status(200).json(newProject)
  }
    }catch(err){
     console.log(err)
     res.status(406).json(err)
    }
}

exports.homeProjects = async (req,res)=>{
  try{
    const result = await projects.find().limit(3)
    if(result){
      res.status(200).json(result)

    }else{
      res.status(401).json("No projects")
    }
  }catch(err){
    res.status(406).json(err)
  }
}

exports.allProjects = async (req,res)=>{
  try{
    const result = await projects.find()
    console.log(result)
    if(result){
      res.status(200).json(result)

    }else{
      res.status(401).json("No projects")
    }
  }catch(err){
    res.status(406).json(err)
  }
}

exports.userProjects = async (req,res)=>{
  const userId =req.payload
  try{
    const result = await projects.find({userId})
    if(result){
      res.status(200).json(result)

    }else{
      res.status(401).json("No projects")
    }
  }catch(err){
    res.status(406).json(err)
  }
}

exports.editProject = async (req,res)=>{
  const userId= req.payload
  const {pid}=req.params
  const {title, overview, languages, github, demo}=req.body
  const image=req.file ? req.file.filename : req.body.image
  try{
     const result= await projects.findByIdAndUpdate({_id:pid},{title, overview, languages, github, demo,userId},{new:true})
     await result.save()
     res.status(200).json(result)
  }catch(err){
    console.log(err)
    res.status(406).json(err)
  }
}

exports.removeProject =async(req,res)=>{
  const {pid}=req.params
  try{
    const result = await projects.findByIdAndDelete({_id:pid})
    res.status(200).json(result)
  }catch(err){
    console.log(err)
    res.status(406).json(err)
  }
}