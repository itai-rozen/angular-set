import { Component, Input, OnInit } from '@angular/core';
import { PlayersObjType, RoomsObjType } from '../../types/types';
import { isEmptyObject } from '../../services/utils.service';
import { Router } from '@angular/router';
import { SocketioService } from '../../services/socketio.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'lobby',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.sass'
})
export class LobbyComponent implements OnInit {
  constructor(
    private router: Router,
    private socketService: SocketioService) {
  }
  isEmptyObject: Function = isEmptyObject
  rooms?: RoomsObjType 

  ngOnInit(): void {
    this.socketService.connect()
    this.receiveRooms(true)
    if (!localStorage['active-player'])
      localStorage['active-player'] = crypto.randomUUID()
  }

  ngOnDestroy(): void {
    if (localStorage['active-player'])
      delete localStorage['active-player']
  }
  
  ngOnChanges(): void {
  
  }

  onLeaveLobby() {
    this.ngOnDestroy()
    this.router.navigate([''])
  }

  onCreateRoom():void {
    const gameId = crypto.randomUUID()
    this.socketService.createRoom(gameId)
    this.receiveRooms()
  }

  onJoinRoom(gameId: string): void {
    this.router.navigate(['/rooms', gameId])
  }

  receiveRooms(first: boolean = false):void {
    this.socketService.receiveRooms(first).subscribe(rooms => {
      console.log('rooms: ', rooms)
      this.rooms = rooms as RoomsObjType
    })
  }

  getNumOfPlayers = (activePlayersObject: any): number|undefined => {
    console.log('players object @getNumOfPlayers(): ', activePlayersObject)
    return Object.keys(activePlayersObject)?.length
  }
}
