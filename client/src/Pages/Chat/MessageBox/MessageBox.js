import React, { useEffect, useState, useRef } from 'react'
import { getMessages, sendMessage } from '../../../api/index'
import socket from '../../../service/socket'

import IconButton from '@material-ui/core/IconButton'
import SendIcon from '@material-ui/icons/Send'
import classes from './MessageBox.module.css'
import Message from './Message/Message'

const MessageBox = ({ userId, currentChat }) => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const scrollRef = useRef()

  useEffect(() => {
    socket.on('getMessage', (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      })
    })
  }, [])

  useEffect(() => {
    if (
      arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender)
    ) {
      setMessages((prev) => [...prev, arrivalMessage])
    }
  }, [arrivalMessage, currentChat])

  useEffect(() => {
    const getConversationMessages = async () => {
      try {
        const res = await getMessages(currentChat?._id)
        setMessages(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getConversationMessages()
  }, [currentChat])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = async () => {
    const message = {
      sender: userId,
      text: newMessage,
      conversationId: currentChat._id,
    }

    const receiverId = currentChat.members.find((member) => member !== userId)
    socket.emit('sendMessage', {
      senderId: userId,
      receiverId,
      text: newMessage,
    })

    try {
      const res = await sendMessage(message)
      setMessages([...messages, res.data])
    } catch (error) {
      console.log(error)
    }
    setNewMessage('')
  }

  return (
    <div className={classes.messageBox}>
      <div className={classes.messageBoxTop}>
        {messages.map((msg) => (
          <div ref={scrollRef}>
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
