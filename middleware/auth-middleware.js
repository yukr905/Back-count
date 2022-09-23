const jwt = require("jsonwebtoken")
const config = require("../config/default.json")

module.exports = (req,res,next)=>{
    if(req.method==="OPTIONS"){
        next()
    }
    try{
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token,config.secret)
    req.user = decoded
    next()
    }catch(e){
        console.log(e)
        return res.status(400).json({message:"Нет доступа"})
    }
}
