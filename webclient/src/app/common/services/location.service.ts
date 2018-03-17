import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class LocationService {
  static cities = {
    indianapolis : {
      lat: 39.8174296340874,
      lng: -86.16162549863282
    }
  };

  get city() {
    return LocationService.cities[environment.city];
  }
}
