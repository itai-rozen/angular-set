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

  socket.on('joinGame', ((gameId, playerId) => {
    const gameObj = rooms[gameId.gameId] || null
    const playerObj = gameObj?.activePlayers[playerId] || null

    if (gameObj && !playerObj) {
        gameObj.activePlayers[playerId] = {
      _id: playerId,
      sets: 0,
      gameId: gameId,
      name: ''
      }
    }
    socket.join(gameId)
    socket.to(gameId).emit('joinGame', 'a player joined the game!')
    // console.log('active players: ', rooms)
  }))

  socket.on('leaveGame', ((gameId, playerId) => {
    const gameObj = rooms[gameId.gameId] || null
    const playerObj = gameObj?.activePlayers[playerId] || null
    if (gameObj && playerObj)
      delete playerObj
    if ( Object.keys(rooms[gameId.gameId]?.activePlayers).length === 0 ) // activeplayers prop is empty object = all players left the game
      delete gameObj
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
      activePlayers: {},
      cards: []
    }
    console.log('new room! \n', gameId)
    io.emit('getRooms', rooms) 
  })


})
const PORT = 3000
httpServer.listen(PORT, () => console.log('server listens on port: ', PORT))