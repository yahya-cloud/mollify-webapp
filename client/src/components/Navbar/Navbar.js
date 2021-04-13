import React from 'react';
import {NavLink} from 'react-router-dom';
import {useSelector} from 'react-redux';


import classes from './Navbar.module.css';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import NavigationOutlinedIcon from '@material-ui/icons/NavigationOutlined';
import BuildOutlinedIcon from '@material-ui/icons/BuildOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';


const Navbar = () => {
    const {userData} =  useSelector(state => state);

    return (
        <div className={`${classes.navbar}`}>
        {userData.userType === 'doctor' ? 
        <>
        <NavLink exact activeClassName={classes.navItemActive} className={classes.navItem} to="/dashboard"> 
        <DashboardOutlinedIcon className={classes.navIcon} />   Dashboard
        </NavLink>

        <NavLink activeClassName={classes.navItemActive} className={classes.navItem} to="/patientRequest"> 
        <PeopleAltOutlinedIcon className={classes.navIcon} />   Requests
        </NavLink>
        </>
        :
        <>
        <NavLink exact activeClassName={classes.navItemActive} className={classes.navItem} to="/"> 
        <DashboardOutlinedIcon className={classes.navIcon} />   Doctors
        </NavLink>

        <NavLink activeClassName={classes.navItemActive} className={classes.navItem} to="/acceptedRequest"> 
        <PeopleAltOutlinedIcon className={classes.navIcon} />  Accepted Requests
        </NavLink>
        </>
        }

            <NavLink activeClassName={classes.navItemActive} className={classes.navItem} to="/navigate"> 
            <NavigationOutlinedIcon className={classes.navIcon} />  Navigation
            </NavLink>

            <NavLink activeClassName={classes.navItemActive} className={classes.navItem} to="/ourWorking"> 
            <BuildOutlinedIcon className={classes.navIcon} />   Our Working
            </NavLink>

            <NavLink activeClassName={classes.navItemActive} className={classes.navItem} to="/settings"> 
            <SettingsOutlinedIcon className={classes.navIcon} />  Settings
            </NavLink>

        </div>
    )
}

export default Navbar
