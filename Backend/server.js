require('dotenv').config();
const cors=require('cors');
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const mongoose = require('mongoose');

const app=express();

app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next();
});

app.use(cors());
app.use(express.json());

app.use('/api/user',userRoutes);
app.use('/api/bookings',bookingRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    if(process.env.PORT){
        app.listen(process.env.PORT, ()=>{
            console.log(`Connected to DB and server is working on port ${process.env.PORT}`);
        });
    }
});

