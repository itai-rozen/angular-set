import { Component, Input, OnInit } from '@angular/core';
import { PlayersObjType, RoomsObjType } from '../../types/types';
import { isEmptyObject, getNumOfActivePlayers } from '../../services/utils.service';
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
  isEmptyObject: Function = isEmptyObject;
  getNumOfActivePlayers: Function = getNumOfActivePlayers;
  rooms?: RoomsObjType;

  ngOnInit(): void {
    this.socketService.connect();
    this.receiveRooms(true);
    if (!localStorage['active-player'])
      localStorage['active-player'] = crypto.randomUUID();
  }

  ngOnDestroy(): void {

  }
  
  ngOnChanges(): void {
  
  }

  onLeaveLobby(): void {
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

}
