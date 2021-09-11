const router = require('express').Router();
const User = require('../models/User');
const { check, validationResult }
    = require('express-validator');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


router.get('/user',async (req,res)=>{
    console.log(req.headers)
    const token = req.headers.authorization;
    if(!token){
        return res.status(400).send({message:"Auth Token Required!"});
    }

    const isValid = await jwt.verify(token,"mysecretkey");

    if(!isValid){
        return res.status(401).send({message:"Invalid Auth Token"});
    }
    req.user = isValid;

   const {id} = req.user;

   //find a user with this id

   const user = await User.findOne({_id:id});

   res.status(200).send({name:user.name,email:user.email,id:user._id});
}).post('/register',check('email','Invalid Email').isEmail(),async (req,res)=>{
    console.log(req.body);
    const errors = validationResult(req);
    const {name,email,password} = req.body;

    if(!errors.isEmpty()){
        return res.status(400).send({errors:errors});
    }

    //find the user with this email
    const user = await User.findOne({email:email});

    if(user){
        return res.status(400).send({message:"User Already Exists with this email!"})
    }

    const hash = await bcrypt.hashSync(password,10);
    const newUser = new User({
        name,
        email,
        password:hash
    }).save();

    if(newUser){
        res.status(200).send({message:"User Registration Done!"});
    }


    



})
.post('/login',async (req,res)=>{
    const {email,password} = req.body;
    if(email.length===0 || password.length===0){
        return res.status(401).send({message:"All fields required!"})
    }

    const user = await User.findOne({email:email});

    if(!user){
        return res.status(404).send({message:"No username found with this email!"});
    }

    const isValidPassword = await bcrypt.compareSync(password,user.password);

    if(!isValidPassword){
        return res.status(401).send({message:"Invalid username & password!"});
    }

    const token = await jwt.sign({id:user._id},"mysecretkey");
    // console.log(token)

    res.status(200).send(token);


})

module.exports = router;


// SERVER