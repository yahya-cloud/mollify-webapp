import React from 'react'
import classes from './Message.module.css'
import { format } from 'timeago.js'

const Message = (props) => {
  return (
    <div className={props.own ? classes.messageOwn : classes.message}>
      <div className={classes.messageTop}>

        <div className={classes.messageTextBox}>
          <p className={classes.messageText}>{props.message.text}</p>
          <h6 className={classes.messageTime}>{format(props.message.createdAt)}</h6>
        </div>
      </div>
    </div>
  )
}
// /{format(message.createdAt)}
export default Message
