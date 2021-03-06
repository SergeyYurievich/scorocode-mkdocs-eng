/*
 * Copyright (c) 2016 Martin Donath <martin.donath@squidfunk.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

/* ----------------------------------------------------------------------------
 * Definition
 * ------------------------------------------------------------------------- */

export default class Abstract {

  /**
   * Abstract listener
   *
   * @constructor
   * @param {(string|HTMLElement)} el - Selector or HTML element
   * @param {Array.<string>} events - Event names to listen on
   * @param {Function} handler - Event handler to execute
   */
  constructor(el, events, handler) {
    if (this === Abstract)
      throw new Error("Cannot construct abstract instance")

    /* Resolve element */
    this.el_ = (typeof el === "string")
      ? document.querySelector(el)
      : el

    /* Set event names and handler */
    this.events_  = events
    this.handler_ = handler
  }

  /**
   * Register listener for all relevant events
   */
  listen() {
    this.events_.forEach(name => {
      this.el_.addEventListener(name, this.handler_, false)
    })
  }

  /**
   * Unregister listener for all relevant events
   */
  unlisten() {
    this.events_.forEach(name => {
      this.el_.removeEventListener(name, this.handler_, false)
    })
  }
}
