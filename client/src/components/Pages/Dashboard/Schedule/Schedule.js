import React from 'react';
import Button from '../../../UI/Button/Button';
import classes from './Schedule.module.css';

const Schedule = (props) => {

    return (
    <div className={classes.schedule}>

    <div className={classes.imgBox} >
        <span style={{backgroundImage:`url(${props.photo})`}} ></span>
        <p>{props.name}</p>
    </div>

    {props.infos.map(info => (
        <p>{info}</p>
    ))}

    <div className={classes.btnBox}>
        <Button btnType='btnAccept--small'>{props.schedule ? 'succeed' : 'Accept'}</Button>
        <Button btnType='btnReject--small'>{props.schedule ? 'Failed' : 'Reject'}</Button>
    </div>

    </div>
    )
}

export default Schedule
