import { Routes } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { InstructionsComponent } from './components/instructions/instructions.component';
import { HomeComponent } from './components/home/home.component';
import { LobbyComponent }  from './components/lobby/lobby.component';
import { GamesRoomListComponent } from './components/games-room-list/games-room-list.component';
export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'game', component: GameComponent},
  {path: 'instructions', component: InstructionsComponent},
  {path: 'rooms/:gameId', component: GamesRoomListComponent},
  {path: 'lobby', component: LobbyComponent},
];
