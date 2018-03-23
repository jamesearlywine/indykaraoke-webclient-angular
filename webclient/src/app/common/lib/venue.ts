import { Marker } from './marker';

export interface Venue {
  id: number;
  events?: Array<any>; // can't have circular import Venue/CalandarEvent
  marker?: Marker;
  name: string;
  admin_notes: string;
  background_image: string;
  city: string;
  email: string;
  extended_description: string;
  latitude: string;
  longitude: string;
  main_image: string;
  phone: string;
  special_instructions: string;
  state: string;
  street1: string;
  street2: string;
  web: string;
  zip: string;
}
