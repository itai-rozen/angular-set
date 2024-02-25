const server = require('express')
const httpServer = require('http').createServer(server)
const io = require('socket.io')(httpServer, {
  cors: true,
  origins: ['*']
})
const { createGame } = require('./cards')

const rooms = {}

io.on('connection', (socket) => {
  console.log('user connected!')

  socket.on('joinGame', ((gameId) => {
    if (rooms[gameId.gameId])
      rooms[gameId.gameId].activePlayers++
    socket.join(gameId)
    socket.to(gameId).emit('joinGame', 'a player joined the game!')
    // console.log('active players: ', rooms)
  }))

  socket.on('leaveGame', ((gameId) => {
    if (rooms[gameId.gameId])
      rooms[gameId.gameId].activePlayers--
    if (!rooms[gameId.gameId]?.activePlayers)
      delete rooms[gameId.gameId]
    socket.to(gameId).emit('leaveGame', 'a player left the game!')
    // console.log('active players: ', rooms)
  }))

  socket.on('startGame', (({gameId, cards}) => {
    rooms[gameId].cards = cards
    io.emit('startGame', rooms)
  }))

  socket.on('getRooms', () => {
    console.log('getting rooms! ', rooms)
    io.emit('getRooms', rooms)
  })

  socket.on('createRoom', (gameId) => {
    rooms[gameId] = {
      activePlayers: 0,
      cards: []
    }
    console.log('new room! \n', gameId)
    io.emit('getRooms', rooms) 
  })


})
const PORT = 3000
httpServer.listen(PORT, () => console.log('server listens on port: ', PORT))