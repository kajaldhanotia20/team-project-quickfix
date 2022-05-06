import Navbar from "./Navbar";
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import axios from "axios";
import backendServer from '../../webConfig';


const Bookings = () => {

    const [search, setSearch] = React.useState("");
    const [initialItems, setInitialItems] = React.useState([]);
    const [items, setItems] = React.useState(initialItems);

    React.useEffect(()=>{
        async function settingUpData(){
            await console.log("called here!");
            await sessionStorage.setItem("username","kd");
            var items = await axios.get(`${backendServer}/api/booking/getBookingsByName?name=${sessionStorage.getItem("username")}`);
            console.log("items:",items.data);
            await setInitialItems(items.data);
            await setItems(items.data);
        }
        settingUpData();
    },[]);
    
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
                        <img
                            src={item.image}
                            alt={item.Hotel_name}
                        />
                        {/* <ListItemAvatar>
                            <Avatar alt={item.Hotel_name} src="/static/images/avatar/2.jpg" />
                        </ListItemAvatar> */}
                        </TableCell>
                        <TableCell style={{width:'35%'}} align="left">
                            <TableRow>
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
                                            Booked Rooms with utilities like: Spa, Swimming Pool
                                        </Typography> <br/>
                                        Total Cost: ${item.Total_cost}
                                        </React.Fragment>
                                    }
                                />
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
                        <TableCell align="right">
                            Options
                        </TableCell>
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