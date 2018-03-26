import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { WindowService } from '../../services/window.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CalendarEvent } from '../../lib/calendar-event';
import { WeeklyEvent } from '../../lib/weekly-event';

@Component({
  selector: 'events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements AfterViewInit {
  @Input() events: BehaviorSubject<CalendarEvent[]>;

  _selectedEvent: WeeklyEvent;
  @Input()
  get selectedEvent() { return this._selectedEvent; }
  @Output() selectedEventChange = new EventEmitter();
  set selectedEvent(value) {
    this._selectedEvent = value;
    this.selectedEventChange.emit(this._selectedEvent);
  }

  constructor() {}

  ngAfterViewInit() {
    this.events.subscribe( events => this.deselectAllEvents() );
    this.selectedEventChange.subscribe( event => this.onSelectedEventChange(event) );
  }
  onSelectedEventChange(event) { this.deselectAllEventsExcept(event); }
  onEventSelectedChange(event: WeeklyEvent) { this.selectedEvent = (event.isSelected) ? event : null; }

  deselectAllEvents() { this.events.value.forEach(event => event.deselect()); }
  deselectAllEventsExcept(excludedEvent) {
    if (excludedEvent === null) { return this.deselectAllEvents(); }
    this.events.value
      .filter(event => event.id !== excludedEvent.id)
      .forEach(event => event.deselect())
    ;
  }


}
