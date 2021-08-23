const router = require('express').Router();
const File = require("../models/File");
const User = require("../models/User");

router.post('/upload',async (req,res)=>{
    const {name,url,upload_by,file_type} = req.body;
    const newPublicFile = await new File({
        file_name:name,
        url,
        upload_by,
        file_type
    }).save();

    if(!newPublicFile){
        return res.status(400).send({message:"Error in saving file"});
    }
    res.status(200).send({message:"File uploaded successfully!",record:newPublicFile});
})
.get('/list',async (req,res)=>{
    const publicFiles = await File.find();
    return res.status(200).send(publicFiles);
})
.get('/list/private',async (req,res)=>{
    const {upload_by} = req.params;
    console.log(req.params);
    const privateFiles = await File.find({upload_by:upload_by});
    return res.status(200).send(privateFiles);
})

module.exports = router;