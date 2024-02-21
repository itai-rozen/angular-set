import { Component } from '@angular/core';
import { SocketioService } from '../../services/socketio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { getCardsFromImgNumbers } from '../../cards.service';
import { Card, Room } from '../../types/types';
import { GameComponent } from '../game/game.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'multiplayer',
  standalone: true,
  imports: [GameComponent, CommonModule],
  templateUrl: './multiplayer.component.html',
  styleUrl: './multiplayer.component.sass'
})
export class MultiplayerComponent {
  constructor(
    private socketIoService: SocketioService,
    private route: ActivatedRoute,
    private router: Router
  ){}
  gameId: string = this.route.snapshot.paramMap.get('gameId') ?? ''
  cards: Card[] = []
  rooms: Room[] = []

  ngOnInit() {
    this.socketIoService.connect()

    if (this.gameId)
      this.socketIoService.joinGame(this.gameId)
    else 
      this.receiveRooms()
  }

  ngOnDestroy() {
    console.log('left!!')
    this.socketIoService.leaveGame(this.gameId)
  }

  onJoinGame = (gameId: string)  => {
    this.gameId = crypto.randomUUID()
    this.router.navigate(['/multiplayer', gameId])
  }

  receiveRooms = () => {
    this.socketIoService.receiveRooms().subscribe((rooms) => {
      console.log('rooms from server: ', rooms)
      this.rooms = rooms as Room[];
    })
  }

  onCreateRoom = () => {
    console.log('clicked create room')
    const newRoom = crypto.randomUUID()
    this.socketIoService.createRoom(newRoom);
    this.receiveRooms()
  }
}
