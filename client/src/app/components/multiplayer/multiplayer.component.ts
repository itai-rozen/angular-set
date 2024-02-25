import { Component, SimpleChanges } from '@angular/core';
import { SocketioService } from '../../services/socketio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { cards, shuffle } from '../../cards.service';
import { Card, PlayersObjType, RoomsObjType } from '../../types/types';
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
  rooms: RoomsObjType= {}

  ngOnInit() {
    console.log('game id: ', this.gameId)
    this.socketIoService.connect()
    if (!localStorage['active-player'])
      localStorage['active-player'] = crypto.randomUUID()
    if (this.gameId)
      this.socketIoService.joinGame(this.gameId, localStorage['active-player'])
    this.receiveRooms(true)

  }

  ngOnDestroy() { 
    console.log('left!! active player deleted from localstorage')
    this.socketIoService.leaveGame(this.gameId, localStorage['active-player'])
    delete localStorage['active-player']
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes mPlayer cpt: ', changes)
  }
  onJoinGame = (gameId: string|unknown)  => this.router.navigate(['/multiplayer', gameId])
  
  onLeaveGame = () => this.router.navigate([''])

  onStartGame = (gameId: string) => {
    console.log('cards @onstartgame: ', cards)
    this.socketIoService.startGame(gameId, cards)
    this.receiveStartGame()
  } 

  receiveRooms = (first = false) => {
    console.log('receive rooms!')
    this.socketIoService.receiveRooms(first).subscribe((rooms) => {
      console.log('rooms from server: ', rooms)
      this.rooms = rooms as RoomsObjType;
      console.log('rooms @mPlayer.receiveRooms(): ', this.rooms)
    })
  }

  receiveStartGame = () => {
    this.socketIoService.receiveStartGame().subscribe((rooms) => {
      this.rooms = rooms as RoomsObjType
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

  getNumOfPlayers = (playersObj: any) => {
    console.log('players object @getNumOfPlayers(): ', playersObj)
    return Object.keys(playersObj.activePlayers)?.length
  }
}
