import { Component, EventEmitter } from '@angular/core';
import { Input, Output } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'finish-modal',
  standalone: true,
  imports: [],
  templateUrl: './finish-modal.component.html',
  styleUrl: './finish-modal.component.sass'
})

export class FinishModalComponent {
  constructor(
    protected router: Router
  ){}
  @Input() isClickedFinish!: boolean;
  @Output() isClickedFinishChange = new EventEmitter<boolean>();

  setFinished = () => {
    this.isClickedFinish = false;
    this.isClickedFinishChange.emit(this.isClickedFinish);
  } 
}
