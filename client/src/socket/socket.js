import React, { useState, useEffect, useRef, createContext } from 'react'
import io from 'socket.io-client'
import Peer from 'simple-peer'
import { useDispatch } from 'react-redux'
import { showLoader } from '../store/actions/modal'

const SocketContext = createContext()

const socket = io(process.env.REACT_APP_SOCKET_URL)

const ContextProvider = ({ children }) => {
  const [stream, setStream] = useState({})
  const [me, setMe] = useState(false)
  const [otherUser, setOtherUser] = useState(false)
  const [call, setCall] = useState({})
  const [callAccepted, setCallAccepted] = useState(false)
  const [callMade, setCallMade] = useState(false)

  const myVideo = useRef()
  const userVideo = useRef()
  const connectionRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    //user video is not there until chat is selected
    if (me) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
          setStream(currentStream)
          myVideo.current.srcObject = currentStream
        })
    }

    //sets eventListeners when app.js loads
    socket.on('callUser', ({ signal, socketId, chatId, userName }) => {
      setCall({ isReceivingCall: true, socketId, signal, chatId, userName })
    })

    socket.on('callEnd', () => leaveCall())
  }, [me])

  //to close webcam when page is changed
  const pageChanged = () => {
    window.location.reload()
  }

  const answerCall = () => {
    setCallAccepted(true)
    setOtherUser(true)
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    })

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.socketId })
    })

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream
    })

    peer.signal(call.signal)

    connectionRef.current = peer
  }

  const callUser = ({ receiverId, chatId, userName }) => {
    setCallMade(true)
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    })

    peer.on('signal', (data) => {
      socket.emit('callUser', {
        receiverId,
        chatId,
        userName,
        signalData: data,
      })
    })

    peer.on('stream', (currentStream) => {
      console.log(currentStream)
      userVideo.current.srcObject = currentStream
    })

    socket.on('callAccepted', ({ signal, socketId }) => {
      setCall({ isCallAnswered: true, socketId })
      setCallAccepted(true)
      setOtherUser(true)
      peer.signal(signal)
    })

    socket.on('notFound', () => {
      dispatch(showLoader('User is not online'))
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    })

    connectionRef.current = peer
  }

  const leaveCall = () => {
    socket.emit('callEnd', call.socketId)
    dispatch(showLoader('Call was Ended'))
    connectionRef.current.destroy()
    setCall({})
    setOtherUser(false)
    setTimeout(() => {
      window.location.reload()
    }, 1500)
  }

  return (
    <SocketContext.Provider
      value={{
        call,
        callMade,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        otherUser,
        setMe,
        me,
        callUser,
        leaveCall,
        answerCall,
        pageChanged,
      }}>
      {children}
    </SocketContext.Provider>
  )
}

export { ContextProvider, SocketContext }

export default socket
