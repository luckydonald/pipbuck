function parentWithClass(el, clazz) {
  if (!!el && el !== document) {
    if (el.classList.contains(clazz)) {
      return el;
    }
  } else {
    return null;
  }
  return parentWithClass(el.parentNode, clazz);
}

export default class ScrollPrevent {
  constructor(appObj) {
    this.app = appObj;
    this.start = null;
    this.timeout = null;
    // eslint-disable-next-line no-underscore-dangle
    this._touchstart = this._touchstart.bind(this);
    // eslint-disable-next-line no-underscore-dangle
    this._touchmove = this._touchmove.bind(this);
    // eslint-disable-next-line no-underscore-dangle
    this._touchend = this._touchend.bind(this);
  }

  _touchstart(event) {
    this.start = event.touches[0].pageY;
    this.timeout = null;

    const noscroll = parentWithClass(event.target, 'noscroll');
    if (noscroll) {
      event.preventDefault();
      return false;
    }
    if (event.touches.length !== 1) {
      event.preventDefault();
    }
    if (event.changedTouches.length !== 1) {
      // empty/multitouch
      event.preventDefault();
    }
    // eslint-disable-next-line no-underscore-dangle
    document.body.addEventListener('touchmove', this._touchmove);
    return false;
  }

  _touchmove(event2) {
    clearTimeout(this.timeout);
    const noscroll2 = parentWithClass(event2.target, 'noscroll');
    if (noscroll2) {
      event2.preventDefault();
      return false;
    }
    const end = event2.touches[0].pageY;
    const distance = this.start !== null ? this.start - end : 0;
    this.start = end;
    const crt = parentWithClass(event2.target, 'crt');
    if (!crt) {
      // scrolled something else
      event2.preventDefault();
      return false;
    }
    if (event2.touches.length !== 1) {
      // empty/multitouch
      event2.preventDefault();
      return false;
    }
    if (event2.changedTouches.length !== 1) {
      // empty/multitouch
      event2.preventDefault();
      return false;
    }
    if (crt && crt.scrollTop === 0 && distance < 0) {
      // don't pull the page down when already at top.
      event2.preventDefault();
      return false;
    }
    // scroll by half the speed, also don't scroll under 0.
    this.app.scroll = Math.max(this.app.scroll + (distance * 0.6), 0);
    if (crt.scroll !== undefined) {
      crt.scroll({
        top: this.app.scroll,
        left: 0,
        behavior: 'smooth',
      });
    } else if (crt.scrollTo !== undefined) {
      crt.scrollTo({
        top: this.app.scroll,
        left: 0,
        behavior: 'smooth',
      });
    } else {
      crt.scrollLeft = 0;
      crt.scrollTop = this.app.scroll;
    }
    event2.preventDefault();
    return false;
  }

  _touchend() {
    this.start = null;
    // eslint-disable-next-line no-underscore-dangle
    document.body.removeEventListener('touchmove', this._touchmove);
    // eslint-disable-next-line no-underscore-dangle
    document.body.removeEventListener('touchend', this._touchend);
  }

  install() {
    console.log('INSTALL');
    // eslint-disable-next-line no-underscore-dangle
    document.body.addEventListener('touchstart', this._touchstart);
    return this; // chain me
  }

  deinstall() {
    console.log('DEINSTALL');
    // eslint-disable-next-line no-underscore-dangle
    document.body.removeEventListener('touchstart', this._touchstart);
    // eslint-disable-next-line no-underscore-dangle
    this._touchend();
    return this; // chain me
  }
}
