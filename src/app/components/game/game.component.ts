import { Component, Input, OnInit } from "@angular/core";
import { CardComponent } from "../card/card.component";
import { cards, shuffle } from "../../cards.service";
import { Card } from "../../types/types";
import { NgFor } from "@angular/common";
@Component({
  selector: 'game',
  standalone: true,
  templateUrl: './game.component.html',
  imports: [CardComponent, NgFor],
  styles: [`.game-card  
              width: 30%
              height: 150px
              border: 1px solid black
              margin: 1em
              display: flex
              align-items: center
              justify-content: center
              overflow: hidden
              border-radius: 12px
          `, 
          `.game 
              width: 100%
              display: flex
              flex-direction: row
              flex-wrap: wrap   
          `,
          `.highlight
              border: 2px solid green
              box-shadow: 2px 2px black
          `]
})

export class GameComponent {
  ngOnInit() {
    console.log('cards: ', cards)
  }
  @Input() numOfCards! : number;
  cards: Card[] = shuffle(cards);
  
  counter = (num:number) => new Array(num)

  clickCard = (imgNum: number): void => {
    this.cards = this.cards.map(card => {
      if (card.imgNumber === imgNum)
        card.isClicked = !card.isClicked
      return card;
    })
  }

}