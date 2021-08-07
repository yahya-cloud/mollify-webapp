import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined'
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined'
import NavigationOutlinedIcon from '@material-ui/icons/NavigationOutlined'
import BuildOutlinedIcon from '@material-ui/icons/BuildOutlined'
import ScheduleIcon from '@material-ui/icons/Schedule'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import PersonalVideoIcon from '@material-ui/icons/PersonalVideo'

import './MobileNav.css'

const MobileNav = (props) => {
  const { user } = useSelector((state) => state)

  useEffect(() => {
    let navContainer = document.querySelector('.mobileNav__container')
    if (props.showMobileNav) {
      navContainer.classList.add('showNav')
    } else {
      navContainer.classList.remove('showNav')
    }
  }, [props.showMobileNav])

  return (
    <nav
      onClick={() => props.mobileNavHandler()}
      className='mobileNav__container'>
      <div className='mobileNav__itemsContainer'>
        {user.userType === 'doctor' ? (
          <>
            <div className='mobileNavItem'>
              <NavLink
                onClick={() => props.mobileNavHandler()}
                activeClassName='mobileNavItem--active'
                to='/'>
                <DashboardOutlinedIcon className='mobileNav__icon' /> Dashboard
              </NavLink>
            </div>

            <div className='mobileNavItem'>
              <NavLink
                onClick={() => props.mobileNavHandler()}
                activeClassName='mobileNavItem--active'
                to='/patientRequest'>
                <PeopleAltOutlinedIcon className='mobileNav__icon' />
                Patient Request
              </NavLink>
            </div>
          </>
        ) : (
          <>
            <div className='mobileNavItem'>
              <NavLink
                onClick={() => props.mobileNavHandler()}
                activeClassName='mobileNavItem--active'
                to='/'>
                <DashboardOutlinedIcon className='mobileNav__icon' />
                Doctors
              </NavLink>
            </div>

            <div className='mobileNavItem'>
              <NavLink
                onClick={() => props.mobileNavHandler()}
                activeClassName='mobileNavItem--active'
                to='/acceptedRequests'>
                <PeopleAltOutlinedIcon className='mobileNav__icon' />
                Accepted Request
              </NavLink>
            </div>
          </>
        )}

        <div className='mobileNavItem'>
          <NavLink
            onClick={() => props.mobileNavHandler()}
            activeClassName='mobileNavItem--active'
            to='/videoChat/:chatId'>
            <PersonalVideoIcon className='mobileNav__icon' />
            Video Chat
          </NavLink>
        </div>

        <div className='mobileNavItem'>
          <NavLink
            onClick={() => props.mobileNavHandler()}
            activeClassName='mobileNavItem--active'
            to='/navigate/:personAddress'>
            <NavigationOutlinedIcon className='mobileNav__icon' />
            Navigation
          </NavLink>
        </div>
        
        <div className='mobileNavItem'>
          <NavLink
            onClick={() => props.mobileNavHandler()}
            activeClassName='mobileNavItem--active'
            to='/schedule'>
            <ScheduleIcon className='mobileNav__icon' />
            Schedule
          </NavLink>
        </div>

        <div className='mobileNavItem'>
          <NavLink
            onClick={() => props.mobileNavHandler()}
            activeClassName='mobileNavItem--active'
            to='/chat'>
            <ChatBubbleOutlineIcon className='mobileNav__icon' />
            Chat
          </NavLink>
        </div>

        <div className='mobileNavItem'>
          <NavLink
            onClick={() => props.mobileNavHandler()}
            activeClassName='mobileNavItem--active'
            to='/ourWorking'>
            <BuildOutlinedIcon className='mobileNav__icon' />
            About us
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default MobileNav
