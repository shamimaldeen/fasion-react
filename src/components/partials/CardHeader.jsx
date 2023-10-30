import React from 'react';
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

const CardHeader = (props) => {
    return (
        <>
            <div className="d-flex justify-content-between align-items-center ">
                <h4>{props.title}</h4>
                <Button className={'btn theme-button'} ><Link to={props.link}><i
                    className={`fa-solid ${props.icon}`}></i> {props.button_text}</Link> </Button>
            </div>
        </>
    );
};

export default CardHeader;