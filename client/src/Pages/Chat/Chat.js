import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { getConversation } from '../../utils/conversationUtils'
import Conversation from './Conversation/Conversation'
import MessageBox from './MessageBox/MessageBox'
import SelectChat from '../../components/UI/SelectChat/SelectChat'
import classes from './Chat.module.css'
import Meta from '../../components/Meta/Meta'

const Chat = (props) => {
  const [conversations, setConversations] = useState([])
  const { _id: currentUserId } = useSelector((state) => state.user)
  const [currentChat, setCurrentChat] = useState(null)

  //fetch user conversation when page mounts
  useEffect(() => {
    getConversation(setConversations)
  }, [])

  return (
    <div className={classes.chatContainer}>
      <Meta title='Mollify | Chat' />
      <div className={classes.chatMenu}>
        <h1>Patients</h1>
        {conversations.map((el) => (
          <div key={el._id} onClick={() => setCurrentChat(el)}>
            <Conversation
              key={el._id}
              currentChat={currentChat}
              conversation={el}
              currentUserId={currentUserId}
            />
          </div>
        ))}
      </div>
      <div className={classes.chatPanelContainer}>
        {currentChat ? (
          <MessageBox
            currentChat={currentChat}
            userId={currentUserId}
          />
        ) : (
          <SelectChat text='Select a Conversation' />
        )}
      </div>
    </div>
  )
}

export default Chat
