import React, { useState } from 'react'
import axios from 'axios'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { Favorite, FavoriteBorder, SettingsOverscan, Assignment } from '@material-ui/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CardModal from './CardModal';
import Link from '@mui/material/Link';


export default function PaperCard(props) {

    const [open, setOpen] = React.useState(false);
    const [is_stocked, setIsStocked] = useState(props.is_stocked)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    function handleOnClick() {

        axios.put(`https://localhost/paper_stock/${props.paper_id}`)
            .then(res => {
                setIsStocked(!is_stocked)
            }).catch(error => {
                alert(error.response.data['message'])
            });
    }

    return (
        <div>
            <Card sx={{ maxWidth: 400, Width: 400, maxHeight: 400, Height: 400, m: 1 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
                        Title
                    </Typography>
                    <Typography sx={{ fontSize: 14, minHeight: 60, maxHeight: 60, m: 1 , overflowY: 'scroll'}} gutterBottom>
                        {props.title}
                    </Typography>
                    <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
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
                    <Typography variant="body1" sx={{ fontSize: 12, minHeight: 100, maxHeight: 100, overflowY: 'scroll' }}>
                        {props.abstract}
                    </Typography>
                </CardContent>
                <CardActions sx={{ maxHeight: 20, Height: 20, m: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: 12 }} color="text.secondary">
                        PublishDay {props.published_at}
                    </Typography>
                    <Box>
                        <Link href={props.pdf_link} color="primary" sx={{ marginRight: 1, marginLeft: 1 }} target='_blank'>
                            pdf link
                        </Link>
                        <IconButton style={{ color: "#FFB5C2" }} onClick={handleOnClick}>
                            {is_stocked ? <Favorite /> : <FavoriteBorder />}
                        </IconButton>
                        <IconButton onClick={handleOpen}>
                            <SettingsOverscan />
                        </IconButton>
                    </Box>
                </CardActions>
            </Card>
            <CardModal title={props.title} abstract={props.abstract} open={open} handleClose={handleClose} />
        </div>
    )
}