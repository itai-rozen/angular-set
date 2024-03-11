import { Component, Input } from '@angular/core';
import { PlayersObjType } from '../../types/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'game-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.sass'
})
export class GameBoardComponent {
  @Input() activePlayers!: PlayersObjType;
  activePlayerId: string = localStorage['active-player'] || ''; 
}
