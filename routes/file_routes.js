const router = require('express').Router();
const File = require("../models/File");
const User = require("../models/User");

router.post('/upload',async (req,res)=>{
    const {name,url,upload_by,file_type,size} = req.body;
    const newPublicFile = await new File({
        file_name:name,
        url,
        upload_by,
        file_type,
        size
    }).save();

    if(!newPublicFile){
        return res.status(400).send({message:"Error in saving file"});
    }
    res.status(200).send({message:"File uploaded successfully!",record:newPublicFile});
})
.get('/list/:id',async (req,res)=>{
    console.log(req.params)
    const publicFiles = await File.find({upload_by:req.params.id,inTrash:false});
    return res.status(200).send(publicFiles);
})
.get('/list/trash/:id',async (req,res)=>{
    console.log(req.params)
    const publicFiles = await File.find({upload_by:req.params.id,inTrash:true});
    return res.status(200).send(publicFiles);
})
.put('/trash/:id',async(req,res)=>{
    const {id} = req.params;

    File.updateOne({_id:id},{inTrash:true}).then(()=>{
        return res.status(200).send({message:"File Moved to Trash!"})
    }).catch((e)=>{
        res.status(200).send({message:"Error while Move to Trash!"})
    })
}).
put('/untrash/:id',async(req,res)=>{
    const {id} = req.params;

    File.updateOne({_id:id},{inTrash:false}).then(()=>{
        return res.status(200).send({message:"File Restored from Trash!"})
    }).catch((e)=>{
        res.status(200).send({message:"Error while Restoring from Trash!"})
    })
})


module.exports = router;