// angular stuff
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy } from '@angular/common';

// routes
import { appRoutes } from './app.routes';

// routables
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ShareComponent } from './share/share.component';

// embeddables
import { HomePageHeaderComponent } from './home/home-page-header/home-page-header.component';
import { SiteHeaderComponent } from './common/components/site-header/site-header.component';
import { WeekDaySelectorComponent } from './common/components/week-day-selector/week-day-selector.component';
import { EventsMapComponent } from './common/components/events-map/events-map.component';
import { EventsListComponent } from './common/components/events-list/events-list.component';
import { BasicListingComponent } from './common/components/events-list/basic-listing/basic-listing.component';
import { EventInfoWindowComponent } from './common/components/event-info-window/event-info-window.component';

// services
import { WindowService } from './common/services/window.service';
import { LocationService } from './common/services/location.service';
import { VenueDataService } from './common/services/venue-data.service';
import { EventDataService } from './common/services/event-data.service';
import { MarkerService } from './common/services/marker.service';
import { InfoWindowService } from './common/services/info-window.service';
import { DataService } from './common/services/data.service';
import { DayOfWeekService } from './common/services/day-of-week.service';

// vendor code
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    // global
    AppComponent,
    // routables
    HomeComponent,
    ShareComponent,
    // embeddables
    SiteHeaderComponent,
    HomePageHeaderComponent,
    WeekDaySelectorComponent,
    EventsMapComponent,
    EventInfoWindowComponent,
    EventsListComponent,
    BasicListingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      {
        // enableTracing: true, // <-- debugging purposes only
        useHash: true
      }
    ),
    ScrollToModule.forRoot(),
    NgbModule.forRoot()
  ],
  providers: [
    WindowService,
    LocationService,
    VenueDataService,
    EventDataService,
    MarkerService,
    InfoWindowService,
    DataService,
    DayOfWeekService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private dataService: DataService
  ) {
    // load directory data as soon as possible
    this.dataService.initialLoad();
  }
}
