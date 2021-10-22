import React, { useState, useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import ChatPanel from './ChatPanel/ChatPanel'
import { useParams } from 'react-router'
import classes from './VideoChat.module.css'
import VideoConversation from './VideoConversation/VideoConversation'
import SelectVideo from '../../components/UI/SelectVideo/SelectVideo'
import { SocketContext } from '../../socket/socket'
import Meta from '../../components/Meta/Meta'

const VideoChat = () => {
  const { user } = useSelector((state) => state)
  const [currentChat, setCurrentChat] = useState(null)
  const conversations = user.schedules.filter((el) => el.videoRoomId !== '')
  const { setMe } = useContext(SocketContext)
  const { chatId } = useParams()

  //when a user comes by clicking notification
  useEffect(() => {
    const chat = conversations.find((el) => el.conversationId == chatId)
    if (chat) {
      setCurrentChat(chat)
      setMe(true)
    }
    //just want to render one time when component mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const currentChatHandler = (el) => {
    setCurrentChat(el)
    setMe(true)
  }
  
  return (
    <div className={classes.chatContainer}>
      <Meta title='Mollify | Video Conferences ' />
      <div className={classes.chatMenu}>
        <h1>Video Conferences</h1>
        {conversations?.map((el) => (
          <div key={el._id} onClick={() => currentChatHandler(el)}>
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
