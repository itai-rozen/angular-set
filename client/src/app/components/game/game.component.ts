import { Component, Input, SimpleChanges } from "@angular/core";
import { CardComponent } from "../card/card.component";
import { TimerComponent } from "../timer/timer.component";
import { cards, shuffle } from "../../services/cards.service";
import { Card, PlayersObjType, RoomsObjType } from "../../types/types";
import { NgFor } from "@angular/common";
import { Router } from "@angular/router";
import { SocketioService } from "../../services/socketio.service";
import { navigateTo } from "../../services/utils.service";
import { GameBoardComponent } from "../game-board/game-board.component";

@Component({
    selector: 'game',
    standalone: true,
    templateUrl: './game.component.html',
    imports: [CardComponent, NgFor, TimerComponent, GameBoardComponent],
    styleUrl: './game.component.sass'
})

export class GameComponent {
    constructor(
        private router: Router,
        private socketService: SocketioService
    ) { }

    // @Input() mpCards?: Card[]
    @Input() game?: any;

    isMultiplayer: boolean = this.game ? true : false;
    gameId: string = this.game?.id;
    mpCards: Card[] =  this.isMultiplayer ? this.game.cards : undefined;
    activePlayerId: string = localStorage['active-player'];
    navigateTo: Function = navigateTo;
    numOfCards: number = 12;
    gameCards: Card[] = this.mpCards || shuffle(cards);
    secsRemaining: number = 0;
    error: string = '';
    score: number = this.isMultiplayer ? this.game.activePlayers[this.activePlayerId].sets : 0;

    ngOnChanges(changes: SimpleChanges) {
        console.log('changes \n ******************** \n\n', changes)
        if (changes['game']) {
            this.isMultiplayer = true
            this.gameCards = changes['game'].currentValue.cards;
            console.log('game id: ', changes['game'].currentValue.id)
            this.gameId = changes['game'].currentValue.id;
        }
        console.log('game cards: ', this.gameCards)
    }

    ngOnInit() {
      if (this.isMultiplayer) {
        this.activePlayerId = localStorage['active-player']
      }
        // console.log('mp-cards @game component.ngOninit(): ', )
        console.log('the game: ', this.game)
        console.log('multiplayer? ', this.isMultiplayer)

    }

    counter = (num: number) => new Array(num)

    setError = (msg: string) => {
        this.error = msg
        setTimeout(() => {
            this.error = ''
        }, 2000)
    }

    onCardClick = (imgNum: number): void => {
        if (this.isMultiplayer) {
            console.log('this game: ', this.game)
            if (!this.activePlayerId)
                return
            console.log('player: ', this.game.activePlayers[this.activePlayerId])
            if (!this.game.activePlayers[this.activePlayerId].isClickedSet)
                return
            if (!this.secsRemaining)
                return
        }

        this.gameCards = this.gameCards.map(card => {
            if (card.imgNumber === imgNum)
            card.isClicked = !card.isClicked
          return card;
        })
        if (this.isMultiplayer) {
          this.socketService.updateCards(this.game.id, this.gameCards)
          this.receiveGame(this.game.id)
        }
    }

    onSetClick = (): void => {
        this.secsRemaining = 5
        if (this.isMultiplayer) {
            console.log('who clicked? ', this.activePlayerId)
            this.socketService.updatePlayer(this.game.id, this.activePlayerId, 'isClickedSet', true)
            // this.game.activePlayers[this.activePlayerId].isClickedSet = true
            this.receiveGame(this.game.id);
        }
    }

    onDoneClick = (): void => {
        this.secsRemaining = 0
        // this.isSetClicked = false
        if (this.isMultiplayer) {
            console.log('clicked done!')
            if (!this.activePlayerId) {
                console.log('error: no active playeer id')
                return
            }
            this.socketService.updatePlayer(this.game.id, this.activePlayerId, 'isClickedSet', false)
            this.activePlayerId = ''
        }
        const clickedCards = this.gameCards.filter(card => card.isClicked)
        if (clickedCards.length !== 3) {
            this.setError('you need to pick exactly 3 cards!')
            return;
        }
        const isSuccess: boolean = this.checkSet(clickedCards)
        this.setError(isSuccess ? 'You found a SET!' : 'This is not a valid set!')
        if (isSuccess) {
            this.score++
        } else {
            this.score--
        }

        if (this.isMultiplayer) {
          this.socketService.updatePlayer(this.game.id, this.activePlayerId, 'sets', this.score+'')
          this.receiveGame(this.game.id)
        }

        if (isSuccess)
          setTimeout(this.dealCards, 2000)
    }

    dealCards = () => {
        this.gameCards = this.gameCards.filter(card => !card.isMatched)
    }

    checkSet = (clickedCards: Card[]): boolean => {
        const shapes: string[] = []
        const shapeQtt: number[] = []
        const fills: string[] = []
        const colors: string[] = []
        clickedCards.forEach(card => {
            shapes.push(card.shape)
            shapeQtt.push(card.numOfShapes)
            fills.push(card.fill)
            colors.push(card.color)
        })

        const results = []
        results.push(this.allSameOrUnique(shapes))
        results.push(this.allSameOrUnique(shapeQtt))
        results.push(this.allSameOrUnique(fills))
        results.push(this.allSameOrUnique(colors))
        console.log('results: ', results)
        setTimeout(this.clearClicked, 2000)
        if (results.includes(false))
            return false

        const imgNumbers: number[] = clickedCards.map(card => card.imgNumber)
        this.gameCards = this.gameCards.map(card => {
            if (imgNumbers.includes(card.imgNumber))
                card.isMatched = true
            return card
        })
        return true;
    }

    allSameOrUnique = (arr: number[] | string[]): string | boolean => {
        const uniqueArr = [...new Set(arr as Iterable<any>)]
        return (uniqueArr.length === arr.length || uniqueArr.length === 1)
    }

    clearClicked = () => {
        this.gameCards = this.gameCards.map(card => {
            if (card.isClicked)
                card.isClicked = false;
            return card
        })
    }
    //TODO merge with other onLeaveGame func for one util general func
    onLeaveGame = () => {
      if (this.isMultiplayer) {
        console.log('leaving the gamEEE')
        this.socketService.leaveGame(this.game.id, this.activePlayerId);
      }
      console.log('multiplayer? : ', this.isMultiplayer)
      let path = this.isMultiplayer ? '/lobby' : '';
      this.router.navigate([path])
    } 

    receiveGame(gameId: string) {
        console.log('recieve game!')
        this.socketService.receiveGame(gameId, true).subscribe((newGame) => {
          console.log('new game: ', newGame)
          this.game = newGame
        })
      }

}