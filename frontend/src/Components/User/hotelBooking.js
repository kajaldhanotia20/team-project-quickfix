import React, { useEffect } from "react";
import BookingModal from "../Modules/bookingModal";
import {Button, Modal} from "@mui/material";
import Box from "@mui/material/Box";
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
export default function BookingButton() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return(
        <div>

            <div>
                <Button onClick={handleOpen}>Open modal</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <BookingModal/>
                    </Box>
                </Modal>
            </div>
        </div>

    )
}
