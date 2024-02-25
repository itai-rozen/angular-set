import { Component, SimpleChanges } from '@angular/core';
import { SocketioService } from '../../services/socketio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { cards, shuffle } from '../../cards.service';
import { Card, Rooms } from '../../types/types';
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
    private router: Router,
  ){}

  gameId: string = this.route.snapshot.paramMap.get('gameId') ?? ''
  rooms: Rooms = {}

  ngOnInit() {
    console.log('game id: ', this.gameId)
    this.socketIoService.connect()
    if (!localStorage['active-player'])
      localStorage['active-player'] = crypto.randomUUID()
    if (this.gameId)
      this.socketIoService.joinGame(this.gameId)
    this.receiveRooms(true)

  }

  ngOnDestroy() {
    delete localStorage['active-player']
    console.log('left!!')
    this.socketIoService.leaveGame(this.gameId)
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes mPlayer cpt: ', changes)
  }
  onJoinGame = (gameId: string)  => this.router.navigate(['/multiplayer', gameId])
  
  onLeaveGame = () => this.router.navigate([''])

  onStartGame = (gameId: string) => {
    console.log('cards @onstartgame: ', cards)
    this.socketIoService.startGame(gameId, shuffle(cards))
    this.receiveStartGame()
  } 

  receiveRooms = (first = false) => {
    console.log('receive rooms!')
    this.socketIoService.receiveRooms(first).subscribe((rooms) => {
      console.log('rooms from server: ', rooms)
      this.rooms = rooms as Rooms;
      console.log('rooms @mPlayer.receiveRooms(): ', this.rooms)
    })
  }

  receiveStartGame = () => {
    this.socketIoService.receiveStartGame().subscribe((rooms) => {
      this.rooms = rooms as Rooms
    })
  }

  onCreateRoom = () => {
    console.log('clicked create room')
    const newRoom = crypto.randomUUID()
    this.socketIoService.createRoom(newRoom);
    this.receiveRooms()
  }

  isEmptyObject = (obj: {}) => {
    return Object.keys(obj).length === 0
  }
}
