import { Venue } from './venue';

export interface WeeklyEvent {
  id: number;
  karaoke_host_id: number;
  venue_id: number;
  karaoke_host?: object;
  venue?: Venue;
  day_of_week: string;
  title: string;
  description: string;
  karaoke_host_name: string;
  start_time: string;
  end_time: string;
}
