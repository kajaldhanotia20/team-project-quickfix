import Navbar from "./Navbar";
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import {Stack, Button} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { Modal} from "@mui/material";
import { ListItemAvatar } from '@mui/material';
import Box from "@mui/material/Box";
import BookingModal from '../Modules/bookingModal';
import axios from "axios";
import backendServer from '../../webConfig';
import BookingModalModify from "../Modules/bookingModal_Modify";
import { styled } from '@mui/material/styles';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    height: '90%',
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    // boxShadow: 24,
    // p: 4,
};

const Bookings = () => {

    const [search, setSearch] = React.useState("");
    const [initialItems, setInitialItems] = React.useState([]);
    const [items, setItems] = React.useState(initialItems);
    const [deleteFlag, setDeleteFlag] = React.useState(false);
    const [hotelDetails, setHotelDetails] = React.useState({});
    const [bookingDetails, setBookingDetails] = React.useState({});
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    React.useEffect(()=>{
        async function settingUpData(){
            if (sessionStorage.getItem("usertype")==="Hotel"){
                var items = await axios.get(`${backendServer}/api/booking/getBookingsByHotelID?id=${sessionStorage.getItem("userid")}`);
            }
            else{
                var items = await axios.get(`${backendServer}/api/booking/getBookingsByID?id=${sessionStorage.getItem("userid")}`);
            }
            console.log("items:",items.data);
            await setInitialItems(items.data);
            await setItems(items.data);
        }
        settingUpData();
    },[deleteFlag]);

    async function Modify(item){
        var details = await axios.get(`${backendServer}/api/hotels/getHotelById?_id=${item.Hotel_id}`)
        await setHotelDetails(details.data);
        await setBookingDetails(item);
        setOpen(true);
    }

    async function DeleteBooking(id){
        // let data ={
        //     id: "4"
        // }
        console.log(id)
        var res = await axios.post(`${backendServer}/api/booking/deleteBooking?id=${id}`);
        setDeleteFlag(true);
        console.log(res);
        
    }
    
    async function onTextChange(text){
        await setSearch(text);
        if(text!=""){
            setItems(initialItems.filter(word => word.Hotel_name.includes(text)));
        }
        else{
            setItems(initialItems);
        }
    }

    function getDate(date){
        var new_date = new Date(date);
        var month = new_date.getMonth()
        // return new_date.getMonth() +" - "+ new_date.getDate() +" - "+new_date.getFullYear()
        return new_date.toDateString()
    }
    const ColorButton = styled(Button)(({ theme }) => ({
    
        backgroundColor: 'black',
      
    }));

return(
    <div>
        <Navbar onTextChange={onTextChange} search={search}/>
        <br/>
        <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
            {items.map((item, index) => {
            return <div>
            <ListItem alignItems="flex-start">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableBody>
                        <TableRow>
                        <TableCell style={{width:'30%'}}>
                        {sessionStorage.getItem("usertype")==="Customer"&&
                        <img
                            src={item.image}
                            alt={item.Hotel_name}
                            height='100%'
                            width='100%'
                        />}

                        {sessionStorage.getItem("usertype")==="Hotel"&&
                            <ListItemAvatar>
                                <Avatar alt={item.Customer_name} src="/static/images/avatar/2.jpg" />
                            </ListItemAvatar>
                        // <img
                        //     src="/"
                        //     alt={item.Customer_name}
                        // />
                        }
                        {/* <ListItemAvatar>
                            <Avatar alt={item.Hotel_name} src="/static/images/avatar/2.jpg" />
                        </ListItemAvatar> */}
                        </TableCell>
                        <TableCell style={{width:'35%'}} align="left">
                            <TableRow>
                                {sessionStorage.getItem("usertype")==="Customer"&&
                                <ListItemText
                                    primary={item.Hotel_name}
                                    secondary={
                                        <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            Booked Rooms with utilities:
                                            {item.Amenities.map((amenity,index)=>{
                                                return <h5>{amenity}</h5>
                                            })}
                                        </Typography> <br/>
                                        <b>Total Cost: ${item.Total_cost}</b>
                                        </React.Fragment>
                                    }
                                />}

                                {sessionStorage.getItem("usertype")==="Hotel"&&
                                <ListItemText
                                    primary={item.Customer_name}
                                    secondary={
                                        <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            Rate per day: {item.Rate_per_day}
                                        </Typography> <br/>
                                        <b>Total Cost: ${item.Total_cost}</b>
                                        </React.Fragment>
                                    }
                                />}

                            </TableRow>
                            <TableRow><br/></TableRow>
                            <TableRow >
                                <td style={{width:'50%'}}>
                                    <b>Booking Start Date</b><br/>{getDate(item.Booking_start_date)}<br/>
                                </td>
                                <td style={{width:'50%'}}>
                                    <b>Booking End Date</b><br/>{getDate(item.Booking_end_date)} <br/>
                                </td>
                            </TableRow>
                        </TableCell>
                        {sessionStorage.getItem("usertype")==="Customer" &&
                        <TableCell style={{width:'35%'}} align="right">
                                <ColorButton variant="contained" color="primary" onClick={()=>{Modify(item)}}>Modify</ColorButton> &nbsp; &nbsp;
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <BookingModalModify BookingDetails = {bookingDetails} HotelDetails={hotelDetails[0]} />
                                    </Box>
                                </Modal>

                                <ColorButton variant="contained" color="warning" onClick={()=>DeleteBooking(item._id)}>Cancel</ColorButton>
                        </TableCell>
                        }

                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer><br/>
            </ListItem>
            <Divider variant="inset" component="li" />
            </div>
            })}
        </List>
    </div>
);
}

export default Bookings;