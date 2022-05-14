import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import backendServer from "../../webConfig";
import { Button, Modal } from "@mui/material";
import Box from "@mui/material/Box";
import BookingModal from "../Modules/bookingModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  height: "90%",
  bgcolor: "background.paper",
  // border: '2px solid #000',
  // boxShadow: 24,
  // p: 4,
};

export default function HotelCard({ item }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const goToHotelPage = (id) => {
    sessionStorage.setItem("hotel_id", id);
    navigate("/hoteldetails");
  };

  React.useEffect(() => {
    console.log("items in hotel:", item);
  });
  return (
    <Card style={{ width: "100%", height: "100%" }}>
      <CardMedia
        component="img"
        height="140"
        image={item.Profile_image}
        alt={item.Hotel_name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {item.Hotel_name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.Description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleOpen}>
          Select
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <BookingModal BookingDetails={item} />
          </Box>
        </Modal>
        <Button
          size="small"
          onClick={() => {
            goToHotelPage(item._id);
          }}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
