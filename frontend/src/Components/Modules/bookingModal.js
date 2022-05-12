import React, { useEffect } from "react";
import {Button, Checkbox, Container, FormControlLabel, FormGroup, Rating, Stack, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Slider from '@mui/material/Slider';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Typography from "@mui/material/Typography";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import backendServer from "../../webConfig";
const axios = require('axios');

function valuetext(value) {
    return `${value}$`;
}



export default function BookingModal({BookingDetails}) {
    let booking= {BookingDetails};
    const [value, setValue] = React.useState(null);
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [ratingValue, setRatingValue] = React.useState(2);
    const [guests, setGuests] = React.useState(2);
    const [rooms, setRooms] = React.useState(1);
    const [cost, setCost] = React.useState(0);
    const [roomCost, setRoomCost] = React.useState(0);
    const [roomtype, setRoomType] = React.useState('');
    const mapping=  BookingDetails.Room_type_rate_mapping;
    const handleCostChange = (event, newCost) => {
        setCost(newCost);
    };

    const addGuests=()=>{
        setGuests(guests+1);
        console.log(guests)
        setCost(parseFloat(mapping[roomtype]) + (50* guests))
    }
    const addRooms=()=>{
        setRooms(rooms+1);
        setCost((parseFloat(mapping[roomtype]) + (50* guests))*rooms)
    }
    const handleRoomChange = (event) => {
        setRoomType(event.target.value);
        let roomtype = event.target.value;
        console.log(roomtype);
        // let mapping = BookingDetails.Room_type_rate_mapping;
        console.log(mapping[roomtype]);
        let roomcost = parseFloat(mapping[roomtype]);
        setCost(cost+ roomcost);
    };

    React.useEffect(()=>{
        console.log({BookingDetails})
    },[]);

    const createBooking = () => {
        console.log(booking)
        let data = {
            Hotel_id : BookingDetails._id,
            Customer_id: "c01",//BookingDetails.cust_id,
            Hotel_name: BookingDetails.Hotel_name,
            Customer_name: "C01",//BookingDetails.cust_name,

            Booking_period_days: endDate-startDate,
            Booking_start_date: startDate,
            Booking_end_date: endDate,
            Total_cost: cost,
            Created_at: BookingDetails.Created_at,
            Hotel_image: BookingDetails.Profile_image,
            Amenities: BookingDetails.Amenities
        }
        console.log(data)
        axios.post(`${backendServer}/api/booking/newBooking`, data).then(result => {
            console.log(result);
            if (result.status === 200) {
                return "Success"
            }
        })
    }


    return(
        <div>
                <Container  >
                    <h1>Hotel Booking</h1>
                    <br/>
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
                                        setEndDate(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Stack>
                        <div>
                            <Stack direction={"row"} justifyContent={"space-around"}>
                                <div>
                                    <br/>
                                    Amenities
                                    <Stack>
                                        <FormGroup>
                                            <FormControlLabel control={<Checkbox  />} label="Breakfast" />
                                            <FormControlLabel control={<Checkbox  />} label="Fitness Room" />
                                            <FormControlLabel control={<Checkbox  />} label="Parking" />
                                            <FormControlLabel control={<Checkbox  />} label="All meals" />
                                            <FormControlLabel control={<Checkbox />} label="Pet-friendly" />
                                        </FormGroup>
                                        <br/>
                                        <h3>Total Cost: {cost}</h3>
                                    </Stack>
                                </div>
                                <Stack direction={"column"}>
                                <div>
<br/>
                                    <FormControl fullWidth >
                                        <InputLabel >Room type</InputLabel>
                                        <Select
                                            value={roomtype}
                                            label="RoomType"
                                            onChange={handleRoomChange}
                                        >
                                            <MenuItem value={"doubleRoom"}>Double Rooms</MenuItem>
                                            <MenuItem value={"suite"}>Suites</MenuItem>
                                            <MenuItem value={"single"   }>Single Room</MenuItem>
                                        </Select>
                                    </FormControl>

                                </div>
                                    Number of guests: {guests}
                                    <Button variant="outlined" onClick={addGuests}   >+</Button>
                                    <br/>

                                    Number of rooms: {rooms}
                                    <Button variant="outlined" onClick={addRooms}   >+</Button>
                                    <br/>

                                <Stack>
                                    <Button variant="outlined"  onClick={createBooking} >Confirm</Button>
                                    <br/>
                                    <Button variant="outlined" >Modify</Button>
                                    <br/>
                                    <Button variant="outlined">Cancel</Button>
                                </Stack>
                                </Stack>
                            </Stack>
                        </div>
                    </Stack>
                </Container>
            <br/>
        </div>

    )
}
