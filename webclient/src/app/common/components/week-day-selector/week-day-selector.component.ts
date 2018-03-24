import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { WindowService } from '../../services/window.service';
import { DayOfWeekService } from '../../services/day-of-week.service';

@Component({
  selector: 'week-day-selector',
  templateUrl: './week-day-selector.component.html',
  styleUrls: ['./week-day-selector.component.scss']
})
export class WeekDaySelectorComponent {
  selectedDayValue: string;

  @Input()
  get selectedDay() { return this.selectedDayValue; }
  @Output() selectedDayChange = new EventEmitter();
  set selectedDay(value) {
    this.selectedDayValue = value;
    this.selectedDayChange.emit(this.selectedDayValue);
  }

  constructor() {}

  selectDay(value) { this.selectedDay = value; }
}
