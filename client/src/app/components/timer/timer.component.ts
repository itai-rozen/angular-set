import { Component, Input, Output, OnChanges, SimpleChanges, EventEmitter} from "@angular/core";

@Component ({
  standalone: true,
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.sass'
})

export class TimerComponent implements OnChanges {
  @Input() secsRemaining: number = 0;
  @Output() secsRemainingChange = new EventEmitter<number>;

  intervalId: null|ReturnType<typeof setInterval> = null;
  startTimer() {
    this.intervalId =  setTimeout(() => {
      this.secsRemainingChange.emit(this.secsRemaining-1);
    },1000)
  }
  stopTimer = () => {
    if (this.intervalId)
      clearInterval(this.intervalId!);

  } 

  ngOnChanges(changes: SimpleChanges) {
    const { secsRemaining } = changes;
    if (secsRemaining.currentValue > 0) {
      this.startTimer();
    }
    else
      this.stopTimer();
  }
}