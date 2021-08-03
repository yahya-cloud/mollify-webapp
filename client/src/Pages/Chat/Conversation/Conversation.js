import React, { useState, useEffect } from 'react'
import { getOtherUser } from '../../../api/index'
import classes from './Conversation.module.css'
import avatar from '../../../assets/noAvatar.png'

const Conversation = (props) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const otherUserId = props.conversation?.members?.find(
      (m) => m !== props.currentUserId
    )
    const getUser = async () => {
      try {
        const res = await getOtherUser(otherUserId)
        setUser(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [props.conversation, props.currentUserId])

  return (
    <div
      className={
        props.conversation._id === props.currentChat?._id
          ? `${classes.conversation} ${classes.active}`
          : classes.conversation
      }>
      <img
        className={classes.conversationImg}
        src={user?.photo ? `${user.photo}` : avatar}
        alt=''
      />
      <div className={classes.conversationTexts}>
        <span className={classes.conversationName}>{user?.name}</span>
        {/* <span className={classes.conversationLastText}>hey you there?</span> */}
      </div>
    </div>
  )
}

export default Conversation
