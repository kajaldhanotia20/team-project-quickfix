import * as React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './Navbar';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function SearchModel(props){
  const [expanded, setExpanded] = React.useState(false);
  const theme = createTheme({});

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

return (
    <div><br/><br/>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <Navbar/>
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
            <Typography component="h1" variant="h5" style={{color:"black"}}>
                SEARCH FOR HOTELS
            </Typography>
            <Container maxWidth="sm">
                <Box
                  component="form"
                  autoComplete="off"
                  sx={{ mt: 3 }}
                >
                  <Grid container spacing={2}>
                      <Grid item xs={12} sm={12}>
                          <TextField
                          autoComplete="hotelName"
                          name="hotelName"
                          required
                          fullWidth
                          id="hotelName"
                          label="Hotel Name"
                          autoFocus
                          />
                      </Grid>
                  </Grid>
                </Box>
            </Container>
        </Box>
      </Container>
      </ThemeProvider>
    </div>
)};
