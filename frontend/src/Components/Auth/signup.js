import React, {useEffect} from "react";
import  { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import  {makeStyles}  from '@material-ui/core/';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import  {useState} from "react";
import {Navigate} from 'react-router';


const useStyles= makeStyles({
    button1: {
        width:200,
        height:50,
        fontSize: 20
      }
})


export default function Signup() {
    const Classes = useStyles()
    const [name, setName]= useState('')
    const [password, setPassword]= useState('')
    const [error, setError]= useState('');
    const [email, setEmail]= useState('')
    const history = useNavigate();
    let redirectvar =''



    function signup(){
        fetch(`http://localhost:8000/api/UserRoute/signup`,{
            method:'POST',
            headers:{"Content-type": "application/json"},
            body: JSON.stringify({
                name:name,
                password:password,
                email: email
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
            <img src="https://i.pinimg.com/originals/c8/88/89/c8888942b5d00fc30ad2aa19fd45280b.gif" alt='' width="300" height="120" />
            <br/>
            </Grid>  
            <Grid item xs={3}> 
            <Typography variant="h4">Let's get started.</Typography>
            <Typography color="red">{error}</Typography>
            </Grid>
            <Grid item xs={3}> 
            {/* <Typography variant="h6">Enter your phone number</Typography> */}
            </Grid>
            <Box sx={{width:500}} >
             <Grid item > 
             <TextField fullWidth id="outlined-basic" label="Name" 
             onChange={(e)=>{setName(e.target.value)}}
             variant="outlined" />
            <br/><br/>
            <TextField fullWidth id="outlined-basic" label="Email ID"
            onChange={(e)=>{setEmail(e.target.value)}}
             variant="outlined" />
            <br/><br/>
            <TextField fullWidth id="outlined-basic" 
            type="password" label="Password" 
            onChange={(e)=>{setPassword(e.target.value)}}
            variant="outlined" />
            </Grid>
            </Box>
            <Grid item>
            <Button  onClick={signup}
            className={Classes.button1} variant="contained" color="primary">
                Sign Up
            </Button>
            </Grid>
            <Link to='/login'>
            <Typography variant='overline'>
                Already a user? Sign in.
            </Typography>
            </Link>
            
        </Grid> 
                        
        </div>
        </Container>
    )
}