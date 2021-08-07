import React, { useState, useEffect, useContext } from 'react'
import { SocketContext } from '../../../socket/socket'

import ChatBoxBottom from './ChatBoxBottom/ChatBoxBottom'
import classes from './ChatPanel.module.css'
import CurrentUser from './CurrentUser/CurrentUser'
import Loader from './Loader/Loader'
import AnswerBtn from './AnswerBtn/AnswerBtn'

const ChatPanel = ({ currentChat, user }) => {
  const [showUser, setShowUser] = useState(true)
  const {
    callAccepted,
    userVideo,
    callMade,
    otherUser,
    myVideo,
    pageChanged,
    leaveCall,
  } = useContext(SocketContext)

  // to leave call when changing chat
  //runs only when chat is changed
  useEffect(() => {
    if (otherUser) {
      leaveCall()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChat])

  //stop webcam when page is changed
  useEffect(() => {
    return () => {
      pageChanged()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={classes.chatBox}>
      <div className={classes.chatBoxTop}>
        {/* answer button shows when call is coming */}
        <AnswerBtn />
        <video
          id='userVideo'
          playsInline
          muted={true}
          ref={myVideo}
          autoPlay
          className={
            showUser ? `${classes.userVideo}` : `${classes.userVideoHide} `
          }></video>
        {otherUser && (
          <video
            id='userVideo'
            playsInline
            ref={userVideo}
            autoPlay
            className={`${classes.otherUserVideo}`}></video>
        )}
        {!callAccepted && callMade && <Loader />}
        {!callAccepted && !callMade && (
          <CurrentUser currentChat={currentChat} />
        )}
      </div>
      {otherUser && (
        <ChatBoxBottom
          currentChat={currentChat}
          show={showUser}
          showFunction={setShowUser}
        />
      )}
    </div>
  )
}

export default ChatPanel
