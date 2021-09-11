const {model,Schema} = require('mongoose');


const fileSchema = new Schema({
    file_name:{
        type:"String",
        required:true
    },
    url:{
        type:"String",
        required:true
    },
   upload_by:{
       type:"String",
       required:true
   },
   file_type:{
       type:"String",
       required:true
   },
   share_to:{
       type:"Array",
       default:[]
   }

})


const File = model('File',fileSchema);

module.exports = File;