import { } from '@types/googlemaps';
import { environment } from '../../../environments/environment';
import * as _ from 'lodash';
import { InfoWindow } from './info-window';
import { Map } from './map';
import { Venue } from './venue';
import { MarkerOptions } from './marker-options';

export class Marker extends google.maps.Marker {

  public static defaults = {
    map: null,
    labelKey: 'id',
    titleKey: 'name',
    styling: environment.markers.styling,
    labelStyling: environment.markers.labelStyling,
  };

  infoWindow: InfoWindow;
  map: Map;
  venue: Venue;

  // should be typed to MarkerOptions class
  constructor(options: MarkerOptions) {

    const markerSettings = <any> _.merge({}, Marker.defaults, options);
    markerSettings.pinSymbol = <any> _.merge({}, Marker.defaults.styling);

    // marker position (lat, lng)
    if ( markerSettings.location !== undefined
      && markerSettings.location.latitude !== undefined
      && markerSettings.location.longitude !== undefined
    ) {
      markerSettings.position = {
        lat: parseFloat(markerSettings.location.latitude),
        lng: parseFloat(markerSettings.location.longitude)
      };
    }

    // marker label
    markerSettings.label = _.merge(
      {
        text: markerSettings.location[markerSettings.labelKey].toString(),
      },
      markerSettings.labelStyling
    );

    // marker icon
    markerSettings.icon = markerSettings.pinSymbol;
    markerSettings.icon.labelOrigin =
      new google.maps.Point(
        markerSettings.icon.labelOriginX,
        markerSettings.icon.labelOriginY
      )
    ;

    // rollover title
    markerSettings.title = markerSettings.location[markerSettings.titleKey].toString();

    // parent constructor call
    super({
      icon: markerSettings.icon,
      position: markerSettings.position,
      map: markerSettings.map,
      label: markerSettings.label,
      title: markerSettings.title
    });

    this.venue = options.location;
    const marker = this;
    this.addListener('click', (event) => {
      console.log('marker clicked event: ', event, ' marker: ', marker);
    });
  }
  openInfoWindow() { this.infoWindow.open(this.map, this); }
  closeInfoWindow() { this.infoWindow.close(); }
  isInfoWindowOpen() {
    const infoWindowMap = this.infoWindow.getMap();
    return (
      infoWindowMap !== undefined
      && infoWindowMap !== null
    );
  }
}
