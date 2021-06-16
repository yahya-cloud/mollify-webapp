import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

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
                Dashboard
              </NavLink>
            </div>

            <div className='mobileNavItem'>
              <NavLink
                onClick={() => props.mobileNavHandler()}
                activeClassName='mobileNavItem--active'
                to='/patientRequest'>
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
                Doctors
              </NavLink>
            </div>

            <div className='mobileNavItem'>
              <NavLink
                onClick={() => props.mobileNavHandler()}
                activeClassName='mobileNavItem--active'
                to='/acceptedRequests'>
                Accepted Request
              </NavLink>
            </div>
          </>
        )}

        <div className='mobileNavItem'>
          <NavLink
            onClick={() => props.mobileNavHandler()}
            activeClassName='mobileNavItem--active'
            to='/navigate/:personAddress'>
            Navigation
          </NavLink>
        </div>

        <div className='mobileNavItem'>
          <NavLink
            onClick={() => props.mobileNavHandler()}
            activeClassName='mobileNavItem--active'
            to='/ourWorking'>
            About us
          </NavLink>
        </div>

        <div className='mobileNavItem'>
          <NavLink
            onClick={() => props.mobileNavHandler()}
            activeClassName='mobileNavItem--active'
            to='/settings'>
            Settings
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default MobileNav
