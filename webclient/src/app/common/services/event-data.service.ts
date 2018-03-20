import { Injectable, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';
import { environment } from '../../../environments/environment';
import { CalendarEvent } from '../lib/calendar-event';
import { WeeklyEvent } from '../lib/weekly-event';
import 'rxjs/add/operator/zip';

@Injectable()
export class EventDataService {

  constructor(
    private http: HttpClient,
  ) {}
  _events: BehaviorSubject<WeeklyEvent[]> = new BehaviorSubject([]);
  _fetchedEvents = false;

  get events() {
    if (!this._fetchedEvents) {
      this._fetchedEvents = true;
      this.getEvents();
    }
    return this._events;
  }
  getEvents() {
    this.http.get(environment.webserviceEndpoints.weeklyEvents)
      .subscribe(events => {
        this._events.next(<any[]>_.values(events));
      })
    ;
    return this._events;
  }
  byId(id: string | number) {
    id = id as number;
    const result = new BehaviorSubject(null);
    this.events.subscribe(events => {
      result.next(_.first(events.filter(event => event.id === id)));
    });
    return result;
  }
  byVenueId(id: string | number) {
    id = id as number;
    const result = new BehaviorSubject(null);
    this.events.subscribe(events => {
      result.next(events.filter(event => event.venue_id === id));
    });
    return result;
  }
  byWeekDay(weekday: string) {
    const result = new BehaviorSubject(null);
    this.events.subscribe(events => {
      result.next(events.filter(event => event.day_of_week === weekday));
    });
    return result;
  }
}
