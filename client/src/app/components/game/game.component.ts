import { Component, Input, SimpleChanges } from "@angular/core";
import { CardComponent } from "../card/card.component";
import { TimerComponent } from "../timer/timer.component";
import { cards, shuffle } from "../../cards.service";
import { Card } from "../../types/types";
import { NgFor } from "@angular/common";
@Component({
  selector: 'game',
  standalone: true,
  templateUrl: './game.component.html',
  imports: [CardComponent, NgFor, TimerComponent],
  styleUrl: './game.component.sass'
})

export class GameComponent {
  ngOnInit() {
    console.log('cards: ', cards)
  }
  numOfCards : number = 12;
  cards: Card[] = shuffle(cards);
  secsRemaining: number = 0
  isSetClicked: boolean = false
  error: string = ''
  score: number = 0

  counter = (num:number) => new Array(num)
  setError = (msg: string) => {
    this.error = msg
    setTimeout(() => {      
        this.error = ''
    }, 2000)
  } 

  onCardClick = (imgNum: number): void => {
    this.cards = this.cards.map(card => {
      if (card.imgNumber === imgNum)
        card.isClicked = !card.isClicked
      return card;
    })
  }

  onSetClick = ():void => {
    this.secsRemaining = 5
    this.isSetClicked = true
  }

  onDoneClick = ():void => {
    this.secsRemaining = 0
    this.isSetClicked = false
    const clickedCards = this.cards.filter(card => card.isClicked)
    if (clickedCards.length !== 3) {
      this.setError('you need to pick exactly 3 ca  rds!')
      return;
    }
    const isSuccess: boolean = this.checkSet(clickedCards)
    this.setError(isSuccess ? 'You found a SET!' : 'This is not a valid set!')
    if (isSuccess) {
      this.score++
      setTimeout(this.dealCards, 2000)   
    }
    }

  dealCards = () => {
    this.cards = this.cards.filter(card => !card.isMatched)
  }

  checkSet = (clickedCards: Card[]):boolean => {
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
    this.cards = this.cards.map(card => {
      if (imgNumbers.includes(card.imgNumber))
        card.isMatched = true
      return card
    })
    return true;
  }

  allSameOrUnique = (arr: number[]|string[]):string|boolean => {
    const uniqueArr = [...new Set(arr as Iterable<any>)]
    return (uniqueArr.length === arr.length || uniqueArr.length === 1)
  }

  clearClicked = () => {
    this.cards = this.cards.map(card => {
      if (card.isClicked)
        card.isClicked = false;
      return card
    })
  }
}