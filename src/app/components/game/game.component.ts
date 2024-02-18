import { Component, Input, OnInit } from "@angular/core";
import { CardComponent } from "../card/card.component";
import { cards } from "../../cards.service";
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
              border-radius: 12px`]
})

export class GameComponent {
  ngOnInit() {
    console.log('cards: ', cards)
  }
  @Input() numOfCards! : number;
  cards = cards;
  counter = (num:number) => new Array(num)
  
}