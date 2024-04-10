const express = require('express');
const router = express.Router();

const Room = require('../models/room');

router.get('/all', async(req,res)=>{
    try{
        const rooms = await Room.find({});
        res.send({rooms});
        return rooms;
    }catch(error){
        res.status(400).json({message: error});
    } 
})

router.get('/:id', async(req,res)=>{
    try{
        //const room = await Room.findOne({_id: ObjectId(req.params.id)});
        const room = await Room.findOne({_id: req.params.id});
        res.send({room});
        return room;
    }catch(error){
        res.status(400).json({message: error});
    } 
})

router.post('/', async(req,res) => {

    const {name, maxCount, phoneNumber, rentPerDay, imageUrl1, imageUrl2, imageUrl3, type, description} = req.body;

    try{

        const newRoom = new Room({
            name, maxCount, phoneNumber, rentPerDay, imageUrls:[imageUrl1, imageUrl2, imageUrl3],currentBookings:[], type, description
        });
        const room = await newRoom.save();
        console.log(room); 
        
    }
    catch(err){
        res.status(400).json(err);
    }
})

module.exports = router;