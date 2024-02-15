import { Component, Input } from "@angular/core";
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
              height: 100px
              border: 1px solid black
              border-radius: 12px`]
})

export class GameComponent {
  @Input() numOfCards! : number;
  cards = cards;
  counter = (num:number) => new Array(num)
  
}