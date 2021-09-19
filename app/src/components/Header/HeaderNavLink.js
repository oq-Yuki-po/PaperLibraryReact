import React from 'react'
import { Button} from '@mui/material';
import { useHistory } from "react-router-dom";

export default function HeaderNavLink(props) {
    let history = useHistory();
    function handleOnClick() {
        history.push(props.link);
    }

    return (
        <Button color="inherit" onClick={handleOnClick}>{props.link_name}</Button>
    )
}
