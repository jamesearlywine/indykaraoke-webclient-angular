import { Injectable, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';
import { environment } from '../../../environments/environment';
import { WeeklyEvent } from '../lib/weekly-event';
import { Venue } from '../lib/venue';
import { VenueDataService } from './venue-data.service';
import 'rxjs/add/operator/zip';

@Injectable()
export class EventDataService {

  constructor(
    private http: HttpClient,
    private venueDataService: VenueDataService
  ) { }
  _events: BehaviorSubject<WeeklyEvent[]> = null;

  get events() {
    if (this._events === null) { this.getEvents(); }
    return this._events;
  }
  getEvents() {
    if (this._events === null) { this._events = new BehaviorSubject([]); }
    this.http.get(environment.webserviceEndpoints.weeklyEvents)
      .subscribe(events => {
        this.venueDataService.decorateEventsWithVenues( <WeeklyEvent[]> events );
        this._events.next( <any[]> _.values(events) );
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
  byWeekDay(weekday: string) {
    const result = new BehaviorSubject(null);
    this.events.subscribe(events => {
      result.next( _.filter(events, event => event.day_of_week === weekday) );
    });
    return result;
  }

}
