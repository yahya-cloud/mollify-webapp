import React from 'react';

import classes from './cardInputs.module.css';

const CardInputs = (props) => {

    return (
        <div className={classes.InputContainer}>
        
            <div className={classes.inputBox}>
            <h3>Time:</h3>
            <input type='time' name='time' min="09:00" max="18:00" onChange={(e) => props.changeHandler(e)}></input>
            </div>

            <div className={classes.inputBox}>
            <h3>SessionType:</h3>
            <select type='select' name='sessionType'  onChange={(e) => props.changeHandler(e)}>
                <option value='home'>Home</option>
                <option value='clinic'>Clinic</option>
            </select>
            </div>

            
            <div className={classes.inputBox}>
            <h3>Gender:</h3>
            <select type='select' name='gender' onChange={(e) => props.changeHandler(e)}>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
            </select>
            </div>

            <div className={classes.inputBox}>
            <h3>Disorder:</h3>
            <select type='select' name='disorder' onChange={(e) => props.changeHandler(e)}>
                <option value='anxiety'>Anxiety</option>
                <option value='stress'>Stress</option>
                <option value='depression'>Depression</option>
                <option value='traumatic'>Post Traumatic</option>
            </select>
            </div>

        </div>
    )
}

export default CardInputs;
