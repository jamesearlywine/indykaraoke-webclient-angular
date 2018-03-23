import { Injectable, } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';

@Injectable()
export class DayOfWeekService {
  static daysOfWeek = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday'
  ];
  today = null;
  selectedDay: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() {
    this.today = this.calculateDOW();
    this.setSelectedDay(this.today);
  }
  setSelectedDay(dow: string) {
    if (dow.toLowerCase() !== this.selectedDay.value) {
      this.selectedDay.next(dow.toLowerCase());
    }
  }
  resetSelectedDay() {
    this.setSelectedDay(this.today);
  }
  calculateDOW(date = null) {
    const now = (date === null) ? new Date() : date;
    let nowDOW = now.getDay();
    const nowHour = now.getHours();
    // if it's < 4am, count it as yesterday
    if (nowHour < 4) { nowDOW = nowDOW - 1; }
    if (nowDOW < 0) { nowDOW = 6; }
    const dayOfWeek = DayOfWeekService.daysOfWeek[nowDOW];
    return dayOfWeek;
  }
}
