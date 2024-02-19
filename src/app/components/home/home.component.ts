import { Component } from '@angular/core';
import { InstructionsComponent } from '../instructions/instructions.component';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'home',
  standalone: true,
  imports: [InstructionsComponent, RouterLink, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent {

}
