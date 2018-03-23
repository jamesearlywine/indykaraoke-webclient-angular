import { Venue } from './venue';
import { Map } from './map';

export class MarkerOptions {
  location: Venue;
  map: Map;
  labelKey: string;
  titleKey: string;
  styling: any; // untyped for now
  pinSymbol: any; // untyped for now
  labelStyling: any; // untyped for now
}
