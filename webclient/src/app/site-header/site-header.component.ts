import { Component, Renderer } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { WindowService } from '../common/services/window.service';

@Component({
    selector: 'site-header',
    templateUrl: './site-header.component.html',
    styleUrls: ['./site-header.component.scss'],
    animations: [
        trigger('collapse', [
            transition(':enter', [
                style({'max-height': 0}),
                animate('.35s ease', style({ 'max-height': 100}))
            ]),
            transition(':leave', [
                animate('.35s ease', style({ 'height': 0}))
            ])
        ])
    ]
})
export class SiteHeaderComponent {
    settings = {
        scrollSticky: 30, // px
    };
    sticky = false;
    showMenu = false;

    constructor(
        private renderer: Renderer,
        private windowService: WindowService
    ) {
        renderer.listenGlobal('window', 'scroll', (evt) => {
            this.sticky = this.windowService.scrollTop > this.settings.scrollSticky;
        });
    }

    scrollToWhereToSing() {
        this.windowService.scrollTo(400);
    }

    toggleMenu() { this.showMenu = !this.showMenu; }
}
