import React from 'react';

import classes from './Button.module.css'

const Button = (props) => {

    let button = null;

    switch (props.btnType) {
        case 'button-header':
        return(
            <button  className={`button btnGreen ${classes.buttonHeader}`} onClick={props.clickHandler} >Logout</button>
        );
        
        case 'btnAccept--small':
            return(
                <button className={`button btnSmall btnGreen`} onClick={props.clickHandler} >{props.children}</button>
            );
        case 'btnReject--small':
            return(
            <button className={`button btnSmall btnRed`} onClick={props.clickHandler} >{props.children}</button>
            );
            
        case 'btnCard':
        return(
            <button disabled={props.disabled} className={`button ${props.btnColor} ${classes.btnCard}`} onClick={props.clickHandler}>{props.children}</button>
            );
        default:
            break;
    }

    return (
     button
    )
}

export default Button
