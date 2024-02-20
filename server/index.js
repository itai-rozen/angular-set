const server = require('express')
const httpServer = require('http').createServer(server)
const io = require('socket.io')(httpServer, {
  cors: true,
  origins: ['*']
})


io.on('connection', (socket) => {
  console.log('user connected!')

  socket.on('joinGame', ((gameId) => {
    socket.join(gameId)
    socket.to(gameId).emit('joinGame', 'a player joined the game!')
  }))
})
const PORT = 3000
httpServer.listen(PORT, () => console.log('server listens on port: ', PORT))