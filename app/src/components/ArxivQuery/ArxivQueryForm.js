import React, { useState, useEffect } from 'react'
import { Button, TextField, Box, Dialog, DialogContent, DialogContentText } from '@mui/material';
import axios from 'axios'

export default function ArxivQueryForm(props) {

    const [inputText, setInputText] = useState('検索キーワード')
    const [inputError, setInputError] = useState(true);
    const [helperText, setHelperText] = useState('');
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = useState('')
    function handleOnChange(e) {
        setInputText(e.target.value)
    }
    useEffect(() => {
        if (inputText.length === 0) {
            setHelperText('１文字以上で入力してください')
            setInputError(true)
        } else if (inputText.length >= 256) {
            setHelperText('255文字以内で入力してください')
            setInputError(true)
        } else {
            setInputError(false)
            setHelperText('')
        }
    }, [inputText]);

    function handleOnClick() {

        if (inputError) {
            return 0
        }

        const json_body = { arxiv_query: inputText };
        axios.post('https://localhost/arxiv_query/', json_body)
            .then(res => {
                setMessage(res.data['message'])
                props.AddQueryItem(res.data['saved_query'])
                setInputText('検索キーワード')
                setOpen(true)
            }).catch(error => {
                setMessage(error.response.data['message'])
                setOpen(true)
            });
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex', width: 600 }} className='arxiv-query-form'>
            <TextField value={inputText} size="small"
                error={inputError}
                helperText={helperText}
                onChange={handleOnChange}
                variant="outlined"
                label="登録ワード"
                sx={{ m: 2 }}
                style={{ width: 400 }} />
            <Button onClick={handleOnClick}
                variant='contained'
                sx={{ m: 2 }}
                size="large">登録</Button>
            <Dialog open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </Box>
    )
}
