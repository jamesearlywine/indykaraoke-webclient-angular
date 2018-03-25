import { } from '@types/googlemaps';
import { EventEmitter } from '@angular/core';
export class Map extends google.maps.Map {
  clicked: EventEmitter<Map> = new EventEmitter();
  constructor(element, options) {
    super(element, options);
    this.addListener('click', (event) => this.clicked.emit(this));
  }
}
