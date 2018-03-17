import { Injectable, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';
import { environment } from '../../../environments/environment';
import { Venue } from '../lib/venue';
import { WeeklyEvent } from '../lib/weekly-event';

@Injectable()
export class VenueDataService {

  constructor(
    private http: HttpClient,
  ) { }
  _venues: BehaviorSubject<Venue[]> = null;

  get venues() {
    if (this._venues === null) { this.getVenues(); }
    return this._venues;
  }
  getVenues() {
    if (this._venues === null) { this._venues = new BehaviorSubject([]); }
    this.http.get(environment.webserviceEndpoints.venues)
      .subscribe(venues => {
        this._venues.next( <any[]> _.values(venues) );
      })
    ;
  }
  byId(id: string|number) {
    id = id as number;
    const result = new BehaviorSubject(null);
    this.venues.subscribe(venues => {
      result.next( _.first(venues.filter(venue => venue.id === id)) );
    });
    return result;
  }
  decorateEventsWithVenues(events: WeeklyEvent[]): void {
    this.venues.subscribe(venues => {
      const venuesById = _.keyBy(venues, 'id');
      _.map(events, (event) => {
        event.venue = venuesById[event.venue_id];
      });
    });
  }

}
