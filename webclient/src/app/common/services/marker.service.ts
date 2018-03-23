import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Venue } from '../lib/venue';
import { Marker } from '../lib/marker';

@Injectable()
export class MarkerService {
  constructor() {}

  // service methods
  static decorateVenuesWithMarkers(venues: Venue[]): void {
    venues.forEach(venue => {
      venue.marker = MarkerService.markerFromVenue(venue);
    });
  }

  // factory methods
  static markerFromVenue(venue: Venue) {
    const options = <any>{};
    options.location = venue;

    return new Marker(options);
  }





}
