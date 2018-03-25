import { Injectable } from '@angular/core';
import { CalendarEvent } from '../lib/calendar-event';
import { InfoWindow } from '../lib/info-window';

@Injectable()
export class InfoWindowService {
  constructor() { }

  // infowindows are semi-lazily instantiated
  static decorateEventsWithInfoWindows(events: CalendarEvent[]): void {
    events.forEach(event => {
      event.infoWindow = InfoWindow.fromEvent(event);
    });
  }
}
