import React, { useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import classes from './CurrentUser.module.css'
import Button from '@material-ui/core/Button'
import { SocketContext } from '../../../../service/socket'

const CurrentUser = ({ currentChat }) => {
  const { callUser, call, leaveCall, callAccepted, stream } =
    useContext(SocketContext)
  const { user } = useSelector((state) => state)

  return (
    <div className={classes.userBox}>
      <img className={classes.userPhoto} src={currentChat.photo} alt='user' />
      <div className={classes.userInfo}>
        <div className={classes.personInfo}>
          <span> Name: </span> <h4> {currentChat?.name} </h4>
        </div>
        <div className={classes.personInfo}>
          <span> Session Time: </span>{' '}
          <h4>
            {`${new Date(currentChat.time).getHours()}: ${new Date(
              currentChat.time
            ).getMinutes()}`}
          </h4>
        </div>
      </div>

      <div className={classes.buttonContainer}>
        <Button
          onClick={() =>
            callUser({
              receiverId: currentChat.otherUserId,
              chatId: currentChat.conversationId,
              userName: user.name,
            })
          }
          className={classes.callButton}
          variant='contained'
          color='primary'>
          Make Call
        </Button>

  
      </div>
    </div>
  )
}

export default CurrentUser
