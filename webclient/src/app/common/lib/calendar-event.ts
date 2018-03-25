import { Venue } from './venue';
import { InfoWindow } from './info-window';
import { Selectable } from './selectable';
import { Sortable } from './sortable';
import * as _ from 'lodash';

export class CalendarEvent implements Selectable, Sortable {
  id: number;
  sortId?: number|string;
  venue_id?: number;
  venue?: Venue;
  infoWindow?: InfoWindow;
  isSelected = false;

  constructor(properties) {
    _.merge(this, properties);
  }

  select() { this.isSelected = true; }
  deselect() { this.isSelected = false; }
  toggleSelected() { this.isSelected = !this.isSelected; }

  sortFunction() {}
}
