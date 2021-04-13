import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';


import {logOut} from '../../store/actions/auth';
import classes from './Header.module.css';
// import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
// import { IconButton } from '@material-ui/core';
import person from '../../assets/person.jpg'
import Button from '../UI/Button/Button';

const Header = () => {
    const {userData} =  useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();
    
    const clickHandler = () => {

        dispatch(logOut(history))
    }
    return (
        <header className={classes.header}>
            <h1 className={classes.logo}>
                Mollify
            </h1>

           <div className={classes.headerControls} >                      
           <div style={{backgroundImage: `url(${userData.photo})`, backgroundSize: 'cover'}}  className={classes.personImg}></div> 
           <h2>{`${userData.name}`}</h2>
           <Button btnType="button-header" clickHandler={clickHandler} />
           
           </div>
        </header>
    )
}

export default Header;