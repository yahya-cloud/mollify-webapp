import * as api from '../api/index'
import socket from '../socket/socket'

export function setArrivalMessageEvent(setArrivalMessage) {
  socket.on('getMessage', (data) => {
    setArrivalMessage({
      ...data,
      createdAt: Date.now(),
    })
  })
}

export function updateConversation(currentChat, setMessages, arrivalMessage) {
  const isUserPresent = currentChat.members.map(
    (person) => person.id === arrivalMessage.sender
  )
  if (isUserPresent) {
    setMessages((prev) => {
      return [...prev, arrivalMessage]
    })
  }
}

export async function getConversationMessages(chatId, setMessages) {
  try {
    const res = await api.getMessages(chatId)
    setMessages(res.data)
  } catch (error) {
    console.log(error)
  }
}

export async function sendMessage(messageBody, receiverId, setMessages) {
  socket.emit('sendMessage', {
    senderId: messageBody.senderId,
    receiverId,
    text: messageBody.text,
  })
  try {
    const res = await api.sendMessage(messageBody)
    setMessages((prev) => [...prev, res.data])
  } catch (error) {
    console.log(error)
  }
}