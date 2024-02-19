import { Component, Input, Output, OnChanges, SimpleChanges, EventEmitter} from "@angular/core";

@Component ({
  standalone: true,
  selector: 'timer',
  templateUrl: './timer.component.html',
  styles: [`
  .timer-container
    display: block
    width: 100%
    display: flex
    justify-content: center
    align-items: center
  `, `
  .timer 
    border: 2px solid black
    border-radius: 10px
    padding: 1em
    margin: 1em
  `]
})

export class TimerComponent implements OnChanges {
  @Input() secsRemaining: number = 0
  @Output() secsRemainingEvent = new EventEmitter<number>

  intervalId: null|ReturnType<typeof setInterval> = null;
  startTimer() {
    this.intervalId =  setTimeout(() => {
      this.secsRemainingEvent.emit(this.secsRemaining-1)
    },1000)
  }
  stopTimer = () => {
    if (this.intervalId)
      clearInterval(this.intervalId!)

  } 

  ngOnChanges(changes: SimpleChanges) {
    const { secsRemaining } = changes
    if (secsRemaining.currentValue > 0) {
      this.startTimer()
    }
    else
      this.stopTimer()
  }
}