const Booking = require('../models/bookingModel');
const mongoose = require('mongoose');

const getBookings = async(req,res) =>{
    const user_id = req.user._id; // payload of jwt attached using middleware

    const bookings = await Booking.find({user_id}).sort({createdAt:-1});

    res.status(200).json(bookings);
};

const createBooking = async(req,res)=>{
    const user_id = req.user._id;

    const {mname,uname,time,qty} = req.body;

    try {
        const booking = await Booking.create({mname,uname,time,qty,user_id});
        res.status(200).json(booking);
    } catch (error) {
        res.status(400).json({err: err.message});
    }
};

const deleteBooking = async (req, res) => {
    const { id } = req.params; // Assuming your route parameter is named 'id'

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({ error: 'ID not valid' });

    try {
        const booking = await Booking.findOneAndDelete({ _id: id });

        if (!booking)
            return res.status(400).json({ error: 'No such booking found' });

        return res.status(200).json(booking);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {getBookings,createBooking,deleteBooking};