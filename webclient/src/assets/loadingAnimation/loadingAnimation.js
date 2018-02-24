/* globals Spinner */
'use strict';

window.loadingAnimation = {
  backdrop : null,
  spinner  : null,
  parentEl : null,
  initialized: false,
  spinning: false,
  initialize: function() {
    this.parentEl = document.getElementsByTagName('body')[0];
    this.backdrop = document.createElement('div');
    this.backdrop.className = "loading-spinner-backdrop";
    this.spinner = new Spinner({
      lines: 13,
      length: 28,
      width: 14,
      radius: 42,
      scale: 1.00,
      corners: 1.0,
      opacity: 0.25,
      rotate: 0,
      direction: 1,
      speed: 1.0,
      trail: 60,
      color: 'white',
      className: 'loading-spinner'
    }).spin();
    this.initialized = true;
  },
  start : function(parentEl) {
    if (this.spinning) {return false} else {this.spinning = true;}
    if (!this.intialized) {this.initialize()}
    this.backdrop.appendChild(this.spinner.el);  
    this.parentEl.appendChild(this.backdrop);
  },
  stop: function() {
    // console.log('stopping loading animation');
    if (!this.spinning) { return false } else { this.spinning = false; }
    if (this.parentEl !== null && this.parentEl !== undefined) {
      this.parentEl.removeChild(this.backdrop);  
    }
    this.reset();
  },
  reset: function() {
    this.parentEl = null;
    this.backdrop = null;
    this.spinner  = null;
  }
  
  
};