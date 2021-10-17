import React, { useEffect, useState, useRef } from 'react'

import {
  setArrivalMessageEvent,
  updateConversation,
  getConversationMessages,
  sendMessage
} from '../../../utils/conversationUtils'
import IconButton from '@material-ui/core/IconButton'
import SendIcon from '@material-ui/icons/Send'
import classes from './MessageBox.module.css'
import Message from './Message/Message'

const MessageBox = ({ userId, currentChat }) => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const scrollRef = useRef()
  const receiverId = currentChat.members.find(el => el !== userId)
 

  //when remote user sends a message
  useEffect(() => {
    setArrivalMessageEvent(setArrivalMessage)
  }, [])

  //runs when a message is arrived
  useEffect(() => {
    arrivalMessage &&
      updateConversation(currentChat, setMessages, arrivalMessage)
  }, [arrivalMessage, currentChat])

  useEffect(() => {
    getConversationMessages(currentChat?._id, setMessages)
  }, [currentChat])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])


  const handleSubmit = async () => {
    const messageBody = {
      sender: userId,
      text: newMessage,
      conversationId: currentChat._id,
    }

    sendMessage(messageBody, receiverId, setMessages)
    setNewMessage('')
  }

  return (
    <div className={classes.messageBox}>
      <div className={classes.messageBoxTop}>
        {messages.map((msg) => (
          <div key={msg._id} ref={scrollRef}>
            <Message message={msg} own={msg.sender === userId} />
          </div>
        ))}
      </div>
      <div className={classes.messageBoxBottom}>
        <textarea
          value={newMessage}
          className={classes.messageBoxInput}
          placeholder='write something'
          onChange={(e) => setNewMessage(e.target.value)}></textarea>
        <div onClick={handleSubmit}>
          <IconButton className={classes.messageBoxButton}>
            <SendIcon />
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default MessageBox
