import { Injectable } from '@angular/core';
import { Venue } from '../lib/venue';
import { Marker } from '../lib/marker';

@Injectable()
export class MarkerService {
  constructor() {}

  // markers are eagerly built
  static decorateVenuesWithMarkers(venues: Venue[]): void {
    venues.forEach(venue => {
      venue.marker = Marker.fromVenue(venue);
    });
  }
}
