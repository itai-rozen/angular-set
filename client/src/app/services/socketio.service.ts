import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { Card } from '../types/types';
@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket : Socket = io()

  connect(){
    this.socket = io('http://localhost:3000')
  }

  joinGame(gameId: string, playerId: string) {
    console.log('socket - join game \n Player ID: ', playerId)
    this.socket.emit('joinGame', { gameId, playerId })
  }

  startGame(gameId: string, cards: Card[]) {
    console.log('start game!!')
    this.socket.emit('startGame', { gameId, cards });
  }

  leaveGame(gameId: string, playerId: string) {
    console.log('socket - leave game \n Player ID: ', playerId)
    console.log('socket - leave game \n Game ID: ', gameId)
    this.socket.emit('leaveGame', { gameId, playerId })
  }

  createRoom(gameId: string) {
    console.log('inside socketservice create room :', gameId)
    this.socket.emit('createRoom', gameId)
  }

  receiveRooms(first = false) {
    if (first)
      this.socket.emit('getRooms')
    console.log('socketio receive rooms!')
    return new Observable((observer) => {
      this.socket.on('getRooms', (rooms) => {
        observer.next(rooms)
        console.log('rooms @cards.service getRooms socket: ', rooms)
      })
    })
  }

  receiveStartGame() {
    return new Observable((observer) => {
      this.socket.on('startGame', (rooms) => {
        if (rooms) {
          console.log('recrive!')
          observer.next(rooms)
        }
      })
    })
  }
}
