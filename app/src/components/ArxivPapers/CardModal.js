import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment } from '@material-ui/icons';

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
                    <CopyToClipboard
                        text={props.title}
                        onCopy={() => 0}>
                        <Tooltip title="Copy to Clipboard" placement="right">
                            <IconButton sx={{ p: 1 }}>
                                <Assignment />
                            </IconButton>
                        </Tooltip>
                    </CopyToClipboard>
                </Typography>
                <Typography sx={{ fontSize: 16 }} gutterBottom>
                    {props.title}
                </Typography>
                <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                    Abstract
                    <CopyToClipboard
                        text={props.abstract}
                        onCopy={() => 0}>
                        <Tooltip title="Copy to Clipboard" placement="right">
                            <IconButton sx={{ p: 1 }}>
                                <Assignment />
                            </IconButton>
                        </Tooltip>
                    </CopyToClipboard>
                </Typography>
                <Typography variant="body1" sx={{ fontSize: 16 }}>
                    {props.abstract}
                </Typography>

            </Box>
        </Modal>
    )
}
