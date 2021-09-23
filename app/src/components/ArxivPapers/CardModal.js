import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function CardModal(props) {
    return (
        <Modal open={props.open} onClose={props.handleClose}>
                <Box sx={style}>
                    <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                        Title
                    </Typography>
                    <Typography sx={{ fontSize: 16 }} gutterBottom>
                        {props.title}
                    </Typography>
                    <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                        Abstract
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: 16}}>
                        {props.abstract}
                    </Typography>
                </Box>
        </Modal>
    )
}
