const {Schema, model, Types} = require("mongoose")

const User = new Schema({
    email: {type:String , require:true, unique:true},
    password: {type:String,require:true},
    link:[{type:Types.ObjectId, ref:"Link"}]
})

module.exports = model("User" , User)