const express = require('express');
const router = express();
const Booking = require('../models/booking');
const Room = require('../models/room');

router.post('/', async(req,res) => {

    const {room, room_id, user_id, from_date, to_date, total_days, total_amount} = req.body;

    try{

        const newBooking = new Booking({
            room, room_id, user_id, from_date, to_date, total_days, total_amount, transaction_id:'1234'
        });

        const currentRoom = await Room.findOne({_id: room_id});

        let datesFree = true;

        for(const booking of currentRoom.currentBookings){
            const pastFromDate = new Date(booking.from_date);
            const pastToDate = new Date(booking.to_date);
            const currentFromDate = new Date(booking.from_date);
            const currentToDate = new Date(booking.to_date);
            if(currentToDate.getTime() > pastFromDate.getTime() 
                || currentFromDate.getTime() < pastToDate.getTime() 
            ){
                datesFree = false;
                break;
            }
        }

        if(datesFree){
            const booking = await newBooking.save();
            console.log(booking);

            currentRoom.currentBookings.push({
                booking_id: booking._id,
                user_id: user_id,
                transaction_id: newBooking.transaction_id,
                from_date: from_date,
                to_date: to_date,
                status: booking.status, 
            });
            await currentRoom.save();
            res.send("Room is booked successfully.")
        }else{
            res.send("Room is not available for these dates.");
        }
        
    }
    catch(err){
        res.status(400).json(err);
    }
})

router.get('/all', async(req,res)=>{
    try{
        const bookings = await Booking.find();
        res.send(bookings);
    }
    catch(err){
        res.status(400).json(err);
    }
})

router.get('/:user_id', async(req,res)=>{
    const user_id = req.params.user_id;
    try{
        const bookings = await Booking.find({user_id: user_id});
        res.send(bookings);
    }
    catch(err){
        res.status(400).json(err);
    }
})

router.post('/cancel/:id', async (req,res) => {
    const id = req.params.id;
    let room_id;
    try{
        const booking = await Booking.findOne({_id: id});
        //res.send(booking);
        booking.status = "Cancelled";
        room_id = booking.room_id;
        await booking.save();

        const room = await Room.findOne({_id: room_id});
        console.log(room.currentBookings);
        const room_bookings = room.currentBookings.filter(booking => booking.booking_id.toString() !== id);
        room.currentBookings = room_bookings;
        console.log(room.currentBookings);
        await room.save();

        res.json("Booking was cancelled successfully.");
    }
    catch(err){
        res.status(400).json(err);
    }
})

module.exports = router;