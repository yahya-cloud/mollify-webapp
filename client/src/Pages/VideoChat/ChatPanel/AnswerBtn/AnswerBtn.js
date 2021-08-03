import React, { useContext } from 'react'
import { Button } from '@material-ui/core'
import { SocketContext } from '../../../../service/socket'

import classes from './AnswerBtn.module.css'

const AnswerBtn = ({ user }) => {
  const { answerCall, call, callAccepted } = useContext(SocketContext)
  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <Button
          className={classes.answerButton}
          variant='contained'
          color='secondary'
          onClick={answerCall}>
          Answer Call
        </Button>
      )}
    </>
  )
}

export default AnswerBtn
