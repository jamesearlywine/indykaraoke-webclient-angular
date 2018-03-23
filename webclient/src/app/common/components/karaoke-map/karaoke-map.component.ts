import { Component, ElementRef, Input, AfterViewInit, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import * as _ from 'lodash';
import {} from 'googlemaps';

import { LocationService } from '../../services/location.service';
import { WindowService } from '../../services/window.service';
import { WeeklyEvent } from '../../lib/weekly-event';
import { Map } from '../../lib/map';
import { Marker } from '../../lib/marker';

@Component({
  selector: 'karaoke-map',
  templateUrl: './karaoke-map.component.html',
  styleUrls: ['./karaoke-map.component.scss']
})
export class KaraokeMapComponent implements OnInit, AfterViewInit {
  @Input() events: BehaviorSubject<WeeklyEvent[]>; // @todo write Venue class

  constructor(
    private hostElement: ElementRef,
    private locationService: LocationService,
    private windowService: WindowService
  ) {
    this.windowService.nativeWindow.appDebug.karaokeMapCtrl = this;
  }

  mapDefaults = {
    initialZoom: 10,
    initialCenter: this.locationService.city,
    gotoEventZoomLevel: 14
  };
  mapProperties = null;
  mapElement = null;
  map: Map;
  markers: Marker[];

  ngOnInit() {
    this.mapProperties = _.merge({}, this.mapDefaults);
    this.events.subscribe(events => {
      if (this.events.value.length > 0) { this.refreshMarkers(); }
    });
  }

  ngAfterViewInit() {
    this.mapElement = this.hostElement.nativeElement.querySelector('#google-map');
    this.initMap();
  }

  initMap() {
    this.map = new Map(
      this.mapElement,
      {
        center: new google.maps.LatLng(
          this.mapProperties.initialCenter.lat,
          this.mapProperties.initialCenter.lng,
        ),
        zoom: this.mapProperties.initialZoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
    );
    // this.showMarkers();
  }

  /**
   * Markers
   */
  showMarkers() {
    this._extractMarkers();
    if (this.markers.length > 0) {
      this._displayMarkers();
    }
  }
  refreshMarkers() {
    this.removeMarkers();
    this.showMarkers();
  }
  removeMarkers() {
    if (this.markers === undefined) { return; }
    this.markers.forEach(marker => {
      marker.setMap(null);
    });
  }
  _extractMarkers() {
    this.markers = _
      .map(this.events.value, event => event.venue)
      .map(venue => venue.marker)
    ;
  }
  _displayMarkers() {
    if (this.markers === undefined) { return; }
    this.markers.forEach(marker => {
      marker.setMap(this.map);
    });
  }

}
