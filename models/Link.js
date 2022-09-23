const {Schema, model, Types} = require("mongoose")

const Link = new Schema({
    from:{type:String,require:true},
    to:{type:String,require:true,unique:true},
    code:{type:String,require:true, unique:true},
    data:{type:Date,default:Date.now},
    owner:{type:Types.ObjectId,ref:"User"},
    click:{type:Number,require:true,default:0}
    
})

module.exports = model("Link" , Link)