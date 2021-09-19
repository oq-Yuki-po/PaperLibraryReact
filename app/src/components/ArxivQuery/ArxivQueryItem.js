import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
    IconButton,
    Checkbox,
    TextField,
    Tooltip,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    FormControlLabel,
    Switch
} from '@mui/material';
import { Delete } from '@material-ui/icons';
export default function ArxivQueryItem(props) {

    const [isChecked, setisChecked] = useState(props.is_active)
    const [isVisible, setisVisible] = useState(true)
    const [switchLabel, setSwitchLabel] = useState('')
    const [open, setOpen] = React.useState(false);

    function handleOnChange(e) {

        const json_body = { arxiv_query_id: props.arxiv_query_id };
        axios.put('https://localhost/arxiv_query/', json_body)
            .then(res => {
                setisChecked(!e.target.checked)
            }).catch(error => {
                alert(error.response.data['message'])
            });
    }
    useEffect(() => {
        
        isChecked?setSwitchLabel('有効'):setSwitchLabel('無効')
        
    }, [isChecked])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function onRemoveClick() {

        axios.request({
            method: 'delete',
            url: 'https://localhost/arxiv_query/',
            data: { arxiv_query_id: props.arxiv_query_id },
        })
            .then(res => {
                setisVisible(false)
            }).catch(error => {
            });
    }

    return (
        isVisible && <li className='arxiv-query-item'>
            <Tooltip title={props.arxiv_query} placement="bottom-start">
                <TextField
                    value={props.arxiv_query}
                    variant="outlined"
                    InputProps={{
                        readOnly: true,
                        
                    }}
                    sx={{ textOverflow: 'ellipsis' }}
                    style={{ width: 400 ,  m: 3 }}
                    size="small"
                />
            </Tooltip>
            <FormControlLabel control={<Switch checked={isChecked}  onChange={handleOnChange}/>} label={switchLabel} labelPlacement="start"/>
            <IconButton onClick={handleClickOpen}>
                <Delete color='error' />
            </IconButton>
            <Dialog open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        関連する論文が全て削除されます。よろしいですか？
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>キャンセル</Button>
                    <Button onClick={onRemoveClick} autoFocus>OK</Button>
                </DialogActions>
            </Dialog>
        </li >
    )
}
