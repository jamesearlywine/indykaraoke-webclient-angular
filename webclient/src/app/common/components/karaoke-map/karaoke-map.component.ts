import { Component, ElementRef, Input, AfterViewInit, OnInit } from '@angular/core';

import * as _ from 'lodash';
import {} from 'googlemaps';

import { LocationService } from '../../services/location.service';
import { WindowService } from '../../services/window.service';
import { EventDataService } from '../../services/event-data.service';

import { WeeklyEvent } from '../../lib/weekly-event';

@Component({
  selector: 'karaoke-map',
  templateUrl: './karaoke-map.component.html',
  styleUrls: ['./karaoke-map.component.scss']
})
export class KaraokeMapComponent implements OnInit, AfterViewInit {
  @Input() events: Array<any>; // @todo write Venue class

  constructor(
    private hostElement: ElementRef,
    private locationService: LocationService,
    private windowService: WindowService,
    private eventDataService: EventDataService
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
  map = null;

  ngOnInit() {
    this.mapProperties = _.merge({}, this.mapDefaults);
  }

  ngAfterViewInit() {
    this.mapElement = this.hostElement.nativeElement.querySelector('#google-map');
    this.initMap();
  }

  initMap() {
    this.map = new google.maps.Map(
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
  }

}
