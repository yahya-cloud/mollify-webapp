export const socketEvents = (io) => {
  let users = []

  const addUser = (userId, socketId) => {
    !users.some((user) => user.socketId === socketId) &&
      users.push({ userId, socketId })
  }

  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId)
  }

  const getUser = (userId) => {
    return users.find((user) => user.userId === userId)
  }

  io.on('connection', (socket) => {
    //when connect
    // console.log('a user connected ' + socket.id)

    //adding user by taking userId
    socket.on('addUser', (userId) => {
      addUser(userId, socket.id)
      io.emit('getUsers', users)
    })

    socket.on('callUser', ({ receiverId, signalData, chatId, userName }) => {
      const user = getUser(receiverId)
      if (user) {
        io.to(user.socketId).emit('callUser', {
          socketId: socket.id,
          signal: signalData,
          chatId,
          userName,
        })
      } else {
        io.emit('notFound')
      }
    })

    socket.on('callEnd', (socketId) => {
      io.to(socketId).emit('callEnd')
    })

    socket.on('answerCall', ({ signal, to }) => {
      io.to(to).emit('callAccepted', { signal, socketId: socket.id })
    })

    //send and get message
    socket.on('sendMessage', ({ senderId, receiverId, text }) => {
      const user = getUser(receiverId)
      if (user) {
        console.log(user)
        io.to(user.socketId).emit('getMessage', {
          senderId,
          text,
        })
      } else {
        socket.emit('notFound')
      }
    })

    //when disconnect
    socket.on('disconnect', () => {
      removeUser(socket.id)
      io.emit('getUsers', users)
    })
  })
}
