import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import backendServer from "../../webConfig";
import Navbar from "./Navbar";

const HotelDetails = ({ match }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [workingHours, setWorkingHours] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [image, setImage] = useState("");
  const [rating, setRating] = useState("");
  const [room, setRoom] = useState({});
  const [reviews, setReviews] = useState({});
  let id = sessionStorage.getItem("hotel_id");
  useEffect(() => {
    axios
      .get(`${backendServer}/api/hotels/getHotelById`, {
        params: { _id: id },
      })
      .then((response) => {
        let data = response.data[0];
        console.log(data);
        setName(data.Hotel_name);
        setDescription(data.Description);
        setWorkingHours(data.Working_hours);
        setPhoneNumber(data.Phone_number);
        setLocation(data.Hotel_location);
        setImage(data.Profile_image);
        setRating(data.Recommended_rating);
        setAmenities(data.Amenities);
        setRoom(data.Room_type_rate_mapping);
        setReviews(data.Reviews);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{}}>
        <img src={image} width="1869px" height="375vh" />
      </div>
      <div style={{ margin: "2%" }}>
        <Typography>
          <Box sx={{ fontWeight: "bold", m: 1 }}> {name}</Box>
          <Box sx={{ m: 1 }}>
            <span style={{ fontWeight: "bold" }}>Description: </span>
            {description}
          </Box>
          <Box sx={{ m: 1 }}>
            <span style={{ fontWeight: "bold" }}>Working Hours: </span>
            {workingHours}
          </Box>
          <Box sx={{ m: 1 }}>
            <span style={{ fontWeight: "bold" }}>Contact Number: </span>
            {phoneNumber}
          </Box>
          <Box sx={{ m: 1 }}>
            <span style={{ fontWeight: "bold" }}>Amenities:</span>
            {amenities && amenities.length > 0
              ? amenities.map((ele) => {
                  return <p> - {ele}</p>;
                })
              : "Data not found"}
          </Box>
          <Box sx={{ m: 1 }}>
            <span style={{ fontWeight: "bold" }}>Rate:</span>
            {room
              ? Object.keys(room).map((ele) => {
                  return (
                    <p>
                      - {ele} : {room[ele]}$
                    </p>
                  );
                })
              : "Data not found"}
          </Box>
          <Box sx={{ m: 1 }}>
            <span style={{ fontWeight: "bold" }}>Reviews:</span>
            {room
              ? Object.keys(reviews).map((ele) => {
                  return (
                    <p>
                      - {ele} : {reviews[ele]}
                    </p>
                  );
                })
              : "temp"}
          </Box>
          <Box sx={{ m: 1 }}>
            {" "}
            <span style={{ fontWeight: "bold" }}>Location: </span>
            {location}
          </Box>
          <Box sx={{ m: 1 }}>
            {" "}
            <span style={{ fontWeight: "bold" }}>Rating: </span> {rating}
          </Box>
        </Typography>
      </div>
    </div>
  );
};
export default HotelDetails;
