import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CalendarEvent } from '../../../lib/calendar-event';


@Component({
  selector: 'basic-listing',
  templateUrl: './basic-listing.component.html',
  styleUrls: ['./basic-listing.component.scss']
})
export class BasicListingComponent {
  @Input() event: CalendarEvent;
  @Output() selectedChange: EventEmitter<CalendarEvent> = new EventEmitter();
  constructor() {}

  toggleSelected() {
    this.event.toggleSelected();
    this.selectedChange.emit(this.event);
  }

}
