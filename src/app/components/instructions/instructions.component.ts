import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-instructions',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.sass'
})
export class InstructionsComponent {

}
