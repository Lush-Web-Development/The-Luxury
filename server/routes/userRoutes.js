const express = require('express');
const router = express();
const User = require('../models/user');

router.post('/register', async(req,res)=>{
    const newUser = new User(req.body);
    try{
        const user = await newUser.save();
        res.send("You registered successfully.");
    }
    catch(err){
        res.status(400).json(err);
    }
})

router.post('/login', async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email:email, password:password});
        res.send(user);
    }
    catch(err){
        res.status(400).json({message:"Login failed."});
    }
})

router.get('/all', async(req,res)=>{
    try{
        const users = await User.find();
        res.send(users);
    }
    catch(err){
        res.status(400).json(err);
    }
})

module.exports = router;