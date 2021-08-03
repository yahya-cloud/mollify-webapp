import React, { useContext, useState } from 'react'
import { Button } from '@material-ui/core'
import { SocketContext } from '../../service/socket'
import { useHistory } from 'react-router-dom'

import classes from './Notification.module.css'

const Notification = () => {
  const { call, callAccepted } = useContext(SocketContext)
  const [clicked, setClicked] = useState(false)
  const history = useHistory()
  const isVideoPage = history.location.pathname.slice(0, 10) === '/videoChat'

  const handleAnswer = () => {
    history.push(`/videoChat/${call.chatId}`)
    setClicked(true)
  }

  return (
    <>
      {call.isReceivingCall && !callAccepted && !clicked && !isVideoPage && (
        <div className={classes.notificationContainer}>
          <h1>{call.userName} is calling</h1>
          <Button variant='contained' color='secondary' onClick={handleAnswer}>
            Answer Now
          </Button>
        </div>
      )}
    </>
  )
}

export default Notification
