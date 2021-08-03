import React, { useState, useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import ChatPanel from './ChatPanel/ChatPanel'
import { useParams } from 'react-router'
import classes from './VideoChat.module.css'
import VideoConversation from './VideoConversation/VideoConversation'
import SelectVideo from '../../components/UI/SelectVideo/SelectVideo'
import { SocketContext } from '../../service/socket'

const VideoChat = () => {
  const { user } = useSelector((state) => state)
  const [currentChat, setCurrentChat] = useState(null)
  const conversations = user.schedules.filter((el) => el.videoRoomId !== '')
  const { setMe } = useContext(SocketContext)
  const { chatId } = useParams()


  useEffect(() => {
    const chat = conversations.find((el) => el.conversationId == chatId)
    if (chat) {
      setCurrentChat(chat)
      setMe(true)
    }
  }, [])

  const currentChatHandler = (el) => {
    setCurrentChat(el)
    setMe(true)
  }
  return (
    <div className={classes.chatContainer}>
      <div className={classes.chatMenu}>
        <h1>Video Conferences</h1>
        {conversations?.map((el) => (
          <div onClick={() => currentChatHandler(el)}>
            <VideoConversation
              key={el._id}
              currentChat={currentChat}
              conversation={el}
              photo={el.photo}
              name={el.name}
            />
          </div>
        ))}
      </div>
      <div className={classes.chatPanelContainer}>
        {currentChat ? (
          <ChatPanel currentChat={currentChat} user={user} />
        ) : (
          <SelectVideo text='Select a video chat' />
        )}
      </div>
    </div>
  )
}

export default VideoChat
