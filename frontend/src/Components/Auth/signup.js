import React, {useEffect} from "react";
import  { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import  {makeStyles}  from '@material-ui/core/';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from "prop-types";
import  {useState} from "react";
import {Navigate} from 'react-router';
import { color } from "@mui/system";
import { styled } from '@mui/material/styles';

import Logo from '../../logo.png'


const useStyles= makeStyles({
    button1: {
        width:200,
        height:50,
        fontSize: 20,
        
      }
})

const ColorButton = styled(Button)(({ theme }) => ({
    
      backgroundColor: 'black',
    
  }));



export default function Signup() {
    const Classes = useStyles()
    const [name, setName]= useState('')
    const [password, setPassword]= useState('')
    const [error, setError]= useState(false);
    const [email, setEmail]= useState('');
    const [phone, setPhone]=useState('');
    const [type, setType]=useState('Customer');
    const history = useNavigate();
    let redirectvar =''



    function signup(){
        fetch(`http://localhost:8000/api/UserRoute/signup`,{
            method:'POST',
            headers:{"Content-type": "application/json"},
            body: JSON.stringify({
                name:name,
                password:password,
                email: email,
                phone: phone,
                type: type
            })})
            .then(res =>
                // console.log(JSON.stringify(res))
                res.json())
        .then(data => {
            // console.log(data)
            setError(data.message)})
            history("/login")
    }

   
    
    return(
      
        <header style={ HeaderStyle }>
            <div classname="logo"><center><img src={Logo} alt="Logo"/> </center> 
        <Container>
            {redirectvar}
        <div>
        <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
            >
             
            <Grid item xs={3}> 
            <Typography variant="h4">Let's get started.</Typography>
            <Typography color="red">{error}</Typography>
            </Grid>
            <Grid item xs={3}> 
            {/* <Typography variant="h6">Enter your phone number</Typography> */}
            </Grid>
           
            
            <Box sx={{width:500}} >
             <Grid item > 

             <TextField required  type="text" fullWidth id="outlined-basic"
             label="Name" 
            
             onChange={(e)=>{setName(e.target.value) } } 
             />

            <br/><br/>
           
            <TextField required type="email" fullWidth id="outlined-basic" label="Email ID"
            onChange={(e)=>{setEmail(e.target.value)}}
             variant="outlined" />
            <br/><br/>
            <TextField required type="number" fullWidth id="outlined-basic" label="Phone Number"
            onChange={(e)=>{setPhone(e.target.value)}}
             variant="outlined" />
              <br/><br/>
            <TextField required fullWidth id="outlined-basic" 
            type="password" label="Password" 
            onChange={(e)=>{setPassword(e.target.value)}}
            variant="outlined" />
            </Grid>
           
            
<br></br>
<br></br>
            <FormControl onChange={(e)=>{setType(e.target.value)}}>

                <FormLabel id="demo-radio-buttons-group-label" required>User Type</FormLabel>
                <RadioGroup 
                 aria-labelledby="demo-radio-buttons-group-label"
                 name="radio-buttons-group"
                 >
                <FormControlLabel value="Customer" control={<Radio />} label="Customer" />
                <FormControlLabel value="Hotel" control={<Radio />} label="Hotel" />
    
                </RadioGroup>
            </FormControl>

         
        </Box>
       
        
<br></br>
<br></br>
            <Grid item>
            < ColorButton variant="contained"  onClick={signup}
            className={Classes.button1}  >
                Sign Up
            </ColorButton>
            </Grid>
         
            <Link to='/login'>
            <Typography variant='overline'>
                Already a user? Sign in.
            </Typography>
            </Link>
           
          
        </Grid> 
               
        </div>
        </Container>
        </div>
        </header>
       
    )
    }

    const HeaderStyle = {
        width: "100%",
        height: "150vh",
        background: `url(https://images.pexels.com/photos/545034/pexels-photo-545034.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        
    }