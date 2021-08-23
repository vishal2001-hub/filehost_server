const express = require('express');
const user = require('./User')
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
app.use(express.json())
const auth = require('./routes/auth_routes');
const file = require('./routes/file_routes');
app.get('/',(req,res)=>{
    res.send(user)
})
app.use(cors())
app.use('/auth',auth);
app.use('/file',file);

mongoose.connect('mongodb+srv://admin-summit:2146255sb8@cluster0.fyuq8.mongodb.net/fileHost',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('Database connected!');
}).catch((e)=>{
        console.log(e);
})

const port = process.env.PORT || 5000;


app.listen(port,()=>{
    console.log(`Application running on ${port}`)
})