import React, { useEffect, useHistory } from "react";
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Rating,
  Stack,
  TextField,
} from "@mui/material";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Navigate } from "react-router";
import backendServer from "../../webConfig";
import { getDate } from "date-fns";
import { getDay } from "date-fns/esm";
const axios = require("axios");

function valuetext(value) {
  return `${value}$`;
}

export default function BookingModalModify({ BookingDetails, HotelDetails }) {
  let booking = { BookingDetails };
  let hoteldetails = {HotelDetails};
  const [value, setValue] = React.useState(null);
  const history = useNavigate();
  const [startDate, setStartDate] = React.useState(BookingDetails.Booking_start_date);
  const [days, setDays] = React.useState(0);
  const [endDate, setEndDate] = React.useState(BookingDetails.Booking_end_date);
  const [ratingValue, setRatingValue] = React.useState(2);
  const [guests, setGuests] = React.useState(Number(BookingDetails.Guests));
  const [rooms, setRooms] = React.useState(Number(BookingDetails.Rooms));
  const [cost, setCost] = React.useState(Number(BookingDetails.Total_cost));
  // sessionStorage.setItem("cost", 0);
  const [roomCost, setRoomCost] = React.useState(0);
  const [roomtype, setRoomType] = React.useState(BookingDetails.RoomType);
  const [mapping, setMapping] = React.useState("");
  const [Breakfast, setBreakfast] = React.useState(false);
  const [fitnessRoom, setFitnessRoom] = React.useState(false);
  const [swimming, setSwimming] = React.useState(false);
  const [parking, setParking] = React.useState(false);
  const [meals, setMeals] = React.useState(false);
  const navigate = useNavigate();

  // const handleCostChange = (event, newCost) => {
  //     setCost(newCost);
  // };

  const addGuests = async () => {
    await setGuests(guests + 1);
    console.log(guests);
    // getDays();
    // setCost(parseFloat(mapping[roomtype]) + (50* guests)*rooms)
    // await calculatePrice();
  };
  const subGuests = async () => {
    await setGuests(guests - 1);
    console.log(guests);
    // getDays();
    // await calculatePrice();
    // setCost((parseFloat(mapping[roomtype])* days) + (50* guests)* rooms)
  };


  const getDays = async () => {
    var Difference_In_Time = await endDate.getTime() - startDate.getTime();
    // To calculate the no. of days between two dates
    var Difference_In_Days = await Difference_In_Time / (1000 * 3600 * 24);
    console.log("days in",Math.trunc(Difference_In_Days));
    await setDays(Math.trunc(Difference_In_Days))
    // await setDays(getDate(endDate) - getDate(startDate));
    sessionStorage.setItem("days",Math.trunc(Difference_In_Days));
    // sessionStorage.setItem("days", getDate(endDate) - getDate(startDate));

    // console.log(days)
  };
  const addRooms = async () => {
    await setRooms(rooms + 1);
    await getDays();
    // await calculatePrice();
  };

  const subRooms = async () => {
    await setRooms(rooms - 1);
    await getDays();
    // await calculatePrice();
  };

  async function calculatePrice() {
    await getDays();
    var sessionDays = await sessionStorage.getItem("days");
    console.log(sessionDays, mapping[roomtype], roomtype, guests, rooms);

    // if(getDay(startDate))
    if (getDay(startDate) > 5 || getDay(endDate) > 5) {
      await setCost(
        (parseFloat(mapping[roomtype]) * sessionDays * 1.15) + (50 * (guests-2)) * rooms
      );
    } else {
      await setCost(
        (parseFloat(mapping[roomtype]) * sessionDays ) + (50 * guests) * rooms
      );
    }
  }

  const handleRoomChange = async (event) => {
    await setRoomType(event.target.value);
    // let roomtype = await event.target.value;
    // console.log(roomtype);
    // // let mapping = BookingDetails.Room_type_rate_mapping;
    // console.log(mapping[roomtype]);
    // let roomcost = await parseFloat(mapping[roomtype]);
    // // setCost(cost+ roomcost);
    // await calculatePrice();
  };

  const handleDateChange = async(event)=>{
    console.log(event)
    // console.log("here",date, getDate(endDate), getDate(date) - getDate(startDate))
    if(getDate(event) - getDate(startDate)>7){
      console.log("inside")
      await alert("You can book for 7 days only!");
      await setEndDate(null)
    }else{
      await setEndDate(event);
    }
    await getDays(event);
    
  }
  
  React.useEffect(() => {
    console.log(booking,HotelDetails.Room_type_rate_mapping);
    setMapping(HotelDetails.Room_type_rate_mapping);
    console.log(mapping);
  }, [BookingDetails, roomtype, endDate, rooms]);


  const createBooking = () => {
    console.log(booking);
    let amenities = [];
    if (Breakfast == true) {
      amenities.push("Daily Continental Breakfast");
    }
    if (swimming == true) {
      amenities.push("Access to Swimming Pool/Jacuzzi");
    }
    if (fitnessRoom == true) {
      amenities.push("Access to fitness room");
    }
    if (meals == true) {
      amenities.push("All meals included (Breakfast, Lunch, Dinner)");
    }

    let data = {
      Hotel_id: hoteldetails._id,
      Customer_id: sessionStorage.getItem("userid"), //BookingDetails.cust_id,
      Hotel_name: BookingDetails.Hotel_name,
      Customer_name: sessionStorage.getItem("username"), //BookingDetails.cust_name,
      Booking_period_days: sessionStorage.getItem("days"),
      Booking_start_date: startDate,
      Booking_end_date: endDate,
      Total_cost: Math.round(cost),
      Created_at: BookingDetails.Created_at,
      Hotel_image: BookingDetails.Profile_image,
      Guests: guests,
      Rooms: rooms,
      RoomType: roomtype,
      _id: BookingDetails._id,
      Amenities: amenities, //BookingDetails.Amenities
    };
    console.log("Modify boooking: ",data);
      axios
        .post(`${backendServer}/api/booking/updateBooking`, data)
        .then((result) => {
          console.log(result);
          if (result.status === 200) {
            // return "Success"
            alert("Booking updated");
            sessionStorage.removeItem("type");
            history("/Dashboard");
          }
        });
  };

  useEffect(() => {
    calculatePrice();
  }, [roomtype, rooms, guests]);

  return (
    <div>
      <Container>
        <br/>
        <img src="https://i.pinimg.com/originals/c8/88/89/c8888942b5d00fc30ad2aa19fd45280b.gif" alt='' width="300" height="100" />
        <Stack>
          <Stack direction={"row"} justifyContent={"space-around"}>
            {/*<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>*/}
            {/*    <LocationOnIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />*/}
            {/*    <TextField id="input-with-sx" label="Location" variant="standard" />*/}
            {/*</Box>*/}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Check-in Date"
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Check-out Date"
                value={endDate}
                onChange={(newValue) => {
                  handleDateChange(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Stack>
          <div>
            <Stack direction={"row"} justifyContent={"space-around"}>
              <div>
                <br />
                Amenities
                <Stack>
                  <FormGroup>
                    <FormControlLabel
                      value={Breakfast}
                      onClick={() => {
                        setBreakfast(!Breakfast);
                      }}
                      control={<Checkbox />}
                      label="Daily Continental Breakfast"
                    />
                    <FormControlLabel
                      value={fitnessRoom}
                      onClick={() => {
                        setFitnessRoom(!fitnessRoom);
                      }}
                      control={<Checkbox />}
                      label="Access to fitness room"
                    />
                    <FormControlLabel
                      value={parking}
                      onClick={() => {
                        setParking(!parking);
                      }}
                      control={<Checkbox />}
                      label="Daily Parking"
                    />
                    <FormControlLabel
                      value={meals}
                      onClick={() => {
                        setMeals(!meals);
                      }}
                      control={<Checkbox />}
                      label="All meals included (Breakfast, Lunch, Dinner)"
                    />
                    <FormControlLabel
                      value={swimming}
                      onClick={() => {
                        setSwimming(!swimming);
                      }}
                      control={<Checkbox />}
                      label="Access to Swimming Pool/Jacuzzi"
                    />
                  </FormGroup>
                  <br />
                  <Typography >Base room price: {mapping[roomtype]} $</Typography>
                  <Typography variant="caption">There may be a price hike on weekends and holidays</Typography>
<br/>
                  <h3 >Total Cost: {isNaN(cost) ? 0 : cost} $</h3>
                </Stack>
              </div>
              <Stack direction={"column"}>
                <div>
                  <br />
                  <FormControl fullWidth>
                    <InputLabel>Room type</InputLabel>
                    <Select
                      value={roomtype}
                      label="RoomType"
                      onChange={handleRoomChange}
                      defaultValue={roomtype}
                    >
                      <MenuItem value={"doubleRoom"}>Double Rooms</MenuItem>
                      <MenuItem value={"suites"}>Suites</MenuItem>
                      <MenuItem value={"singleRoom"}>Single Room</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                Number of guests: {guests}
                <Button variant="outlined" onClick={addGuests}>
                  +
                </Button>
                <Button variant="outlined" onClick={subGuests}>
                  -
                </Button>
                <br />
                Number of rooms: {rooms}
                <Button variant="outlined" onClick={addRooms}>
                  +
                </Button>
                <Button variant="outlined" onClick={subRooms}>
                  -
                </Button>
                <br />
                <Stack>
                  <Button variant="outlined" onClick={createBooking}>
                    Confirm
                  </Button>
                  <br />
                  {/* <Button variant="outlined" >Modify</Button>
                                    <br/> */}
                  {/* <Button variant="outlined">Cancel</Button> */}
                </Stack>
              </Stack>
            </Stack>
          </div>
        </Stack>
      </Container>
      <br />
    </div>
  );
}
