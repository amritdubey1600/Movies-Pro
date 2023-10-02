import React, { useEffect, useState } from "react";
import { useAuthContext } from '../hooks/useAuthContext';
import { Button, Stack, Modal, Typography, Box } from "@mui/material";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const Bookings = ({ movies }) => {
  const { user } = useAuthContext();
  const [allBookings, setAllBookings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const handleOpenModal = (id) => {
    setSelectedBookingId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmCancel = async () => {
    const response = await fetch(`https://movies-pro-1qpo.onrender.com/api/bookings/${selectedBookingId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });

    if (response.ok) {
      setAllBookings(allBookings.filter(booking => booking._id !== selectedBookingId));
      handleCloseModal();
    }
  };

  useEffect(() => {
    async function fetchBookings() {
      if (!user)
        return;

      const response = await fetch('https://movies-pro-1qpo.onrender.com/api/bookings/', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (response.ok) {
        const json = await response.json();
        setAllBookings(json);
      }
    }

    fetchBookings();
  }, [user]);

  return (
    <div>
      {allBookings.length === 0 && (<h1 style={{ margin: '20px 10px' }}>No Bookings found!</h1>)}
      {allBookings.map(booking => (
        <div className="booking-component" key={booking._id}>
          <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
              <Stack>
                <img src={getMovieImg(booking.mname, movies)} alt={booking.mname} />
              </Stack>
              <Stack>
                <h2>{booking.mname}</h2>
                <p><span>Name:</span>    {booking.uname}</p>
                <p><span>Tickets:</span> {booking.qty}</p>
                <p><span>Time:</span>    {booking.time}</p>
                <footer>Booked {formatDistanceToNow(new Date(booking.createdAt), { addSuffix: true })}</footer>
              </Stack>
            </Stack>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => handleOpenModal(booking._id)}
              className="btn"
            >
              Cancel
            </Button>
          </Stack>
        </div>
      ))}

      {/* Modal */}
        <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        >
        <Box
            sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh', // Adjust this based on your design
            }}
        >
            <Box sx={{ width: 300, bgcolor: '#111', p: 2, borderRadius: 2 }}>
            <Typography id="modal-title" variant="h6" component="div" sx={{color:'#fc3'}}>
                Cancel Booking?
            </Typography>
            <Typography id="modal-description" sx={{ mt: 2 }}>
                This action cannot be undone.
            </Typography>
            <Stack direction="row" spacing={2} mt={2}>
                <Button variant="contained" onClick={handleConfirmCancel} color="error">
                Yes
                </Button>
                <Button variant="outlined" onClick={handleCloseModal}>
                No
                </Button>
            </Stack>
            </Box>
        </Box>
        </Modal>

    </div>
  );
}

// Helper function
const getMovieImg = (name, movies) => {
  const movieImg = movies
    .find(movie => movie.show.name === name)
    ?.show.image.medium;
  return movieImg;
}

export default Bookings;
