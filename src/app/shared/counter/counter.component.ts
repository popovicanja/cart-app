import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'ca-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  @Input() counter: number;

  @Output() changeCounter: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  decrease() {
    if (this.counter > 1) {
      this.counter -= 1;
      this.changeCounter.emit(this.counter);
    }
  }

  increase() {
    this.counter += 1;
    this.changeCounter.emit(this.counter);
  }

}
