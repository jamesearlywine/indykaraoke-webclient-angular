import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HashLocationStrategy } from '@angular/common';

import { appRoutes } from './app.routes';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SiteHeaderComponent } from './site-header/site-header.component';
import { IndianapolisKaraokePageHeaderComponent } from './indianapolis-karaoke-page-header/indianapolis-karaoke-page-header.component';
import { WindowService } from './common/services/window.service';

import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SiteHeaderComponent,
    IndianapolisKaraokePageHeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true, // <-- debugging purposes only
        useHash: true
      }
    ),
    ScrollToModule.forRoot(),
    NgbModule.forRoot()
  ],
  providers: [
    WindowService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
