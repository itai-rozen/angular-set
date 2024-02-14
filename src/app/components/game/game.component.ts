import { Component, Input } from "@angular/core";

@Component({
  selector: 'game',
  standalone: true,
  templateUrl: './game.component.html',
  styles: []
})

export class GameComponent {
  @Input() numOfCards! : number;

}