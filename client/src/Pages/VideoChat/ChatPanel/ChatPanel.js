import React, { useState, useEffect, useContext } from 'react'
import { SocketContext } from '../../../service/socket'

import ChatBoxBottom from './ChatBoxBottom/ChatBoxBottom'
import classes from './ChatPanel.module.css'
import CurrentUser from './CurrentUser/CurrentUser'
import Loader from './Loader/Loader'
import AnswerBtn from './AnswerBtn/AnswerBtn'

const ChatPanel = ({ currentChat, user }) => {
  const [showUser, setShowUser] = useState(true)
  const {
    callAccepted,
    leaveCall,
    answerCall,
    userVideo,
    callUser,
    callMade,
    otherUser,
    myVideo,
    call,
    pageChanged,
    me,
  } = useContext(SocketContext)

  //to leave call when changing chat
  // useEffect(() => {
  //   if (otherUser) {
  //     leaveCall()
  //   }
  // }, [currentChat])

  //stop webcam when page is changed
  useEffect(() => {
    return () => {
      pageChanged()
    }
  }, [])

  return (
    <div className={classes.chatBox}>
      <div className={classes.chatBoxTop}>
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
            muted={true}
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

    // <button onClick={makeCall}> make call</button>
  )
}

export default ChatPanel
