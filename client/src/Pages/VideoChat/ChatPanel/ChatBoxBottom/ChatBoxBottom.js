import React, { useState, useContext } from 'react'
import classes from './ChatBoxBottom.module.css'
import { SocketContext } from '../../../../socket/socket'

import IconButton from '@material-ui/core/IconButton'
import CallEndIcon from '@material-ui/icons/CallEnd'
import InfoIcon from '@material-ui/icons/Info'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import VisibilityIcon from '@material-ui/icons/Visibility'
import Menu from '@material-ui/core/Menu'
import Fade from '@material-ui/core/Fade'

const ChatBoxBottom = ({ show, showFunction, currentChat }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const { leaveCall } = useContext(SocketContext)
  const handleClick = () => {
    showFunction((prev) => !prev)
  }

  const openMenu = (e) => {
    setAnchorEl(e.currentTarget.parentElement)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className={classes.chatBoxBottom}>
      <Menu
        className={classes.menu}
        id='fade-menu'
        anchorEl={anchorEl}
        keepMounted
        onClick={handleClose}
        onClose={handleClose}
        open={Boolean(anchorEl)}
        TransitionComponent={Fade}>
        <div className={classes.personInfoContainer}>
          <div className={classes.personInfo}>
            <span> Name: </span> <h4> {currentChat?.name} </h4>
          </div>
          <div className={classes.personInfo}>
            <span> Email: </span> <h4> {currentChat?.email} </h4>
          </div>
          <div className={classes.personInfo}>
            <span> Session-Type: </span> <h4> {currentChat?.sessionType} </h4>
          </div>
          <div className={classes.personInfo}>
            <span> Address: </span> <h4> {currentChat?.address} </h4>
          </div>
          <div className={classes.personInfo}>
            <span> Time: </span> <h4> {currentChat?.time} </h4>
          </div>
          <div className={classes.personInfo}>
            <span> Phone: </span> <h4> {currentChat?.phoneNumber} </h4>
          </div>
        </div>
      </Menu>

      <IconButton
        onClick={(e) => openMenu(e)}
        color='inherit'
        aria-label='add to shopping cart'>
        <InfoIcon fontSize={'large'} />
      </IconButton>
      <IconButton
        onClick={() => leaveCall()}
        color='secondary'
        aria-label='add to shopping cart'>
        <CallEndIcon fontSize={'large'} />
      </IconButton>
      <IconButton
        onClick={handleClick}
        color='primary'
        aria-label='add to shopping cart'>
        {show ? (
          <VisibilityIcon fontSize={'large'} />
        ) : (
          <VisibilityOffIcon fontSize={'large'} />
        )}
      </IconButton>
    </div>
  )
}

export default ChatBoxBottom
