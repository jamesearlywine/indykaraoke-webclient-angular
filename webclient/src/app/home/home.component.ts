import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { zip } from 'rxjs/observable/zip';
import { WindowService } from '../common/services/window.service';
import { EventDataService } from '../common/services/event-data.service';
import { VenueDataService } from '../common/services/venue-data.service';
import { DataService } from '../common/services/data.service';
import { WeeklyEvent } from '../common/lib/weekly-event';
import { DayOfWeekService } from '../common/services/day-of-week.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  weeklyEvents: BehaviorSubject<WeeklyEvent[]> = new BehaviorSubject([]);

  constructor(
    private router: Router,
    private windowService: WindowService,
    private eventDataService: EventDataService,
    private venueDataService: VenueDataService,
    private dataService: DataService,
    private dayOfWeekService: DayOfWeekService
  ) {
    this.windowService.nativeWindow.appDebug.HomeCtrl = this;
  }

  ngAfterViewInit() {
    this.doScroll();
    zip(
      this.dataService.dataCompilationComplete,
      this.eventDataService.events
    ).subscribe(([compilationComplete, events]) => {
      if (compilationComplete) { this.updateWeeklyEvents(); }
    });
    this.dayOfWeekService.selectedDay.subscribe(selectedDay => {
      this.updateWeeklyEvents();
    });
  }

  doScroll() {
    setTimeout(() => {
      if (this.router.url === '/where') {
        this.windowService.scrollToWhereToSing();
      } else {
        // this.windowService.scrollToTop();
      }
    }, 10);
  }
  updateWeeklyEvents() {
    this.weeklyEvents.next(
      this.eventDataService.events.value
        .filter(event => event.day_of_week === this.dayOfWeekService.selectedDay.value)
    );
  }


}
