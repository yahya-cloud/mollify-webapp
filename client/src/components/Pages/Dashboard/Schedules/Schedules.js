import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import Schedule from './Schedule/Schedule';
import classes from './Schedules.module.css';
import {sessionFailed, sessionSucceed} from '../../../../store/actions/doctor';


const Schedules = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const sessionSucceedHandler = (data) => {
        dispatch(sessionSucceed(user, data));
    }

    const sessionFailedHandler = (data) => {
        dispatch(sessionFailed(user.email, data._id));
    }


    return (
        <div className={`table ${classes.card} ${classes.cardSchedule}`} >
        <h2>Todays Schedule</h2>

        <div className={classes.subHeadings}>
        <h3>Profile</h3>
        <h3>Session Type</h3>
        <h3>Session Time</h3>
        <h3>Succeed/Failed</h3>
        </div>
        {user.schedules.map(el => 
       <Schedule   
       redBtnFunc={sessionFailedHandler}
       greenBtnFunc={sessionSucceedHandler}
       personData={el} 
       schedule/>
        )}
        </div>
    )
}

export default Schedules
