import HoteCards from "./HotelCards";
import Navbar from "./Navbar";
import * as React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

const Dashboard = () => {
return(
    <div>
        <HoteCards/>
    </div>
);
}

export default Dashboard;