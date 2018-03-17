import { Component, ElementRef, Input, AfterViewInit, OnInit, OnChanges, SimpleChange } from '@angular/core';

import * as _ from 'lodash';
import {} from 'googlemaps';

import { LocationService } from '../../services/location.service';
import { WindowService } from '../../services/window.service';
import { WeeklyEvent } from '../../lib/weekly-event';

@Component({
  selector: 'karaoke-map',
  templateUrl: './karaoke-map.component.html',
  styleUrls: ['./karaoke-map.component.scss']
})
export class KaraokeMapComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() events: Array<any>; // @todo write Venue class

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
  map = null;
  mapElement = null;

  changeLog: string[] = [];

  ngOnInit() {
    this.mapProperties = _.merge({}, this.mapDefaults);
  }

  ngAfterViewInit() {
    this.mapElement = this.hostElement.nativeElement.querySelector('#google-map');
    this.initMap();
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    console.log('changes: ', changes);
    let log: string[] = [];
    for (const propName of Object.keys(changes)) {
      const changedProp = changes[propName];
      if (changedProp === undefined) {console.log('propName: ', propName , ' undfined'); continue;}
      const to = JSON.stringify(changedProp.currentValue);
      if (changedProp.isFirstChange()) {
        log.push(`Initial value of ${propName} set to ${to}`);
      } else {
        const from = JSON.stringify(changedProp.previousValue);
        log.push(`${propName} changed from ${from} to ${to}`);
      }
    }
    this.changeLog.push(log.join(', '));
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
