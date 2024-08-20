const mongoose = require('mongoose');


const mongoURL = 'mongodb+srv://harithmadu:myhoteldb@cluster0.klue1z8.mongodb.net/hotel-booking';

mongoose.connect(mongoURL, {useUnifiedTopology:true, useNewUrlParser:true});

var connection = mongoose.connection;

connection.on('error',()=>console.log("DB connection failed."));
connection.on('connected',()=>console.log("DB connection successful."));

module.exports = mongoose;