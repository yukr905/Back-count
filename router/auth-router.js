const  Router = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const config = require("../config/default.json")
const {check,validationResult}= require("express-validator")

const router = Router()

router.post("/registration",[
    check("email","введите почту").isEmail(),
    check("password","пароль должен быть минимум 6 символов").isLength(6),
],async(req,res)=>{
    try{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({message:"Некоректные данные при регистрации"})
    }
    const {email , password} = req.body
    const candidate = await User.findOne({email})
    if(candidate){
        return res.status(404).json({message:"Пользователь уже зарегистрирован"})
    }
    const passwordHash = await bcrypt.hash(password,9)
    const user = new User({email:email , password:passwordHash})
    
    await user.save()
    res.status(201).json({succses:true})
}catch (e){
    console.log(e)
    return res.status(404).json({message:"Неудалось войти"})
}
})

router.post("/login",
[
check("email","Введите коректный email").normalizeEmail().isEmail(),
check("password","Введите пароль").exists()
]
,async(req,res)=>{
    try{
    const {email,password} = req.body
    const user = await User.findOne({email})
    if(!user){
        return res.status(404).json({message:"Пользователь не зарегистрирован"})
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(404).json({message:"Пользователь не зарегистрирован"})
    }
    const token =jwt.sign({
        userId:user._id},
        config.secret,
        {expiresIn:"1d"})

    res.status(200).json({token, userId:user._id})
    }catch(e){
        console.log(e)
        return res.status(404).json({message:"Неудалось войти"})
    }
})


module.exports = router 