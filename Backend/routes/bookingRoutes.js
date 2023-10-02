const express = require('express');
const requireAuth = require('../middlewares/requireAuth');
const {getBookings,createBooking,deleteBooking} = require('../controllers/bookingController');

const router = express.Router();

// middleware for verification
router.use(requireAuth);

router.get('/', getBookings);

router.post('/', createBooking);

router.delete('/:id', deleteBooking);

module.exports = router;