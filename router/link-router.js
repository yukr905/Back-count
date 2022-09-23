const Router = require("express")
const Link =require("../models/Link")
const shortid = require("shortid")
const config =require("../config/default.json")
const auth = require("../middleware/auth-middleware")

const router = Router()


router.post("/generate",auth,async(req,res)=>{
    try {
        const baseUrl = config.baseUrl
        const {from} = req.body
        const code = shortid.generate()
        
        const to = baseUrl+"/t/"+code
        const link = new Link({from,to,code,owner:req.user.userId})
        await link.save()
        res.status(201).json({message:"Ссылка создана"})
    } catch (error) {
        console.log(error)
        return res.status(404).json({message:"Неудалось получить ссылки"})
    }
})

router.get("/link/:id",auth,async(req,res)=>{
    try {
        const link = await Link.findById(req.params.id)
        res.status(200).json(link)
    } catch (error) {
        console.log(error)
        return res.status(404).json({message:"Неудалось создать  ссылку"})
    }
})
router.get("/links",auth,async(req,res)=>{
    try {
        const links = await Link.find({owner:req.user.userId})
        res.json(links)
    } catch (error) {
        console.log(error)
        return res.status(404).json({message:"Неудалось получить ссылки"})
    }
})


module.exports = router 