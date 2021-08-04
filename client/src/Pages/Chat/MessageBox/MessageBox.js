import React, { useEffect, useState, useRef } from 'react'
import { getMessages, sendMessage } from '../../../api/index'
import socket from '../../../socket/socket'

import IconButton from '@material-ui/core/IconButton'
import SendIcon from '@material-ui/icons/Send'
import classes from './MessageBox.module.css'
import Message from './Message/Message'

const MessageBox = ({ userId, currentChat }) => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const scrollRef = useRef()

  //when remote user sends a message
  useEffect(() => {
    socket.on('getMessage', (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      })
    })
  }, [])

  //runs when a message is arrived & current chat is changed
  useEffect(() => {
    //only to add message if sender is in current chat
    if (
      arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender)
    ) {
      setMessages((prev) => [...prev, arrivalMessage])
    }
  }, [arrivalMessage, currentChat])

  //getting conversation messages
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
    //message body
    const message = {
      sender: userId,
      text: newMessage,
      conversationId: currentChat._id,
    }

    //sending message to receiver through socket
    const receiverId = currentChat.members.find((member) => member !== userId)
    socket.emit('sendMessage', {
      senderId: userId,
      receiverId,
      text: newMessage,
    })

    try {
      //sending message to receiver through mongodb
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
