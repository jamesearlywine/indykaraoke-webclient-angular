import { Component, Renderer } from '@angular/core';
import { WindowService } from '../common/services/window.service';

@Component({
    selector: 'site-header',
    templateUrl: './site-header.component.html',
    styleUrls: ['./site-header.component.scss']
})
export class SiteHeaderComponent {
    settings = {
        scrollAffix: 20, // px
    };
    affixedHeader = true;

    constructor(
        private renderer: Renderer,
        private windowService: WindowService
    ) {
        renderer.listenGlobal('window', 'scroll', (evt) => {
            this.affixedHeader = this.windowService.scrollTop > this.settings.scrollAffix;
        });
    }

    scrollToWhereToSing() {
        this.windowService.scrollTo(400);
    }
}
