const mongoose = require("mongoose");
// const { type } = require("os");
const { Schema } = mongoose;
const Personschema = new Schema({
    name:
        {type:String,
        required: true,},
    
        age:{type:Number} ,
    
        favoriteFoods:[{
             type:String
        }]
})
module.exports=Person=mongoose.model("Person", Personschema);