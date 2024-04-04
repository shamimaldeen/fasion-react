import React from 'react';
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

const CardHeader = (props) => {
    return (
        <>
            <div className="d-flex justify-content-between align-items-center ">
                <h4>{props.title}</h4>
                 {
                    props.hide == undefined ? <Link to={props.link}> <Button className={'btn theme-button'} ><i
                        className={`fa-solid ${props.icon}`}></i> {props.button_text}</Button></Link> : null
                 }

            </div>
        </>
    );
};

export default CardHeader;