const jwt=require('jsonwebtoken')
const jwtMiddleware=(req,res,next)=>{
    console.log("inside jwtmiddlewarae")
    try{
    const token=req.headers.authorization.split(" ")[1]
    if(token){
        const result=jwt.verify(token,process.env.secretkey)
        console.log(result)
        req.payload=result.userId
    }else{
        res.status(406).json("Please login")
    }
    next()

    }catch(err){
       res.status(406).json("Please login first")
    }
}

module.exports=jwtMiddleware