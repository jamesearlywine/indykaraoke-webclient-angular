import { Component, Input, Output, EventEmitter } from '@angular/core';

import * as _ from 'lodash';
import { } from 'googlemaps';

import { WeeklyEvent } from '../../lib/weekly-event';
import { Map } from '../../lib/map';
import { Marker } from '../../lib/marker';

@Component({
  // selector: 'info-window',
  templateUrl: './event-info-window.component.html',
  styleUrls: ['./event-info-window.component.scss']
})
export class EventInfoWindowComponent {
  @Input() event: WeeklyEvent;
  @Output() clicked: EventEmitter<WeeklyEvent> = new EventEmitter();
}
