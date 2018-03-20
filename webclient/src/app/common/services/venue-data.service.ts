import { Injectable, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';
import { environment } from '../../../environments/environment';
import { Venue } from '../lib/venue';

@Injectable()
export class VenueDataService {

  constructor(
    private http: HttpClient,
  ) {

  }
  _venues: BehaviorSubject<Venue[]> = new BehaviorSubject([]);
  _fetchedVenues = false;

  get venues() {
    if (!this._fetchedVenues) {
      this._fetchedVenues = true;
      this.getVenues();
    }
    return this._venues;
  }
  getVenues() {
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
}
