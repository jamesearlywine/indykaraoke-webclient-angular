import { Component, AfterViewInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { WindowService } from '../../services/window.service';
import { DayOfWeekService } from '../../services/day-of-week.service';

@Component({
  selector: 'day-selector',
  templateUrl: './day-selector.component.html',
  styleUrls: ['./day-selector.component.scss']
})
export class DaySelectorComponent implements AfterViewInit {

  constructor(
    private dayOfWeekService: DayOfWeekService,
    private windowService: WindowService
  ) {
    this.windowService.nativeWindow.appDebug.DayOfWeekCtrl = this;
  }

  ngAfterViewInit() {}
}
