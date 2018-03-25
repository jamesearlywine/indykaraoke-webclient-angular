import { Venue } from './venue';
import { Map } from './map';

export class MarkerOptions {
  venue?: Venue;
  position?: any; // untyped for now
  map?: Map;
  labelKey?: string;
  titleKey?: string;
  label?: string;
  title?: string;
  styling?: any; // untyped for now
  icon?: any; // untyped for now
  pinSymbol?: any; // untyped for now
  labelStyling?: any; // untyped for now
}
