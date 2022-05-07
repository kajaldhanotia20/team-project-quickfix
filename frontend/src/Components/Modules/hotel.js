import React, { useEffect } from "react";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

export default function Hotel() {
    const theme = useTheme();
    return(
        <div>
            <Card sx={{ display: 'flex' , width:'350px', height:'200px'}}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="h5">
                            Hotel Name
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            Some random data
                        </Typography>
                    </CardContent>
                    <FormControl fullWidth>
                        <InputLabel>Room Type</InputLabel>
                        <Select
                            // value={age}
                            label="Room Type"
                            // onChange={handleChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <br/>
                </Box>
                <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image="/static/images/cards/live-from-space.jpg"
                    alt="Live from space album cover"
                />
            </Card>
            <br/>
        </div>
    )
}
