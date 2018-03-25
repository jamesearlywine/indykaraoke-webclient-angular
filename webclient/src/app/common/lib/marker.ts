import { } from '@types/googlemaps';
import { environment } from '../../../environments/environment';
import * as _ from 'lodash';
import { InfoWindow } from './info-window';
import { Map } from './map';
import { Venue } from './venue';
import { CalendarEvent } from './calendar-event';
import { MarkerOptions } from './marker-options';
import { EventEmitter } from '@angular/core';
import { LocationService } from '../services/location.service';


export class Marker extends google.maps.Marker {

  public static defaults = {
    map: null,
    labelKey: 'id',
    titleKey: 'name',
    styling: environment.markers.styling,
    labelStyling: environment.markers.labelStyling,
    location: LocationService.cities[environment.city]
  };

  venue?: Venue;
  clicked: EventEmitter<Marker>;

  constructor(markerOptions: MarkerOptions) {
    super({
      icon: markerOptions.icon,
      position: markerOptions.position,
      map: markerOptions.map,
      label: markerOptions.label,
      title: markerOptions.title
    });
    this.venue = markerOptions.venue;
    this.clicked = new EventEmitter();
    this.addListener('click', (event) => this.clicked.emit(this));
  }

  /**
   * @brief Factory Methods
   */
  static fromVenue(venue: Venue, markerOptions: MarkerOptions = {}) {
    const markerSettings = <any>_.merge({}, Marker.defaults, markerOptions);

    // marker position (lat, lng)
    markerSettings.position = (
      venue.latitude !== undefined &&
      venue.longitude !== undefined
    )
      ? {
        lat: parseFloat(venue.latitude),
        lng: parseFloat(venue.longitude)
      }
      : {
        lat: parseFloat(Marker.defaults.location.latitude),
        lng: parseFloat(Marker.defaults.location.longitude)
      }
    ;

    // marker icon
    markerSettings.icon = Marker.defaults.styling;
    markerSettings.icon.labelOrigin =
      new google.maps.Point(
        Marker.defaults.styling.labelOriginX,
        Marker.defaults.styling.labelOriginY
      )
    ;

    // marker label
    markerSettings.label = markerSettings.labelStyling;
    markerSettings.label.text = venue[markerSettings.labelKey].toString();

    // rollover title
    markerSettings.title = venue[markerSettings.titleKey].toString();

    // this marker is venue aware
    markerSettings.venue = venue;

    return new Marker(markerSettings);
  }

  static fromEvent(event: CalendarEvent, markerOptions: MarkerOptions = {}) {
    return Marker.fromVenue(event.venue);
  }
}
