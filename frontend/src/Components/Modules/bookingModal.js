import React, { useEffect } from "react";
import { Checkbox, Container, FormControlLabel, FormGroup, Rating, Stack, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import Slider from '@mui/material/Slider';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Typography from "@mui/material/Typography";

function valuetext(value) {
    return `${value}$`;
}

export default function BookingModal() {
    const [value, setValue] = React.useState(null);
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [ratingValue, setRatingValue] = React.useState(2);
    const [cost, setCost] = React.useState([10, 50]);

    const handleCostChange = (event, newCost) => {
        setCost(newCost);
    };

    return(
        <div>
                <Container maxWidth="xl">
                    <h1>Hotel Booking</h1>
                    <Stack>
                        <Stack direction={"row"}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <LocationOnIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField id="input-with-sx" label="Location" variant="standard" />
                            </Box>
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
                            <Stack direction={"row"}>
                                <Container>
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
                                        <Box sx={{ width: 300 }}>
                                            <Slider
                                                getAriaLabel={() => 'Cost range'}
                                                value={cost}
                                                onChange={handleCostChange}
                                                valueLabelDisplay="auto"
                                                getAriaValueText={valuetext}
                                            />
                                        </Box>
                                        <Typography component="legend">Controlled</Typography>
                                        <Rating
                                            name="simple-controlled"
                                            value={ratingValue}
                                            onChange={(event, newRatingValue) => {
                                                setRatingValue(newRatingValue);
                                            }}
                                        />
                                    </Stack>
                                </Container>
                                <div>
                                    bye
                                </div>
                            </Stack>
                        </div>
                    </Stack>
                </Container>
            <br/>
        </div>

    )
}
