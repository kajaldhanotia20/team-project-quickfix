import React, { useEffect } from "react";
import {
    Button,
    Container, Link,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";

export default function MyBooking() {
    return(
        <Container>
            Your Bookings
            <br/>
            <TableContainer sx={{maxWidth:'70%'}} component={Paper}>
                <Table  aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Reservation Number</TableCell>
                            <TableCell>Guest name</TableCell>
                            <TableCell>Check-in</TableCell>
                            <TableCell>Checkout</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Reservation Number</TableCell>
                            <TableCell>Guest name</TableCell>
                            <TableCell>Check-in</TableCell>
                            <TableCell>Checkout</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>
                                <Stack>
                                    <Button variant="outlined" href="/booking" >Modify</Button>
                                    <Button variant="outlined">Cancel</Button>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}
