import { Component, Input, OnChanges, SimpleChanges} from "@angular/core";

@Component ({
  standalone: true,
  selector: 'timer',
  templateUrl: './timer.component.html'
})

export class TimerComponent implements OnChanges {
  constructor(){
    console.log('hello from timer constructor')
  }
  @Input() isTimeStart: boolean = false
  interval: number|null = null
  intervalId: null|ReturnType<typeof setInterval> = null;
  startTimer() {
    this.intervalId =  setInterval(() => {
      this.interval = this.interval ? this.interval+1 : 1 
    },1000)
  }
  stopTimer = () => {
    if (this.intervalId)
      clearInterval(this.intervalId!)
    this.interval = null
  } 

  ngOnChanges(changes: SimpleChanges) {
    const { isTimeStart } = changes
    console.log('is time start: ', isTimeStart)
    if (isTimeStart.currentValue) 
      this.startTimer()
    else
      this.stopTimer()
  }
}