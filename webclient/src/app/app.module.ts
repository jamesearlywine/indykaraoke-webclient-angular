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
import { SiteHeaderComponent } from './common/components/site-header/site-header.component';
import { KaraokePageHeaderComponent } from './common/components/karaoke-page-header/karaoke-page-header.component';
import { KaraokeMapComponent } from './common/components/karaoke-map/karaoke-map.component';
import { DaySelectorComponent } from './common/components/day-selector/day-selector.component';

// services
import { WindowService } from './common/services/window.service';
import { LocationService } from './common/services/location.service';
import { VenueDataService } from './common/services/venue-data.service';
import { EventDataService } from './common/services/event-data.service';
import { MarkerService } from './common/services/marker.service';
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
    KaraokePageHeaderComponent,
    KaraokeMapComponent,
    DaySelectorComponent
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
