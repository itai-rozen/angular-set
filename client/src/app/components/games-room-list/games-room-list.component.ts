import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameObjType, PlayersObjType, RoomsObjType } from '../../types/types';
import { SocketioService } from '../../services/socketio.service';
import { GameComponent } from '../game/game.component';
import { cards, shuffle } from '../../cards.service';
@Component({
  selector: 'games-room-list',
  standalone: true,
  imports: [GameComponent],
  templateUrl: './games-room-list.component.html',
  styleUrl: './games-room-list.component.sass'
})
export class GamesRoomListComponent implements OnInit{
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private socketService: SocketioService  
  ){
    this.router = inject(Router)
  }

  gameId: string = this.route.snapshot.paramMap.get('gameId') ?? ''
  game: any = {} 

  ngOnInit(): void {
    this.socketService.connect()
    this.socketService.joinGame(this.gameId, localStorage['active-player'])
    this.receiveUpdateGame(true)  
    console.log('game room init!!=')
  }

  onStartGame = () => {
    console.log('cards @onstartgame: ', cards)
    this.socketService.startGame(this.gameId, shuffle(cards))
    this.receiveUpdateGame()
    
  } 

  receiveUpdateGame(first: boolean = false) {
    // this.game = this.socketService.receiveGame(this.gameId)
    // console.log('updated game!\n: ', this.game)
    this.socketService.receiveGame(this.gameId, first).subscribe((updateGame) => {
      console.log('updated game: ', updateGame)
      this.game = updateGame as any
    })
  }

  onLeaveGame() {
    this.router.navigate(['/lobby'])
  }
}
