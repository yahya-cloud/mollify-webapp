import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import classes from './Navbar.module.css'
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined'
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined'
import NavigationOutlinedIcon from '@material-ui/icons/NavigationOutlined'
import BuildOutlinedIcon from '@material-ui/icons/BuildOutlined'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'

const Navbar = () => {
  const { user } = useSelector((state) => state)
  const location = useLocation()
  return (
    <div className={`${classes.navbar}`}>
      {user.userType === 'doctor' ? (
        <>
          <NavLink
            exact
            activeClassName={classes.navItemActive}
            className={classes.navItem}
            to='/'>
            <DashboardOutlinedIcon className={classes.navIcon} /> Dashboard
          </NavLink>

          <NavLink
            activeClassName={classes.navItemActive}
            className={classes.navItem}
            to='/patientRequest'>
            <PeopleAltOutlinedIcon className={classes.navIcon} /> Requests
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            exact
            activeClassName={classes.navItemActive}
            className={classes.navItem}
            to='/'>
            <DashboardOutlinedIcon className={classes.navIcon} /> Doctors
          </NavLink>

          <NavLink
            activeClassName={classes.navItemActive}
            className={classes.navItem}
            to='/acceptedRequests'>
            <PeopleAltOutlinedIcon className={classes.navIcon} /> Accepted
            Requests
          </NavLink>
        </>
      )}

      {/* setting active class when came from request page */}
      <NavLink
        activeClassName={classes.navItemActive}
        className={classes.navItem}
        isActive={() => (location.pathname.slice(1, 9) === 'navigate' ? 1 : 0)}
        to='/navigate/:personAddress'>
        <NavigationOutlinedIcon className={classes.navIcon} /> Navigation
      </NavLink>

      <NavLink
        activeClassName={classes.navItemActive}
        className={classes.navItem}
        to='/ourWorking'>
        <BuildOutlinedIcon className={classes.navIcon} /> About us
      </NavLink>

      <NavLink
        activeClassName={classes.navItemActive}
        className={classes.navItem}
        to='/settings'>
        <SettingsOutlinedIcon className={classes.navIcon} /> Settings
      </NavLink>
    </div>
  )
}

export default Navbar
