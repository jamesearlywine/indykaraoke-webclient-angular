import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { WindowService } from '../common/services/window.service';
import { EventDataService } from '../common/services/event-data.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  title = 'appasdf';

  venues = [
    'Joe',
    'James',
    'Keela',
    'John'
  ];

  private subscriotions = {
    navigationEnd: null
  };

  constructor(
    private router: Router,
    private windowService: WindowService,
    private eventDataService: EventDataService
  ) {
    this.windowService.nativeWindow.appDebug.HomeCtrl = this;
  }

  ngAfterViewInit() {
    this.doScroll();
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


}
