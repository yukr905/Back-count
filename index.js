const express = require("express")
const mongo = require("mongoose")
const app = express()
const PORT = 3000

app.use(express.json({extended:true}))
app.use("/auth",require("./router/auth-router"))
app.use("/auth",require("./router/link-router"))
app.use("/redirect", require("./router/redirect-router"))

async function  start(){
    try {
        mongo.connect("mongodb+srv://yehor:qqqqqq@cluster0.cmlx8gw.mongodb.net/?retryWrites=true&w=majority",{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        app.listen(PORT,()=>{
            console.log(`Server started ${PORT}`)
        })
    } catch (error) {
        console.log(error)   
    }
}
start()