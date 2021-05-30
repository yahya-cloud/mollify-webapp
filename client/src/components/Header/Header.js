import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';


import {logOut, deleteUser} from '../../store/actions/auth';
import classes from './Header.module.css';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';

import MobileNav from '../Navbar/MobileNav/MobileNav';
import Logo from '../../assets/logo.png'

const Header = () => {
    const {user} =  useSelector(state => state);
    const dispatch = useDispatch();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);
    const [navOpen, setNavOpen] = useState(false);
    
    const showMobileNav = () => {
        const burgerIcon =  document.querySelector('#burgerIcon');
        if(!navOpen){
            burgerIcon.classList.add(`${classes.opened}`);
            setNavOpen(true);
        }else{
            burgerIcon.classList.remove(`${classes.opened}`);
            setNavOpen(false);
        }
    }



    const openMenu = (e) => {
        setAnchorEl(e.currentTarget.parentElement);
    }
    
    const clickHandler = (btnType) => {
        setAnchorEl(null);
        switch (btnType) {
            case 'logout':
                dispatch(logOut(history))
            break;

            case 'edit':
                history.push('/settings');
            break;

            case 'delete':
               dispatch(deleteUser(user._id, user.userType));
            break;    

            default:
                break;
        }
    }
    return (
        <>
        <header className={classes.header}>
            {/* <h1 className={classes.logo}>
                Mollify
            </h1> */}
            <img className={classes.logo}  src={Logo} alt="logo" />

           <div className={classes.headerControls} >                      
           <div style={{backgroundImage: `url(${user.photo})`, backgroundSize: 'cover'}}  className={classes.personImg}></div> 
           <h2>{`${user.name}`}
           </h2>
           <KeyboardArrowDownIcon size='large' className={classes.icon} onClick={(e) => openMenu(e)}/>


           {/* burger icon */}
        <div id='burgerIcon' className={`${classes.burgerIcon}`} onClick={showMobileNav}>
        <div className={`${classes.burgerIconLine} ${classes.burgerIconLine1}`} ></div>
        <div className={`${classes.burgerIconLine} ${classes.burgerIconLine2}`} ></div>
        <div className={`${classes.burgerIconLine} ${classes.burgerIconLine3}`} ></div>
        </div> 


           </div>
            <Menu
            className={classes.menu}
            id="fade-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => clickHandler('')}
            TransitionComponent={Fade}
            >    
            <MenuItem onClick={() => clickHandler('logout')}>Logout</MenuItem>
            <MenuItem onClick={() => clickHandler('edit')}>Edit Profile</MenuItem>
            <MenuItem onClick={() => clickHandler('delete')}>Delete Profile</MenuItem>
            </Menu>
        </header>
        <MobileNav showMobileNav={navOpen} mobileNavHandler={() => showMobileNav()}/>
        </>
    )
}

export default Header;