import { Component, ElementRef, Input, Output, AfterViewInit, OnInit, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import * as _ from 'lodash';
import {} from 'googlemaps';

import { LocationService } from '../../services/location.service';
import { InfoWindowService } from '../../services/info-window.service';
import { WindowService } from '../../services/window.service';

import { WeeklyEvent } from '../../lib/weekly-event';
import { Map } from '../../lib/map';
import { Marker } from '../../lib/marker';

@Component({
  selector: 'events-map',
  templateUrl: './events-map.component.html',
  styleUrls: ['./events-map.component.scss']
})
export class EventsMapComponent implements OnInit, AfterViewInit {
  @Input() events: BehaviorSubject<WeeklyEvent[]>;

  _selectedEvent: WeeklyEvent;
  @Input()
  get selectedEvent() { return this._selectedEvent; }
  @Output() selectedEventChange = new EventEmitter();
  set selectedEvent(value) {
    this._selectedEvent = value;
    this.selectedEventChange.emit(this._selectedEvent);
  }

  constructor(
    private hostElement: ElementRef,
    private locationService: LocationService,
    private windowService: WindowService
  ) {
    windowService.nativeWindow.appDebug.EventsMap = this;
  }

  mapDefaults = {
    initialZoom: 10,
    initialCenter: this.locationService.city,
    eventViewZoom: 14
  };
  mapProperties = null;
  mapElement = null;
  map: Map;
  markers: Marker[];
  markerClickSubscriptions = [];

  ngOnInit() {
    this.mapProperties = _.merge({}, this.mapDefaults); // add mapSettings input later
    this.events.subscribe(events => {
      if (this.events.value.length > 0) {
        this.resetMap();
        this.refreshMarkers(); // eagerly pre-instantiated on venues webservice-fetch (event.venue.marker)
        InfoWindowService.decorateEventsWithInfoWindows(this.events.value); // semi-lazily instantiated on filter/sort/etc (event.infoWindow)
      }
    });
  }

  ngAfterViewInit() {
    this.mapElement = this.hostElement.nativeElement.querySelector('#google-map');
    this.initMap();
    this.selectedEventChange.subscribe(event => {
      console.log('eventsMap saw selectedEventChange, event: ', event);
      this.displaySelectedEvent();
    });
  }

  /**
   * General Map Stuff
   */
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
    this.map.clicked.subscribe(this.onMapClick.bind(this));
  }
  onMapClick(map) {
    this.closeAllInfoWindows();
    if (this.selectedEvent !== null) { this.selectedEvent.isSelected = false; } // map click same-select event issue can maybe be fixed here
  }
  resetMap() {
    if (this.map === undefined) { return; }
    this.closeAllInfoWindows();
    this.map.setCenter({
      lat: this.mapProperties.initialCenter.lat,
      lng: this.mapProperties.initialCenter.lng,
    });
    this.map.setZoom(this.mapProperties.initialZoom);
  }


  /**
   * Markers
   */
  refreshMarkers() {
    this.removeMarkers();
    this.showMarkers();
  }
  showMarkers() {
    this._extractMarkers();
    if (this.markers.length > 0) { this._displayMarkers(); }
  }
  removeMarkers() {
    if (this.markers === undefined) { return; }
    this.markers.forEach( marker => marker.setMap(null) );
  }
  _extractMarkers() {
    this.markers = _.map(this.events.value, event => event.venue.marker);
    this.subscribeToMarkerClicks();
  }
  _displayMarkers() {
    if (this.markers === undefined || this.map === undefined) { return; }
    this.markers.forEach( marker => marker.setMap(this.map) );
  }
  subscribeToMarkerClicks() {
    this.markerClickSubscriptions.forEach( subscription => subscription.unsubscribe() );
    this.markers.forEach(marker => {
      this.markerClickSubscriptions.push(
        marker.clicked.subscribe( clickedMarker => this.onMarkerClick(clickedMarker) )
      );
    });
  }
  onMarkerClick(marker) {
    const event = this.getEventForVenue(marker.venue);
    if (event.infoWindow.isOpen) {
      event.infoWindow.close();
    } else {
      this.closeAllInfoWindows();
      this.selectedEvent = event; // updating selectedEvent automatically opens the infoWindow
    }
    event.isSelected = event.infoWindow.isOpen;
    if (!event.isSelected) { this._selectedEvent = null; }
  }

  /**
   * InfoWindows
   */
  displaySelectedEvent() {
    if (this.map === undefined) { return; }
    if (this.selectedEvent === null) { return this.resetMap(); }
    this.map.setZoom(this.mapProperties.eventViewZoom);
    this.map.panTo({
      lat: parseFloat(this.selectedEvent.venue.latitude),
      lng: parseFloat(this.selectedEvent.venue.longitude)
    });
    this.selectedEvent.infoWindow.open(this.map, this.selectedEvent.venue.marker);
  }
  closeAllInfoWindows() {
    this.events.value.forEach(event => {
      if (event.infoWindow === undefined) { return; }
      event.infoWindow.close();
    });
  }

  /**
   * Misc
   */
  getEventForVenue(venue) {
    return _.first( this.events.value.filter( event => event.venue === venue ) );
  }
}
