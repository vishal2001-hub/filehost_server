const {model,Schema} = require('mongoose');



const userSchema = new Schema({
    name:{
        type:"String",
        required:true
    },
    email:{
        type:"String",
        required:true
    },
    password:{
        type:"String",
        required:true
    },
    avatar:{
        type:"String",
        default:null
    }
},{
    timestamps: true
  });


const User = model('user',userSchema);

module.exports = User;