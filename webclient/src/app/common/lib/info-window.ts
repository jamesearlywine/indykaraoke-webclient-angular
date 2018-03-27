import { } from '@types/googlemaps';
import * as _ from 'lodash';
import { CalendarEvent } from './calendar-event';

export class InfoWindow extends google.maps.InfoWindow {
  isOpen = false;

  static maxWidth() {
    const screenWidth = window.innerWidth;
    const maxInfoWindowWidth =
      screenWidth > 1199  // if screenWidth > 1199
        ? 400             // then maxInfoWindowWidth = 500
        : screenWidth > 991
          ? 300
          : screenWidth > 767
            ? 300
            : screenWidth > 479
              ? 250
              : 250 // otherwise, maxInfoWindowWidth = 300
      ;
    return maxInfoWindowWidth;
  }

  // instantiate an InfoWindowComponent here for content
  static getContent(event) {
    return "<div style='color: black'>hello</div>";
  }

  static fromEvent(event: CalendarEvent) {
    return new InfoWindow({event: event});
  }
  static infoWindowComponent() {

  }

  constructor(options = <any> {}) {
    super(
      _.merge(
        {
          content: InfoWindow.getContent(options.event),
          maxWidth: InfoWindow.maxWidth()
        }
        , options
      )
    );

    this._open = google.maps.InfoWindow.prototype.open;
    this._close = google.maps.InfoWindow.prototype.close;
    google.maps.event.addListener(this, "closeclick", function (e) {
      this.isOpen = false;
    });
  }
  // indirection for google.maps.InfoWindow methods, for isOpen state-management
  _open(map, marker) { }
  _close() { }
  open(map, marker) {
    this.isOpen = true;
    this._open(map, marker);
  }
  close() {
    this.isOpen = false;
    this._close();
  }
}
