import { Component, Input } from '@angular/core';
import { PlayersObjType } from '../../types/types';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'game-board',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.sass'
})
export class GameBoardComponent {
  @Input() activePlayers!: PlayersObjType;
  activePlayerId: string = localStorage['active-player'] || ''; 
}
