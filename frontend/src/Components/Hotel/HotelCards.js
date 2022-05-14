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
import {Button, Container, Modal} from "@mui/material";
import HotelCard from './HotelCard';

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

export default function HoteCards(searchText) {
    const [search, setSearch] = React.useState("");
    const [initialItems, setInitialItems] = React.useState([]);
    const [items, setItems] = React.useState(initialItems);
    const [open, setOpen] = React.useState(false);


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


  return (
    <div>
        <Navbar onTextChange={onTextChange} search={search}/><br/>
        <Container>
        <Grid container spacing={2}>
            {items.map((data,index)=>{
                return <Grid item md ={4} sm={6} key={data._id}>
                    <HotelCard item={data}/>
                </Grid>
            })}
        </Grid>
        </Container>
    </div>
  );
}
