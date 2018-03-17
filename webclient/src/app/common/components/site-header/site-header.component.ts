import { Component, Renderer, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { WindowService } from '../../services/window.service';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.scss'],
  animations: [
    trigger('showMenu', [
      state('false', style({ 'max-height': 0 })),
      state('true', style({ 'max-height': 100 })),
      transition("true => false", animate('.35s ease')),
      transition("false => true", animate('.35s ease')),
    ])
  ]
})
export class SiteHeaderComponent implements OnInit {
  settings = {
    hasScrolled: 40, // px
  };

  hasScrolled = false;
  showMenu = false;
  slowBackgroundColorTransition = false;

  constructor(
    private renderer: Renderer,
    private windowService: WindowService,
    private router: Router
  ) {
    renderer.listenGlobal('window', 'scroll', (evt) => {
      this.updateHasScrolled();
    });
  }

  ngOnInit() {
    this.updateHasScrolled();
    setTimeout(() => {
      this.slowBackgroundColorTransition = true;
    }, 500);
  }

  private updateHasScrolled() { this.hasScrolled = this.windowService.scrollTop > this.settings.hasScrolled; }

  toggleMenu() { this.showMenu = !this.showMenu; }
  closeMenu()  { this.showMenu = false; }

  goToHome() {
    this.closeMenu();
    if (this.router.url !== '/') {
      this.windowService.scrollToTop();
      this.router.navigate(['/']);
    } else {
      this.windowService.scrollToTop();
    }
  }

  goToWhere() {
    this.closeMenu();
    if (this.router.url !== '/where') {
      this.router.navigate(['/where']);
    } else {
      this.windowService.scrollToWhereToSing();
    }
  }

  goToShare() {
    this.closeMenu();
    if (this.router.url !== '/share') {
      this.windowService.scrollToTop(0);
      this.router.navigate(['/share']);
    } else {
      this.windowService.scrollToTop();
    }
  }
}
