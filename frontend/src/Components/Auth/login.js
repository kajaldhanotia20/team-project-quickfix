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
import { styled } from '@mui/material/styles';
import Logo from '../../logo.png'



const useStyles= makeStyles({
    button1: {
        width:200,
        height:50,
        fontSize: 20
      }
})

const ColorButton = styled(Button)(({ theme }) => ({
    
    backgroundColor: 'black',
  
}));

export default function Login() {
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
    const [error, setError]= useState('');
    const history = useNavigate();
    // dhruvi@gmail.com
    // pas:12345
    async function login(){
        fetch(`http://localhost:8000/api/UserRoute/login`,{
            method:'POST',
            headers:{"Content-type": "application/json"},
            body: JSON.stringify({
                email:email,
                password:password
            })})
            .then(res => res.json()
            )
        .then(data => {
            console.log(data);
            sessionStorage.setItem("username",data[0].User_name);
            sessionStorage.setItem("usertype",data[0].User_type);
            sessionStorage.setItem("userid",data[0].id);
            setError(data.message)
    
            
                 history('/dashboard');
        })
    }


    const Classes = useStyles()
    return(

        <header style={ HeaderStyle }>
        <div classname="logo"><center><img src={Logo} alt="Logo"/> </center> 
        <Container>
    
        <div>
            
        <Grid
            container
            spacing={2}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '60vh' }}
            >
           
            <Grid item xs={3}> 
            <Typography variant="h4">Welcome back</Typography>
            </Grid>
            <Grid item xs={3}> 
            <Typography>Sign in with your Email</Typography>
            <Typography color="red">{error}</Typography>
            </Grid>
            <Box sx={{width:500}} >
            <Grid item > 
            
            <TextField required fullWidth id="outlined-basic" label="Email ID" 
            onChange={(e)=>{setEmail(e.target.value)}}
            variant="outlined" />
            <br/><br/>
            <TextField required type="password"
             fullWidth id="outlined-basic" label="Password" 
            onChange={(e)=>{setPassword(e.target.value)}}
            variant="outlined" />
            </Grid>
            </Box>
            <br></br>
            <Grid item>
            <ColorButton onClick={login} className={Classes.button1} variant="contained" color="primary">
                Login
            </ColorButton>
            </Grid>
            <Link to='/signup'>
            <Typography variant='overline'>
                New to Hotels.com? Create an account.
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
    height: "100vh",
    background: `url(https://images.pexels.com/photos/4940716/pexels-photo-4940716.jpeg)`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    
}