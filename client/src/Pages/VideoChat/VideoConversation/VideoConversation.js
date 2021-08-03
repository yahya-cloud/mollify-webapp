import React from 'react'
import classes from './VideoConversation.module.css'
import avatar from '../../../assets/noAvatar.png'

const VideoConversation = (props) => {
  return (
    <div>
      <div
        className={
          props.conversation._id === props.currentChat?._id
            ? `${classes.conversation} ${classes.active}`
            : classes.conversation
        }>
        <img
          className={classes.conversationImg}
          src={props.photo ? `${props.photo}` : avatar}
          alt=''
        />
        <div className={classes.conversationTexts}>
          <span className={classes.conversationName}>{props.name}</span>
          {/* <span className={classes.conversationLastText}>hey you there?</span> */}
        </div>
      </div>
    </div>
  )
}

export default VideoConversation
