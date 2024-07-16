const express=require('express')
const router=express.Router()
const userController=require('../Controllers/userController')
const projectController=require('../Controllers/projectController')
const jwtmiddle=require('../Middleware/jwtMiddleware')
const multerMiddle=require('../Middleware/multiMiddleware')
router.post('/register',userController.userRegister)
router.post('/login',userController.userLogin)
router.post('/add-project',jwtmiddle,multerMiddle.single('image'), projectController.addProject)
router.get('/all-projects',jwtmiddle,projectController.allProjects)
router.get('/home-projects',projectController.homeProjects)
router.get('/user-projects',jwtmiddle,projectController.userProjects)
router.put('/edit-project/:pid',jwtmiddle,projectController.editProject)
router.delete('/remove-project/:pid',jwtmiddle,projectController.removeProject)
module.exports=router