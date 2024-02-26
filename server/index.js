const server = require('express')
const httpServer = require('http').createServer(server)
const io = require('socket.io')(httpServer, {
  cors: true,
  origins: ['*']
})
const { createGame } = require('./cards')

const rooms = {}

io.on('connection', (socket) => {
  console.log('user connected!!! \nrooms: ', rooms)

  socket.on('joinGame', (({gameId, playerId}) => {
    console.log('rooms @joinGame', rooms)
    console.log('game ID @joinGame(): ', gameId)
    console.log('player ID @joinGame(): ', playerId)
    const gameObj = rooms[gameId] || null
    const playerObj = gameObj?.activePlayers[playerId] || null
    
    console.log('game obj @joinGame(): ', gameObj)
  
    console.log('playerObj obj @joinGame(): ', playerObj)
    if (gameObj && !playerObj) {
        gameObj.activePlayers[playerId] = {
      _id: playerId,
      sets: 0,
      gameId: gameId,
      isStartGame: false,
      isClickedSet: false,
      name: ''
      }
    }
    socket.join(gameId)
    socket.to(gameId).emit('joinGame', 'a player joined the game!')
    // console.log('active players: ', rooms)
  }))

  socket.on('leaveGame', (({gameId, playerId}) => {
    const gameObj = rooms[gameId] || null
    const playerObj = gameObj?.activePlayers[playerId] || null
    console.log('game id @leaveGame: ', gameId)
    if (gameObj && playerObj)
      delete playerObj
    if (playerObj && Object.keys(rooms[gameId]?.activePlayers)?.length === 0 ) // activeplayers prop is empty object = all players left the game
      delete gameObj
    socket.to(gameId).emit('leaveGame', 'a player left the game!')
    // console.log('active players: ', rooms)
  }))

  socket.on('startGame', (({gameId, cards}) => {
    console.log('game id @startGame: ', gameId)
    console.log('cards @startGame: ', cards[0])
    console.log('room: ', rooms)
    if (rooms[gameId]) {
      console.log('found the room! setting the cards')
      rooms[gameId].cards = cards 
    } else {
      console.log('no such game room!')
    }
    io.emit('startGame', rooms)
  }))

  socket.on('getRooms', () => {
    console.log('getting rooms! ')
    io.emit('getRooms', rooms)
  })

  socket.on('createRoom', (gameId) => {
    console.log('Create Room! *********\ngame id: ', gameId)
    rooms[gameId] = {
      activePlayers: {},
      cards: []
    }
    console.log('new room! \n', gameId)
    console.log('rooms @pmulcreateRoom: ', rooms)
    io.emit('getRooms', rooms) 
  })
})
const PORT = 3000
httpServer.listen(PORT, () => console.log('server listens on port: ', PORT))