import Navbar from "./Navbar";
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import axios from "axios";
import backendServer from '../../webConfig';


const Bookings = () => {

    const [search, setSearch] = React.useState("");
    const [initialItems, setInitialItems] = React.useState([]);
    const [items, setItems] = React.useState(initialItems);

    React.useEffect(()=>{
        async function settingUpData(){
            await console.log("called here!");
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
            setItems(initialItems.filter(word => word.includes(text)));
        }
        else{
            setItems(initialItems);
        }
    }

return(
    <div>
        <Navbar onTextChange={onTextChange} search={search}/>
        <br/>
        <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
            {items.map((item, index) => {
            return <div>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                </ListItemAvatar>
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
                        {item.Hotel_name}
                    </Typography>
                    {`Booking Period: ${item.Booking_start_date} : ${item.Booking_end_date}`}
                    </React.Fragment>
                }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
            </div>
            })}
        </List>
        {/* <Grid container spacing={2}
                    alignItems="center"
                    style={{ minHeight: '80vh' }}>
            {items.map((item, index) => {
                return <Grid item xs={4}>
                    <Card style = {{width:"100%", height:"100%"}}>
                    <CardMedia
                        component="img"
                        height="140"
                        image="/static/images/cards/contemplative-reptile.jpg"
                        alt={item}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5">
                        {item}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        Lizards are a widespread group of squamate reptiles, with over 6,000
                        species, ranging across all continents except Antarctica
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Share</Button>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                    </Card>
                </Grid>
            })}
        </Grid> */}
    </div>
);
}

export default Bookings;