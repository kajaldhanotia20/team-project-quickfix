import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import backendServer from "../../webConfig";

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
  useEffect(() => {
    axios
      .get(`${backendServer}/api/hotels/getHotelById`, {
        params: { _id: "tajmahal@gmail.com" },
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
      <div style={{}}>
        <img src={image} width="1900px" height="400vh" />
      </div>
      <div style={{ margin: "2%" }}>
        <Typography>
          <Box sx={{ fontWeight: "bold", m: 1 }}>Name: {name}</Box>
          <Box sx={{ fontWeight: "bold", m: 1 }}>
            Description: {description}
          </Box>
          <Box sx={{ fontWeight: "bold", m: 1 }}>
            Working Hours: {workingHours}
          </Box>
          <Box sx={{ fontWeight: "bold", m: 1 }}>
            Contact number: {phoneNumber}
          </Box>
          <Box sx={{ fontWeight: "bold", m: 1 }}>
            Amenities:
            {amenities && amenities.length > 0
              ? amenities.map((ele) => {
                  return <p> - {ele}</p>;
                })
              : "temp"}
          </Box>
          <Box sx={{ fontWeight: "bold", m: 1 }}>
            Rate:
            {room
              ? Object.keys(room).map((ele) => {
                  return (
                    <p>
                      - {ele} : {room[ele]}$
                    </p>
                  );
                })
              : "temp"}
          </Box>
          <Box sx={{ fontWeight: "bold", m: 1 }}>
            Reviews:
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
          <Box sx={{ fontWeight: "bold", m: 1 }}>Location: {location}</Box>
          <Box sx={{ fontWeight: "bold", m: 1 }}>Rating: {rating}</Box>
        </Typography>
      </div>
    </div>
  );
};
export default HotelDetails;
