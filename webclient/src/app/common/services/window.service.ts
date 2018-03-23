// https://angular.io/api/core
import { Injectable } from '@angular/core';
// https://www.npmjs.com/package/@nicky-lenaers/ngx-scroll-to
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
// https://lodash.com/
import * as _ from 'lodash';

export class CustomWindow extends Window {
  appDebug = <any> {};
}

function _window(): CustomWindow {
  // return the global native browser window object
  const w = window as CustomWindow;
  w.appDebug = w.appDebug || {};
  return w;
}

@Injectable()
export class WindowService {
  constructor(
    private scrollToService: ScrollToService
  ) { }

  supportPageOffset = window.pageXOffset !== undefined;
  isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
  rootElement = this.isCSS1Compat
    ? document.documentElement
    : document.body
    ;
  settings = {
    scrollDefaults: {
      duration: 300, // ms
      easing: 'easeInOutQuad' // ease(In|Out|InOut)(Quad|Cubic|Quart|Quint) | easeOutElastic
    }
  };

  get nativeWindow() {
    return _window();
  }
  get scrollLeft(): number {
    return this.supportPageOffset
      ? this.nativeWindow.pageXOffset
      : this.rootElement.scrollLeft
      ;
  }
  get scrollTop(): number {
    return this.supportPageOffset
      ? this.nativeWindow.pageYOffset
      : this.rootElement.scrollTop
      ;
  }
  set scrollTop(x: number) {
    this.rootElement.scrollTop = x;
  }
  set scrollLeft(y: number) {
    this.rootElement.scrollLeft = y;
  }
  /**
   * @brief   Scrolls the viewport
   * @notes   Usage:
   *              Example 1: scrollTo(offset<int>, [duration<int>], [easing<string>])
   *              {
   *                  // scrolls to the given page offset, animated over duration (in ms)
   *              }
   *              windowService.scrollTo(400);
   *
   *              Example 2: scrollTo(elementId<string>, [duration<int>], [easing<string>]) {
   *                  // scrolls to an element with given elementId, animated over duration (in ms)
   *              }
   *              windowService.scrollTo('mainNav');
   *
   *              Example 3: scrollTo(configOptions) {
   *                  // scrolls to an element on the page
   *                  // (for available config options, see: // https://www.npmjs.com/package/@nicky-lenaers/ngx-scroll-to )
   *              }
   *              windowService.scrollTo({
   *                  target: 'karaoke-map',
   *                  duration: 100,
   *                  easing: 'easeInOutQuad',
   *                  offset: 0
   *              });
   *
   *          Optional parameters are populated from this.settings.scrolLDefaults
   *
   * @param param number|string|object
   * @param scrollDuration number
   */
  scrollTo(param: number | string | ScrollToConfigOptions,
    scrollDuration: number = this.settings.scrollDefaults.duration,
    easing: string = this.settings.scrollDefaults.easing
  ) {
    if (typeof param === 'number') {
      this.scrollToService.scrollTo({
        offset: param - this.scrollTop,
        duration: scrollDuration
      });
    } else if (typeof param === "string") {
      this.scrollToService.scrollTo({
        target: param,
        duration: scrollDuration
      });
    } else {
      const options = _.merge({}, this.settings.scrollDefaults, param);
      this.scrollToService.scrollTo(options);
    }
  }

  // page-ready scroll aliases
  scrollToTop(scrollDuration: number = this.settings.scrollDefaults.duration) {
    this.scrollTo(0, scrollDuration);
  }
  scrollToWhereToSing() {
    this.scrollTo({
      target: '#where-to-sing',
      duration: this.settings.scrollDefaults.duration,
   });
  }
}
