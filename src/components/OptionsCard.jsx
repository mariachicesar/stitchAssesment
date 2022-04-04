import React from 'react'
import { Stack } from "react-bootstrap";

const OptionsCard = (props) => {
const onHandleBtn = () =>{
    props.onHandleBtn(props)
}

    return (
        <React.Fragment>
            <Stack gap={0}>
            <button type="button" className="btn btn-pill" onClick={onHandleBtn}>{props.info.label}</button>
            </Stack>
        </React.Fragment>
    )
}

export default OptionsCard;