import { Injectable, } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';
import { CalendarEvent } from '../lib/calendar-event';
import { Venue } from '../lib/venue';
import { VenueDataService } from './venue-data.service';
import { EventDataService } from './event-data.service';
import { MarkerService } from './marker.service';
import { zip } from 'rxjs/observable/zip';

/**
 * @brief Mediating service for handling cross-service circular dependencies (re: fly-weights/cross-references/etc)
 */

@Injectable()
export class DataService {

  constructor(
    private eventDataService: EventDataService,
    private venueDataService: VenueDataService
  ) {
    zip(
      eventDataService._events,
      venueDataService._venues
    ).subscribe(([events, venues]) => {
      if (events.length > 0 && venues.length > 0) {
        this.decorateEventsWithVenues(events);
        this.decorateVenuesWithEvents(venues);
        MarkerService.decorateVenuesWithMarkers(venues);
        this.dataCompilationComplete.next(true);
      }
    });
  }
  dataCompilationComplete: BehaviorSubject<boolean> = new BehaviorSubject(false);

  initialLoad() {
    this.eventDataService.events.subscribe();
    this.venueDataService.venues.subscribe();
  }
  decorateEventsWithVenues(events: CalendarEvent[]): void {
    // console.log('decorating events with venues');
    const venuesById = _.keyBy(this.venueDataService.venues.value, 'id');
    _.map(events, (event) => {
      event.venue = venuesById[event.venue_id];
    });

  }
  decorateVenuesWithEvents(venues: Venue[]) {
    // console.log('decorating venues with events');
    venues.forEach(venue => {
      venue.events = this.eventDataService.events.value.filter(event => event.venue_id === venue.id);
    });
  }
}
