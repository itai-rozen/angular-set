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
    rooms[gameId.gameId] = (rooms[gameId.gameId]) ? rooms[gameId.gameId] + 1 : 1
    socket.join(gameId)
    socket.to(gameId).emit('joinGame', 'a player joined the game!')
    console.log('active players: ', rooms)
  }))

  socket.on('leaveGame', ((gameId) => {
    rooms[gameId.gameId] = (rooms[gameId.gameId]) ? rooms[gameId.gameId] - 1 : 0
    if (!rooms[gameId.gameId])
      delete rooms[gameId.gameId]
    socket.to(gameId).emit('leaveGame', 'a player left the game!')
    console.log('active players: ', rooms)
  }))

  socket.on('startGame', (async ({gameId}) => {
    const imgNums = await createGame();
    io.to(gameId).emit('startGame', imgNums)
  }))

  socket.on('getRooms', () => {
    console.log('getting rooms! ', rooms)
    io.emit('getRooms', Object.entries(rooms))
  })

  socket.on('createRoom', (gameId) => {
    rooms[gameId] = 0
    console.log('new room! \n', gameId)
    io.emit('getRooms', Object.entries(rooms)) 
  })


})
const PORT = 3000
httpServer.listen(PORT, () => console.log('server listens on port: ', PORT))