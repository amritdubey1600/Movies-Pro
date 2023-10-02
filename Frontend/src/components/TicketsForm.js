import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { Modal, Typography, Button, Box, Stack } from "@mui/material";

const TicketForm = ({ name }) => {
  const { user } = useAuthContext();

  const [uname, setUname] = useState("");
  const [tnumber, setTnumber] = useState(0);
  const [time, setTime] = useState("11 AM");
  const [isbooked, setIsbooked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object with the form data
    const formData = {
      mname: name,
      uname: uname,
      qty: tnumber,
      time: time,
    };

    const response = await fetch("https://movies-pro-1qpo.onrender.com/api/bookings/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setIsbooked(true);
      handleOpenModal();
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="ticketform">
      {!isbooked && (
        <form onSubmit={handleSubmit}>
          <h3>Book Tickets</h3>
          <label>Movie Name:</label>
          <input type="text" value={name} readOnly />
          <label>Your Name:</label>
          <input
            type="text"
            value={uname}
            onChange={(e) => setUname(e.target.value)}
          />
          <label>Qty:</label>
          <input
            type="number"
            value={tnumber}
            onChange={(e) => setTnumber(e.target.value)}
          />
          <label>Time:</label>
          <select value={time} onChange={(e) => setTime(e.target.value)}>
            <option value="11 AM">11 AM</option>
            <option value="2 PM">2 PM</option>
            <option value="7 PM">7 PM</option>
          </select>
          <button type="submit">Confirm</button>
        </form>
      )}

      {/* Modal */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Box sx={{ width: 300, bgcolor: "#111", p: 2, borderRadius: 2 }}>
            <Typography id="modal-title" variant="h6" component="div" sx={{color:'#fc3'}}>
                Tickets Booked
            </Typography>
            <Typography id="modal-description" sx={{ mt: 2 }}>
                <h4>Thank You {uname}!</h4>
            </Typography>
                <Stack direction="row" spacing={2} mt={2}>
                <Link to="/">
                <Button variant="contained" style={{ backgroundColor: "#fc3", color:'#111' }}>
                    Home
                </Button>
                </Link>
                <Link to='/bookings'>
                <Button variant="contained" style={{ backgroundColor: "#fc3", color:'#111' }}>
                    Bookings
                </Button>
                </Link>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default TicketForm;
