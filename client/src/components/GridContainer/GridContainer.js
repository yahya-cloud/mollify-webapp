import React from 'react';
import {Grid} from '@material-ui/core';
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';


import Card from '../UI/Card/Card';

const GridContainer = (props) => {
    let navigate = true;
    navigate = !(useHistory().location.pathname === '/' && props.userType === 'patient');
    const {user} =  useSelector(state => state);


    return (
        <div className='root'>
        <Grid className='gridContainer' container spacing={4}>
        {props.cardArray.map(el => {
            return <Card
            showInputs={props.showInputs}
            person={el} 
            navigate={navigate}
            userType={props.userType}
            greenBtnFunc={props.greenBtnFunc}
            redBtnFunc={props.redBtnFunc}
            greenBtnTxt={props.greenBtnTxt}
            redBtnTxt={props.redBtnTxt} />
        })}
            
        </Grid>
        </div>
    )
}

export default GridContainer;
