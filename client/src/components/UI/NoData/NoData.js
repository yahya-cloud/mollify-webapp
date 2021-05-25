import React from 'react';

import Img from '../../../assets/Nodata.png';
import classes from './NoData.module.css';


const NoData = (props) => {
    return (
        <div className={classes.imgBox}>
            <img className={classes.img} src={Img} alt="No data png"/>
            <h1>{props.text}</h1>
        </div>
    )
}

export default NoData;
