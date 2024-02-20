import { Routes } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { InstructionsComponent } from './components/instructions/instructions.component';
import { MultiplayerComponent } from './components/multiplayer/multiplayer.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'game', component: GameComponent},
  {path: 'instructions', component: InstructionsComponent},
  {path: 'multiplayer', component: MultiplayerComponent},
];
