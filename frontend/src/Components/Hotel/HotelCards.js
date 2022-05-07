import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Navbar from "./Navbar";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import backendServer from '../../webConfig';
import {Button, Modal} from "@mui/material";
import Box from "@mui/material/Box";
import BookingModal from '../Modules/bookingModal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    height: '80%',
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    // boxShadow: 24,
    // p: 4,
};

export default function HoteCards(searchText) {
    const [search, setSearch] = React.useState("");
    const [initialItems, setInitialItems] = React.useState([]);
    const [items, setItems] = React.useState(initialItems);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    var navigate = useNavigate();


    React.useEffect(()=>{
        async function settingUpData(){
            await console.log("called here!");
            var items = await axios.get(`${backendServer}/api/hotels/getHotelDetails`);
            console.log("items:",items.data);
            await setInitialItems(items.data);
            await setItems(items.data);
        }
        settingUpData();
    },[]);
    
    async function onTextChange(text){
        await setSearch(text);
        if(text!==""){
            setItems(initialItems.filter(word => word.Hotel_name.includes(text)));
        }
        else{
            setItems(initialItems);
        }
    }

    async function loadProfile(id){
        await sessionStorage.setItem("Hotel_Id",id);
        await navigate("/bookings");
    }

  return (
    <div>
        <Navbar onTextChange={onTextChange} search={search}/><br/>
        <Grid container spacing={2}
                    alignItems="center"
                    style={{ minHeight: '80vh' }}>
            {items.map((item, index) => {
                return <Grid item xs={4}>
                    <Card style = {{width:"100%", height:"100%"}}>
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
                        <Button size="small" onClick={handleOpen}>Select</Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={style}>
                                <BookingModal hotel_data={item}/>
                            </Box>
                        </Modal>
                        <Button size="small" onClick={()=>loadProfile(item._id)}>Learn More</Button>
                    </CardActions>
                    </Card>
                </Grid>
            })}
        </Grid>
    </div>
  );
}
