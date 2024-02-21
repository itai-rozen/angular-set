import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket : Socket = io()

  connect(){
    this.socket = io('http://localhost:3000')
  }

  joinGame(gameId: string) {
    this.socket.emit('joinGame', { gameId })
  }

  startGame(gameId: string) {
    this.socket.emit('startGame', { gameId });
  }

  leaveGame(gameId: string) {
    this.socket.emit('leaveGame', { gameId })
  }

  createRoom(gameId: string) {
    console.log('inside socketservice create room :', gameId)
    this.socket.emit('createRoom', gameId)
  }

  receiveRooms() {
    return new Observable((observer) => {
      this.socket.on('getRooms', (rooms) => {
        observer.next(rooms)
      })
    })
  }
}
