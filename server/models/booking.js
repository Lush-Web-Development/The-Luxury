const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({

    room:{
        type: String,
        required: true
    },
    room_id:{
        type: String,
        required: true
    },
    user_id:{
        type: String,
        required: true
    },
    from_date:{
        type: String,
        required: true
    },
    to_date:{
        type: String,
        required: true
    },
    total_days:{
        type: Number,
        required: true
    },
    total_amount:{
        type: Number,
        required: true
    },
    total_days:{
        type: Number,
        required: true
    },
    transaction_id:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true,
        default: "Booked"
    }

},
{
    timestamps: true,
}
)

const bookingModel = mongoose.model('bookings', bookingSchema);

module.exports = bookingModel;