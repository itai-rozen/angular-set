import { Component, Input } from "@angular/core";

@Component ({
  selector: 'card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.sass'
})

export class CardComponent {
  @Input() numOfShaped!: number;
  @Input() shape!: string;
  @Input() fill!: string;
}