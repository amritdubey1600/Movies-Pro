const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    mname:{
        type:String,
        required:true
    },
    uname:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    qty:{
        type:Number,
        required:true
    },
    user_id:{
        type:String,
        required:true
    }
},{ timestamps: true });

module.exports = new mongoose.model('Booking',bookingSchema);
