import { Component } from '@angular/core';
import { WindowService } from '../common/services/window.service';
import { VenueDataService } from '../common/services/venue-data.service';

@Component({
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent {
  constructor(
    private windowService: WindowService,
    private venueDataService: VenueDataService
  ) {
    this.windowService.nativeWindow.appDebug.ShareCtrl = this;
  }
}
