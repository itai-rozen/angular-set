import { Component, Input } from "@angular/core";
import { Card } from "../../types/types";
@Component ({
  selector: 'card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.sass'
})

export class CardComponent {
  @Input() card!: Card
  counter = (num: number) => new Array(num);
  
}