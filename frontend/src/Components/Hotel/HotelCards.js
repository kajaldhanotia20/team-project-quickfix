import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { renderMatches } from 'react-router-dom';

export default function HoteCards(search) {
    let items = ['Item 1','Item 2','Item 3','Item 4','Item 5'];
  return (
    <div>
        <Grid container spacing={2}
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
        </Grid>
    </div>
  );
}
