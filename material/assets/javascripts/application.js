var Application =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	(function (self) {
	  'use strict';

	  if (self.fetch) {
	    return;
	  }

	  var support = {
	    searchParams: 'URLSearchParams' in self,
	    iterable: 'Symbol' in self && 'iterator' in Symbol,
	    blob: 'FileReader' in self && 'Blob' in self && function () {
	      try {
	        new Blob();
	        return true;
	      } catch (e) {
	        return false;
	      }
	    }(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  };

	  if (support.arrayBuffer) {
	    var viewClasses = ['[object Int8Array]', '[object Uint8Array]', '[object Uint8ClampedArray]', '[object Int16Array]', '[object Uint16Array]', '[object Int32Array]', '[object Uint32Array]', '[object Float32Array]', '[object Float64Array]'];

	    var isDataView = function isDataView(obj) {
	      return obj && DataView.prototype.isPrototypeOf(obj);
	    };

	    var isArrayBufferView = ArrayBuffer.isView || function (obj) {
	      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
	    };
	  }

	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name);
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name');
	    }
	    return name.toLowerCase();
	  }

	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value);
	    }
	    return value;
	  }

	  // Build a destructive iterator for the value list
	  function iteratorFor(items) {
	    var iterator = {
	      next: function next() {
	        var value = items.shift();
	        return { done: value === undefined, value: value };
	      }
	    };

	    if (support.iterable) {
	      iterator[Symbol.iterator] = function () {
	        return iterator;
	      };
	    }

	    return iterator;
	  }

	  function Headers(headers) {
	    this.map = {};

	    if (headers instanceof Headers) {
	      headers.forEach(function (value, name) {
	        this.append(name, value);
	      }, this);
	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function (name) {
	        this.append(name, headers[name]);
	      }, this);
	    }
	  }

	  Headers.prototype.append = function (name, value) {
	    name = normalizeName(name);
	    value = normalizeValue(value);
	    var list = this.map[name];
	    if (!list) {
	      list = [];
	      this.map[name] = list;
	    }
	    list.push(value);
	  };

	  Headers.prototype['delete'] = function (name) {
	    delete this.map[normalizeName(name)];
	  };

	  Headers.prototype.get = function (name) {
	    var values = this.map[normalizeName(name)];
	    return values ? values[0] : null;
	  };

	  Headers.prototype.getAll = function (name) {
	    return this.map[normalizeName(name)] || [];
	  };

	  Headers.prototype.has = function (name) {
	    return this.map.hasOwnProperty(normalizeName(name));
	  };

	  Headers.prototype.set = function (name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)];
	  };

	  Headers.prototype.forEach = function (callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function (name) {
	      this.map[name].forEach(function (value) {
	        callback.call(thisArg, value, name, this);
	      }, this);
	    }, this);
	  };

	  Headers.prototype.keys = function () {
	    var items = [];
	    this.forEach(function (value, name) {
	      items.push(name);
	    });
	    return iteratorFor(items);
	  };

	  Headers.prototype.values = function () {
	    var items = [];
	    this.forEach(function (value) {
	      items.push(value);
	    });
	    return iteratorFor(items);
	  };

	  Headers.prototype.entries = function () {
	    var items = [];
	    this.forEach(function (value, name) {
	      items.push([name, value]);
	    });
	    return iteratorFor(items);
	  };

	  if (support.iterable) {
	    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
	  }

	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'));
	    }
	    body.bodyUsed = true;
	  }

	  function fileReaderReady(reader) {
	    return new Promise(function (resolve, reject) {
	      reader.onload = function () {
	        resolve(reader.result);
	      };
	      reader.onerror = function () {
	        reject(reader.error);
	      };
	    });
	  }

	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader();
	    var promise = fileReaderReady(reader);
	    reader.readAsArrayBuffer(blob);
	    return promise;
	  }

	  function readBlobAsText(blob) {
	    var reader = new FileReader();
	    var promise = fileReaderReady(reader);
	    reader.readAsText(blob);
	    return promise;
	  }

	  function readArrayBufferAsText(buf) {
	    var view = new Uint8Array(buf);
	    var chars = new Array(view.length);

	    for (var i = 0; i < view.length; i++) {
	      chars[i] = String.fromCharCode(view[i]);
	    }
	    return chars.join('');
	  }

	  function bufferClone(buf) {
	    if (buf.slice) {
	      return buf.slice(0);
	    } else {
	      var view = new Uint8Array(buf.byteLength);
	      view.set(new Uint8Array(buf));
	      return view.buffer;
	    }
	  }

	  function Body() {
	    this.bodyUsed = false;

	    this._initBody = function (body) {
	      this._bodyInit = body;
	      if (!body) {
	        this._bodyText = '';
	      } else if (typeof body === 'string') {
	        this._bodyText = body;
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body;
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body;
	      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	        this._bodyText = body.toString();
	      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
	        this._bodyArrayBuffer = bufferClone(body.buffer);
	        // IE 10-11 can't handle a DataView body.
	        this._bodyInit = new Blob([this._bodyArrayBuffer]);
	      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
	        this._bodyArrayBuffer = bufferClone(body);
	      } else {
	        throw new Error('unsupported BodyInit type');
	      }

	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8');
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type);
	        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
	        }
	      }
	    };

	    if (support.blob) {
	      this.blob = function () {
	        var rejected = consumed(this);
	        if (rejected) {
	          return rejected;
	        }

	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob);
	        } else if (this._bodyArrayBuffer) {
	          return Promise.resolve(new Blob([this._bodyArrayBuffer]));
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob');
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]));
	        }
	      };

	      this.arrayBuffer = function () {
	        if (this._bodyArrayBuffer) {
	          return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
	        } else {
	          return this.blob().then(readBlobAsArrayBuffer);
	        }
	      };
	    }

	    this.text = function () {
	      var rejected = consumed(this);
	      if (rejected) {
	        return rejected;
	      }

	      if (this._bodyBlob) {
	        return readBlobAsText(this._bodyBlob);
	      } else if (this._bodyArrayBuffer) {
	        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
	      } else if (this._bodyFormData) {
	        throw new Error('could not read FormData body as text');
	      } else {
	        return Promise.resolve(this._bodyText);
	      }
	    };

	    if (support.formData) {
	      this.formData = function () {
	        return this.text().then(decode);
	      };
	    }

	    this.json = function () {
	      return this.text().then(JSON.parse);
	    };

	    return this;
	  }

	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase();
	    return methods.indexOf(upcased) > -1 ? upcased : method;
	  }

	  function Request(input, options) {
	    options = options || {};
	    var body = options.body;

	    if (typeof input === 'string') {
	      this.url = input;
	    } else {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read');
	      }
	      this.url = input.url;
	      this.credentials = input.credentials;
	      if (!options.headers) {
	        this.headers = new Headers(input.headers);
	      }
	      this.method = input.method;
	      this.mode = input.mode;
	      if (!body && input._bodyInit != null) {
	        body = input._bodyInit;
	        input.bodyUsed = true;
	      }
	    }

	    this.credentials = options.credentials || this.credentials || 'omit';
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers);
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET');
	    this.mode = options.mode || this.mode || null;
	    this.referrer = null;

	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests');
	    }
	    this._initBody(body);
	  }

	  Request.prototype.clone = function () {
	    return new Request(this, { body: this._bodyInit });
	  };

	  function decode(body) {
	    var form = new FormData();
	    body.trim().split('&').forEach(function (bytes) {
	      if (bytes) {
	        var split = bytes.split('=');
	        var name = split.shift().replace(/\+/g, ' ');
	        var value = split.join('=').replace(/\+/g, ' ');
	        form.append(decodeURIComponent(name), decodeURIComponent(value));
	      }
	    });
	    return form;
	  }

	  function parseHeaders(rawHeaders) {
	    var headers = new Headers();
	    rawHeaders.split('\r\n').forEach(function (line) {
	      var parts = line.split(':');
	      var key = parts.shift().trim();
	      if (key) {
	        var value = parts.join(':').trim();
	        headers.append(key, value);
	      }
	    });
	    return headers;
	  }

	  Body.call(Request.prototype);

	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {};
	    }

	    this.type = 'default';
	    this.status = 'status' in options ? options.status : 200;
	    this.ok = this.status >= 200 && this.status < 300;
	    this.statusText = 'statusText' in options ? options.statusText : 'OK';
	    this.headers = new Headers(options.headers);
	    this.url = options.url || '';
	    this._initBody(bodyInit);
	  }

	  Body.call(Response.prototype);

	  Response.prototype.clone = function () {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    });
	  };

	  Response.error = function () {
	    var response = new Response(null, { status: 0, statusText: '' });
	    response.type = 'error';
	    return response;
	  };

	  var redirectStatuses = [301, 302, 303, 307, 308];

	  Response.redirect = function (url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code');
	    }

	    return new Response(null, { status: status, headers: { location: url } });
	  };

	  self.Headers = Headers;
	  self.Request = Request;
	  self.Response = Response;

	  self.fetch = function (input, init) {
	    return new Promise(function (resolve, reject) {
	      var request = new Request(input, init);
	      var xhr = new XMLHttpRequest();

	      xhr.onload = function () {
	        var options = {
	          status: xhr.status,
	          statusText: xhr.statusText,
	          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
	        };
	        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
	        var body = 'response' in xhr ? xhr.response : xhr.responseText;
	        resolve(new Response(body, options));
	      };

	      xhr.onerror = function () {
	        reject(new TypeError('Network request failed'));
	      };

	      xhr.ontimeout = function () {
	        reject(new TypeError('Network request failed'));
	      };

	      xhr.open(request.method, request.url, true);

	      if (request.credentials === 'include') {
	        xhr.withCredentials = true;
	      }

	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob';
	      }

	      request.headers.forEach(function (value, name) {
	        xhr.setRequestHeader(name, value);
	      });

	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
	    });
	  };
	  self.fetch.polyfill = true;
	})(typeof self !== 'undefined' ? self : undefined);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
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
	 * Imports
	 * ------------------------------------------------------------------------- */

	// import Expander from "./components/expander"

	var _fastclick = __webpack_require__(3);

	var _fastclick2 = _interopRequireDefault(_fastclick);

	var _GithubSourceFacts = __webpack_require__(5);

	var _GithubSourceFacts2 = _interopRequireDefault(_GithubSourceFacts);

	var _Material = __webpack_require__(7);

	var _Material2 = _interopRequireDefault(_Material);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	// import Search from './components/search';

	/* ----------------------------------------------------------------------------
	 * Application
	 * ------------------------------------------------------------------------- */

	var Application = function () {

	  /**
	   * Constructor.
	   *
	   * @constructor
	   * @param  {object} config Configuration object
	   * @return {void}
	   */
	  function Application(config) {
	    _classCallCheck(this, Application);

	    this.config_ = config;
	  }

	  /**
	   * Initialize all components
	   */


	  _createClass(Application, [{
	    key: "initialize",
	    value: function initialize() {

	      /* Initialize sticky sidebars */
	      this.initializeSidebar("[data-md-sidebar=primary]", "(min-width: 1200px)");
	      this.initializeSidebar("[data-md-sidebar=secondary]");

	      /* Initialize navigation style modifiers */
	      this.initializeNavBlur("[data-md-sidebar=secondary] .md-nav__link");
	      this.initializeNavCollapse("[data-md-collapse]", "(min-width: 1200px)");

	      // TODO
	      if (this.hasGithubRepo()) {
	        var githubSource = new _GithubSourceFacts2.default(this.config_.storage, this.config_.repo.url);
	        githubSource.initialize();
	      }
	    }

	    /**
	     * Initialize sidebar within optional media query range
	     *
	     * @param {(string|HTMLElement)} el - Selector or HTML element
	     * @param {string} [query] - Media query
	     */

	  }, {
	    key: "initializeSidebar",
	    value: function initializeSidebar(el) {
	      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	      var sidebar = new _Material2.default.Sidebar(el);
	      var listeners = [new _Material2.default.Listener.Viewport.Offset(function () {
	        return sidebar.update();
	      }), new _Material2.default.Listener.Viewport.Resize(function () {
	        return sidebar.update();
	      })];

	      /* Initialize depending on media query */
	      if (typeof query === "string" && query.length) {
	        new _Material2.default.Listener.Viewport.Media(query, function (media) {
	          if (media.matches) {
	            sidebar.update();
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	              for (var _iterator = listeners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var listener = _step.value;

	                listener.listen();
	              }
	            } catch (err) {
	              _didIteratorError = true;
	              _iteratorError = err;
	            } finally {
	              try {
	                if (!_iteratorNormalCompletion && _iterator.return) {
	                  _iterator.return();
	                }
	              } finally {
	                if (_didIteratorError) {
	                  throw _iteratorError;
	                }
	              }
	            }
	          } else {
	            sidebar.reset();
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;

	            try {
	              for (var _iterator2 = listeners[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                var _listener = _step2.value;

	                _listener.unlisten();
	              }
	            } catch (err) {
	              _didIteratorError2 = true;
	              _iteratorError2 = err;
	            } finally {
	              try {
	                if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                  _iterator2.return();
	                }
	              } finally {
	                if (_didIteratorError2) {
	                  throw _iteratorError2;
	                }
	              }
	            }
	          }
	        }).listen();

	        /* Initialize without media query */
	      } else {
	        sidebar.update();
	        var _iteratorNormalCompletion3 = true;
	        var _didIteratorError3 = false;
	        var _iteratorError3 = undefined;

	        try {
	          for (var _iterator3 = listeners[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	            var listener = _step3.value;

	            listener.listen();
	          }
	        } catch (err) {
	          _didIteratorError3 = true;
	          _iteratorError3 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion3 && _iterator3.return) {
	              _iterator3.return();
	            }
	          } finally {
	            if (_didIteratorError3) {
	              throw _iteratorError3;
	            }
	          }
	        }
	      }
	    }

	    /**
	     * Initialize blurring of anchors above page y-offset
	     *
	     * @param {(string|NodeList<HTMLElement>)} els - Selector or HTML elements
	     */

	  }, {
	    key: "initializeNavBlur",
	    value: function initializeNavBlur(els) {
	      var blur = new _Material2.default.Nav.Blur(els);
	      var listeners = [new _Material2.default.Listener.Viewport.Offset(function () {
	        return blur.update();
	      })];

	      /* Initialize blur and listeners */
	      blur.update();
	      var _iteratorNormalCompletion4 = true;
	      var _didIteratorError4 = false;
	      var _iteratorError4 = undefined;

	      try {
	        for (var _iterator4 = listeners[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	          var listener = _step4.value;

	          listener.listen();
	        }
	      } catch (err) {
	        _didIteratorError4 = true;
	        _iteratorError4 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion4 && _iterator4.return) {
	            _iterator4.return();
	          }
	        } finally {
	          if (_didIteratorError4) {
	            throw _iteratorError4;
	          }
	        }
	      }
	    }

	    /**
	     * Initialize collapsible nested navigation elements
	     *
	     * @param {(string|NodeList<HTMLElement>)} els - Selector or HTML elements
	     * @param {string} [query] - Media query
	     */

	  }, {
	    key: "initializeNavCollapse",
	    value: function initializeNavCollapse(els) {
	      var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	      var collapsibles = document.querySelectorAll(els);
	      var _iteratorNormalCompletion5 = true;
	      var _didIteratorError5 = false;
	      var _iteratorError5 = undefined;

	      try {
	        var _loop = function _loop() {
	          var collapsible = _step5.value;

	          var collapse = new _Material2.default.Nav.Collapse(collapsible);
	          var listener = new _Material2.default.Listener.Toggle(collapsible.previousElementSibling, function () {
	            return collapse.update();
	          });

	          /* Initialize depending on media query */
	          new _Material2.default.Listener.Viewport.Media(query, function (media) {
	            if (media.matches) {
	              listener.listen();
	            } else {
	              collapse.reset();
	              listener.unlisten();
	            }
	          }).listen();
	        };

	        for (var _iterator5 = collapsibles[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	          _loop();
	        }
	      } catch (err) {
	        _didIteratorError5 = true;
	        _iteratorError5 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion5 && _iterator5.return) {
	            _iterator5.return();
	          }
	        } finally {
	          if (_didIteratorError5) {
	            throw _iteratorError5;
	          }
	        }
	      }
	    }

	    /**
	     * Is this application about a Github repository?
	     *
	     * @return {bool} - true if `repo.icon` or `repo.url` contains 'github'
	     */

	  }, {
	    key: "hasGithubRepo",
	    value: function hasGithubRepo() {
	      return this.config_.repo.icon === "github" || this.config_.repo.url.includes("github");
	    }
	  }]);

	  return Application;
	}();

	exports.default = Application;

	// const consume = reader =>  {
	//   let total = 0, body = ""
	//   return new Promise((resolve, reject) => {
	//     function pump() {
	//       reader.read().then(({ done, value }) => {
	//         if (done) {
	//           console.log(body)
	//           resolve()
	//           return
	//         }
	//         total += value.byteLength
	//         // value +=
	//         body += value
	//         console.log(`received ${value.byteLength}, total: ${total}`)
	//         pump()
	//       })
	//       .catch(reject)
	//     }
	//     pump()
	//   })
	// }
	//
	// fetch("/mkdocs/search_index.json")
	//   .then(res => consume(res.body.getReader()))
	//   .then(() => console.log("consumed entire body"))
	//   .catch(e => console.log(e))

	// TODO: wrap in function call
	// application module export

	/* Initialize application upon DOM ready */

	document.addEventListener("DOMContentLoaded", function () {

	  /* Test for iOS */
	  Modernizr.addTest("ios", function () {
	    return !!navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
	  });

	  /* Test for web application context */
	  Modernizr.addTest("standalone", function () {
	    return !!navigator.standalone;
	  });

	  /* Attack FastClick to mitigate 300ms delay on touch devices */
	  _fastclick2.default.attach(document.body);

	  // query.addEventListener("focus", () => {
	  //   document.querySelector(".md-search").dataset.mdLocked = ""
	  // })

	  /* Intercept click on search mode toggle */

	  // TODO: this needs to be abstracted...
	  document.getElementById("query").addEventListener("focus", function () {
	    document.getElementById("search").checked = true;
	  });

	  // should be registered on body, but leads to problems
	  document.querySelector(".md-container").addEventListener("click", function () {
	    if (document.getElementById("search").checked) document.getElementById("search").checked = false;
	  });

	  // stop propagation, if search is active...
	  document.querySelector(".md-search").addEventListener("click", function (ev) {
	    ev.stopPropagation();
	  });
	  // toggleSearchClose.addEventListener("click", ev => {
	  //   ev.preventDefault()
	  //   // ev.target
	  //
	  //   const search = document.getElementById("search")
	  //   search.checked = false
	  // })

	  // }, 1000);

	  fetch("https://api.github.com/repos/squidfunk/mkdocs-material/releases/latest").then(function (response) {
	    return response.json();
	  });
	  // .then(data => {
	  //   // console.log(data)
	  // })
	});
	module.exports = exports["default"];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	;(function () {
		'use strict';

		/**
	  * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
	  *
	  * @codingstandard ftlabs-jsv2
	  * @copyright The Financial Times Limited [All Rights Reserved]
	  * @license MIT License (see LICENSE.txt)
	  */

		/*jslint browser:true, node:true*/
		/*global define, Event, Node*/

		/**
	  * Instantiate fast-clicking listeners on the specified layer.
	  *
	  * @constructor
	  * @param {Element} layer The layer to listen on
	  * @param {Object} [options={}] The options to override the defaults
	  */

		function FastClick(layer, options) {
			var oldOnClick;

			options = options || {};

			/**
	   * Whether a click is currently being tracked.
	   *
	   * @type boolean
	   */
			this.trackingClick = false;

			/**
	   * Timestamp for when click tracking started.
	   *
	   * @type number
	   */
			this.trackingClickStart = 0;

			/**
	   * The element being tracked for a click.
	   *
	   * @type EventTarget
	   */
			this.targetElement = null;

			/**
	   * X-coordinate of touch start event.
	   *
	   * @type number
	   */
			this.touchStartX = 0;

			/**
	   * Y-coordinate of touch start event.
	   *
	   * @type number
	   */
			this.touchStartY = 0;

			/**
	   * ID of the last touch, retrieved from Touch.identifier.
	   *
	   * @type number
	   */
			this.lastTouchIdentifier = 0;

			/**
	   * Touchmove boundary, beyond which a click will be cancelled.
	   *
	   * @type number
	   */
			this.touchBoundary = options.touchBoundary || 10;

			/**
	   * The FastClick layer.
	   *
	   * @type Element
	   */
			this.layer = layer;

			/**
	   * The minimum time between tap(touchstart and touchend) events
	   *
	   * @type number
	   */
			this.tapDelay = options.tapDelay || 200;

			/**
	   * The maximum time for a tap
	   *
	   * @type number
	   */
			this.tapTimeout = options.tapTimeout || 700;

			if (FastClick.notNeeded(layer)) {
				return;
			}

			// Some old versions of Android don't have Function.prototype.bind
			function bind(method, context) {
				return function () {
					return method.apply(context, arguments);
				};
			}

			var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
			var context = this;
			for (var i = 0, l = methods.length; i < l; i++) {
				context[methods[i]] = bind(context[methods[i]], context);
			}

			// Set up event handlers as required
			if (deviceIsAndroid) {
				layer.addEventListener('mouseover', this.onMouse, true);
				layer.addEventListener('mousedown', this.onMouse, true);
				layer.addEventListener('mouseup', this.onMouse, true);
			}

			layer.addEventListener('click', this.onClick, true);
			layer.addEventListener('touchstart', this.onTouchStart, false);
			layer.addEventListener('touchmove', this.onTouchMove, false);
			layer.addEventListener('touchend', this.onTouchEnd, false);
			layer.addEventListener('touchcancel', this.onTouchCancel, false);

			// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
			// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
			// layer when they are cancelled.
			if (!Event.prototype.stopImmediatePropagation) {
				layer.removeEventListener = function (type, callback, capture) {
					var rmv = Node.prototype.removeEventListener;
					if (type === 'click') {
						rmv.call(layer, type, callback.hijacked || callback, capture);
					} else {
						rmv.call(layer, type, callback, capture);
					}
				};

				layer.addEventListener = function (type, callback, capture) {
					var adv = Node.prototype.addEventListener;
					if (type === 'click') {
						adv.call(layer, type, callback.hijacked || (callback.hijacked = function (event) {
							if (!event.propagationStopped) {
								callback(event);
							}
						}), capture);
					} else {
						adv.call(layer, type, callback, capture);
					}
				};
			}

			// If a handler is already declared in the element's onclick attribute, it will be fired before
			// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
			// adding it as listener.
			if (typeof layer.onclick === 'function') {

				// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
				// - the old one won't work if passed to addEventListener directly.
				oldOnClick = layer.onclick;
				layer.addEventListener('click', function (event) {
					oldOnClick(event);
				}, false);
				layer.onclick = null;
			}
		}

		/**
	 * Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
	 *
	 * @type boolean
	 */
		var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

		/**
	  * Android requires exceptions.
	  *
	  * @type boolean
	  */
		var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;

		/**
	  * iOS requires exceptions.
	  *
	  * @type boolean
	  */
		var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;

		/**
	  * iOS 4 requires an exception for select elements.
	  *
	  * @type boolean
	  */
		var deviceIsIOS4 = deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent);

		/**
	  * iOS 6.0-7.* requires the target element to be manually derived
	  *
	  * @type boolean
	  */
		var deviceIsIOSWithBadTarget = deviceIsIOS && /OS [6-7]_\d/.test(navigator.userAgent);

		/**
	  * BlackBerry requires exceptions.
	  *
	  * @type boolean
	  */
		var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

		/**
	  * Determine whether a given element requires a native click.
	  *
	  * @param {EventTarget|Element} target Target DOM element
	  * @returns {boolean} Returns true if the element needs a native click
	  */
		FastClick.prototype.needsClick = function (target) {
			switch (target.nodeName.toLowerCase()) {

				// Don't send a synthetic click to disabled inputs (issue #62)
				case 'button':
				case 'select':
				case 'textarea':
					if (target.disabled) {
						return true;
					}

					break;
				case 'input':

					// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
					if (deviceIsIOS && target.type === 'file' || target.disabled) {
						return true;
					}

					break;
				case 'label':
				case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
				case 'video':
					return true;
			}

			return (/\bneedsclick\b/.test(target.className)
			);
		};

		/**
	  * Determine whether a given element requires a call to focus to simulate click into element.
	  *
	  * @param {EventTarget|Element} target Target DOM element
	  * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
	  */
		FastClick.prototype.needsFocus = function (target) {
			switch (target.nodeName.toLowerCase()) {
				case 'textarea':
					return true;
				case 'select':
					return !deviceIsAndroid;
				case 'input':
					switch (target.type) {
						case 'button':
						case 'checkbox':
						case 'file':
						case 'image':
						case 'radio':
						case 'submit':
							return false;
					}

					// No point in attempting to focus disabled inputs
					return !target.disabled && !target.readOnly;
				default:
					return (/\bneedsfocus\b/.test(target.className)
					);
			}
		};

		/**
	  * Send a click event to the specified element.
	  *
	  * @param {EventTarget|Element} targetElement
	  * @param {Event} event
	  */
		FastClick.prototype.sendClick = function (targetElement, event) {
			var clickEvent, touch;

			// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
			if (document.activeElement && document.activeElement !== targetElement) {
				document.activeElement.blur();
			}

			touch = event.changedTouches[0];

			// Synthesise a click event, with an extra attribute so it can be tracked
			clickEvent = document.createEvent('MouseEvents');
			clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
			clickEvent.forwardedTouchEvent = true;
			targetElement.dispatchEvent(clickEvent);
		};

		FastClick.prototype.determineEventType = function (targetElement) {

			//Issue #159: Android Chrome Select Box does not open with a synthetic click event
			if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
				return 'mousedown';
			}

			return 'click';
		};

		/**
	  * @param {EventTarget|Element} targetElement
	  */
		FastClick.prototype.focus = function (targetElement) {
			var length;

			// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
			if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
				length = targetElement.value.length;
				targetElement.setSelectionRange(length, length);
			} else {
				targetElement.focus();
			}
		};

		/**
	  * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
	  *
	  * @param {EventTarget|Element} targetElement
	  */
		FastClick.prototype.updateScrollParent = function (targetElement) {
			var scrollParent, parentElement;

			scrollParent = targetElement.fastClickScrollParent;

			// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
			// target element was moved to another parent.
			if (!scrollParent || !scrollParent.contains(targetElement)) {
				parentElement = targetElement;
				do {
					if (parentElement.scrollHeight > parentElement.offsetHeight) {
						scrollParent = parentElement;
						targetElement.fastClickScrollParent = parentElement;
						break;
					}

					parentElement = parentElement.parentElement;
				} while (parentElement);
			}

			// Always update the scroll top tracker if possible.
			if (scrollParent) {
				scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
			}
		};

		/**
	  * @param {EventTarget} targetElement
	  * @returns {Element|EventTarget}
	  */
		FastClick.prototype.getTargetElementFromEventTarget = function (eventTarget) {

			// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
			if (eventTarget.nodeType === Node.TEXT_NODE) {
				return eventTarget.parentNode;
			}

			return eventTarget;
		};

		/**
	  * On touch start, record the position and scroll offset.
	  *
	  * @param {Event} event
	  * @returns {boolean}
	  */
		FastClick.prototype.onTouchStart = function (event) {
			var targetElement, touch, selection;

			// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
			if (event.targetTouches.length > 1) {
				return true;
			}

			targetElement = this.getTargetElementFromEventTarget(event.target);
			touch = event.targetTouches[0];

			if (deviceIsIOS) {

				// Only trusted events will deselect text on iOS (issue #49)
				selection = window.getSelection();
				if (selection.rangeCount && !selection.isCollapsed) {
					return true;
				}

				if (!deviceIsIOS4) {

					// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
					// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
					// with the same identifier as the touch event that previously triggered the click that triggered the alert.
					// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
					// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
					// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
					// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
					// random integers, it's safe to to continue if the identifier is 0 here.
					if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
						event.preventDefault();
						return false;
					}

					this.lastTouchIdentifier = touch.identifier;

					// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
					// 1) the user does a fling scroll on the scrollable layer
					// 2) the user stops the fling scroll with another tap
					// then the event.target of the last 'touchend' event will be the element that was under the user's finger
					// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
					// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
					this.updateScrollParent(targetElement);
				}
			}

			this.trackingClick = true;
			this.trackingClickStart = event.timeStamp;
			this.targetElement = targetElement;

			this.touchStartX = touch.pageX;
			this.touchStartY = touch.pageY;

			// Prevent phantom clicks on fast double-tap (issue #36)
			if (event.timeStamp - this.lastClickTime < this.tapDelay) {
				event.preventDefault();
			}

			return true;
		};

		/**
	  * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
	  *
	  * @param {Event} event
	  * @returns {boolean}
	  */
		FastClick.prototype.touchHasMoved = function (event) {
			var touch = event.changedTouches[0],
			    boundary = this.touchBoundary;

			if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
				return true;
			}

			return false;
		};

		/**
	  * Update the last position.
	  *
	  * @param {Event} event
	  * @returns {boolean}
	  */
		FastClick.prototype.onTouchMove = function (event) {
			if (!this.trackingClick) {
				return true;
			}

			// If the touch has moved, cancel the click tracking
			if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
				this.trackingClick = false;
				this.targetElement = null;
			}

			return true;
		};

		/**
	  * Attempt to find the labelled control for the given label element.
	  *
	  * @param {EventTarget|HTMLLabelElement} labelElement
	  * @returns {Element|null}
	  */
		FastClick.prototype.findControl = function (labelElement) {

			// Fast path for newer browsers supporting the HTML5 control attribute
			if (labelElement.control !== undefined) {
				return labelElement.control;
			}

			// All browsers under test that support touch events also support the HTML5 htmlFor attribute
			if (labelElement.htmlFor) {
				return document.getElementById(labelElement.htmlFor);
			}

			// If no for attribute exists, attempt to retrieve the first labellable descendant element
			// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
			return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
		};

		/**
	  * On touch end, determine whether to send a click event at once.
	  *
	  * @param {Event} event
	  * @returns {boolean}
	  */
		FastClick.prototype.onTouchEnd = function (event) {
			var forElement,
			    trackingClickStart,
			    targetTagName,
			    scrollParent,
			    touch,
			    targetElement = this.targetElement;

			if (!this.trackingClick) {
				return true;
			}

			// Prevent phantom clicks on fast double-tap (issue #36)
			if (event.timeStamp - this.lastClickTime < this.tapDelay) {
				this.cancelNextClick = true;
				return true;
			}

			if (event.timeStamp - this.trackingClickStart > this.tapTimeout) {
				return true;
			}

			// Reset to prevent wrong click cancel on input (issue #156).
			this.cancelNextClick = false;

			this.lastClickTime = event.timeStamp;

			trackingClickStart = this.trackingClickStart;
			this.trackingClick = false;
			this.trackingClickStart = 0;

			// On some iOS devices, the targetElement supplied with the event is invalid if the layer
			// is performing a transition or scroll, and has to be re-detected manually. Note that
			// for this to function correctly, it must be called *after* the event target is checked!
			// See issue #57; also filed as rdar://13048589 .
			if (deviceIsIOSWithBadTarget) {
				touch = event.changedTouches[0];

				// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
				targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
				targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
			}

			targetTagName = targetElement.tagName.toLowerCase();
			if (targetTagName === 'label') {
				forElement = this.findControl(targetElement);
				if (forElement) {
					this.focus(targetElement);
					if (deviceIsAndroid) {
						return false;
					}

					targetElement = forElement;
				}
			} else if (this.needsFocus(targetElement)) {

				// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
				// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
				if (event.timeStamp - trackingClickStart > 100 || deviceIsIOS && window.top !== window && targetTagName === 'input') {
					this.targetElement = null;
					return false;
				}

				this.focus(targetElement);
				this.sendClick(targetElement, event);

				// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
				// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
				if (!deviceIsIOS || targetTagName !== 'select') {
					this.targetElement = null;
					event.preventDefault();
				}

				return false;
			}

			if (deviceIsIOS && !deviceIsIOS4) {

				// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
				// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
				scrollParent = targetElement.fastClickScrollParent;
				if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
					return true;
				}
			}

			// Prevent the actual click from going though - unless the target node is marked as requiring
			// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
			if (!this.needsClick(targetElement)) {
				event.preventDefault();
				this.sendClick(targetElement, event);
			}

			return false;
		};

		/**
	  * On touch cancel, stop tracking the click.
	  *
	  * @returns {void}
	  */
		FastClick.prototype.onTouchCancel = function () {
			this.trackingClick = false;
			this.targetElement = null;
		};

		/**
	  * Determine mouse events which should be permitted.
	  *
	  * @param {Event} event
	  * @returns {boolean}
	  */
		FastClick.prototype.onMouse = function (event) {

			// If a target element was never set (because a touch event was never fired) allow the event
			if (!this.targetElement) {
				return true;
			}

			if (event.forwardedTouchEvent) {
				return true;
			}

			// Programmatically generated events targeting a specific element should be permitted
			if (!event.cancelable) {
				return true;
			}

			// Derive and check the target element to see whether the mouse event needs to be permitted;
			// unless explicitly enabled, prevent non-touch click events from triggering actions,
			// to prevent ghost/doubleclicks.
			if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

				// Prevent any user-added listeners declared on FastClick element from being fired.
				if (event.stopImmediatePropagation) {
					event.stopImmediatePropagation();
				} else {

					// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
					event.propagationStopped = true;
				}

				// Cancel the event
				event.stopPropagation();
				event.preventDefault();

				return false;
			}

			// If the mouse event is permitted, return true for the action to go through.
			return true;
		};

		/**
	  * On actual clicks, determine whether this is a touch-generated click, a click action occurring
	  * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
	  * an actual click which should be permitted.
	  *
	  * @param {Event} event
	  * @returns {boolean}
	  */
		FastClick.prototype.onClick = function (event) {
			var permitted;

			// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
			if (this.trackingClick) {
				this.targetElement = null;
				this.trackingClick = false;
				return true;
			}

			// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
			if (event.target.type === 'submit' && event.detail === 0) {
				return true;
			}

			permitted = this.onMouse(event);

			// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
			if (!permitted) {
				this.targetElement = null;
			}

			// If clicks are permitted, return true for the action to go through.
			return permitted;
		};

		/**
	  * Remove all FastClick's event listeners.
	  *
	  * @returns {void}
	  */
		FastClick.prototype.destroy = function () {
			var layer = this.layer;

			if (deviceIsAndroid) {
				layer.removeEventListener('mouseover', this.onMouse, true);
				layer.removeEventListener('mousedown', this.onMouse, true);
				layer.removeEventListener('mouseup', this.onMouse, true);
			}

			layer.removeEventListener('click', this.onClick, true);
			layer.removeEventListener('touchstart', this.onTouchStart, false);
			layer.removeEventListener('touchmove', this.onTouchMove, false);
			layer.removeEventListener('touchend', this.onTouchEnd, false);
			layer.removeEventListener('touchcancel', this.onTouchCancel, false);
		};

		/**
	  * Check whether FastClick is needed.
	  *
	  * @param {Element} layer The layer to listen on
	  */
		FastClick.notNeeded = function (layer) {
			var metaViewport;
			var chromeVersion;
			var blackberryVersion;
			var firefoxVersion;

			// Devices that don't support touch don't need FastClick
			if (typeof window.ontouchstart === 'undefined') {
				return true;
			}

			// Chrome version - zero for other browsers
			chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];

			if (chromeVersion) {

				if (deviceIsAndroid) {
					metaViewport = document.querySelector('meta[name=viewport]');

					if (metaViewport) {
						// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
						if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
							return true;
						}
						// Chrome 32 and above with width=device-width or less don't need FastClick
						if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
							return true;
						}
					}

					// Chrome desktop doesn't need FastClick (issue #15)
				} else {
					return true;
				}
			}

			if (deviceIsBlackBerry10) {
				blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

				// BlackBerry 10.3+ does not require Fastclick library.
				// https://github.com/ftlabs/fastclick/issues/251
				if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
					metaViewport = document.querySelector('meta[name=viewport]');

					if (metaViewport) {
						// user-scalable=no eliminates click delay.
						if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
							return true;
						}
						// width=device-width (or less than device-width) eliminates click delay.
						if (document.documentElement.scrollWidth <= window.outerWidth) {
							return true;
						}
					}
				}
			}

			// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
			if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
				return true;
			}

			// Firefox version - zero for other browsers
			firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];

			if (firefoxVersion >= 27) {
				// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

				metaViewport = document.querySelector('meta[name=viewport]');
				if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
					return true;
				}
			}

			// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
			// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
			if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
				return true;
			}

			return false;
		};

		/**
	  * Factory method for creating a FastClick object
	  *
	  * @param {Element} layer The layer to listen on
	  * @param {Object} [options={}] The options to override the defaults
	  */
		FastClick.attach = function (layer, options) {
			return new FastClick(layer, options);
		};

		if ("function" === 'function' && _typeof(__webpack_require__(4)) === 'object' && __webpack_require__(4)) {

			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return FastClick;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof module !== 'undefined' && module.exports) {
			module.exports = FastClick.attach;
			module.exports.FastClick = FastClick;
		} else {
			window.FastClick = FastClick;
		}
	})();

/***/ },
/* 4 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(JSX) {"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
	 * Github Source
	 * ------------------------------------------------------------------------- */

	var GithubSourceFacts = function () {

	  /**
	   * Constructor.
	   *
	   * @constructor
	   * @param  {object} storage - Accessor to storage, eg. `window.sessionStorage`
	   * @param  {string} repoUrl - URL to Github repository
	   */
	  function GithubSourceFacts(storage, repoUrl) {
	    _classCallCheck(this, GithubSourceFacts);

	    this.storage = storage;
	    this.storageKey = "github-source-facts";
	    this.apiRepoUrl = repoUrl.replace("github.com/", "api.github.com/repos/");
	  }

	  /**
	   * Retrieve stars and fork counts for the repository before invoking
	   * `GithubSourceFacts.paint`.
	   *
	   * @return {void}
	   */


	  _createClass(GithubSourceFacts, [{
	    key: "initialize",
	    value: function initialize() {
	      var _this = this;

	      var facts = this.storage.getItem(this.storageKey);

	      // Retrieve the facts, then invoke paint
	      if (!facts) {
	        fetch(this.apiRepoUrl).then(function (response) {
	          return response.json();
	        }).then(function (data) {
	          var repoFacts = {
	            stars: data.stargazers_count,
	            forks: data.forks_count
	          };

	          _this.storage.setItem(_this.storageKey, JSON.stringify(repoFacts));

	          GithubSourceFacts.paint(repoFacts);
	        }).catch(function () {
	          // console.log("parsing failed", ex)
	        });
	        // Use the cached facts
	      } else {
	        GithubSourceFacts.paint(JSON.parse(facts));
	      }
	    }

	    /**
	     * Populates `.md-source__facts` with star and fork counts.
	     *
	     * @param  {integer} options.stars - Stars count for the repo
	     * @param  {integer} options.forks - Fork count for the repo
	     * @return {void}
	     */

	  }], [{
	    key: "paint",
	    value: function paint(_ref) {
	      var stars = _ref.stars,
	          forks = _ref.forks;

	      var lists = document.querySelectorAll(".md-source__facts"); // TODO 2x list in drawer and header

	      // TODO: use ... of ...
	      [].forEach.call(lists, function (list) {
	        var li = JSX.createElement(
	          "li",
	          { "class": "md-source__fact md-source__fact--hidden" },
	          stars,
	          " Stars"
	        );
	        setTimeout(function (fact) {
	          fact.classList.remove("md-source__fact--hidden");
	        }, 100, li);
	        list.appendChild(li);

	        li = JSX.createElement(
	          "li",
	          { "class": "md-source__fact md-source__fact--hidden" },
	          forks,
	          " Forks"
	        );
	        setTimeout(function (fact) {
	          fact.classList.remove("md-source__fact--hidden");
	        }, 500, li);
	        list.appendChild(li);
	      });
	    }
	  }]);

	  return GithubSourceFacts;
	}();

	exports.default = GithubSourceFacts;
	module.exports = exports["default"];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
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

	exports.default = /* JSX */{

	  /**
	   * Create a native DOM node from JSX's intermediate representation
	   *
	   * @param {string} tag - Tag name
	   * @param {object} properties - Properties
	   * @param {...(string|number|Array)} children - Child nodes
	   * @return {HTMLElement} Native DOM node
	   */
	  createElement: function createElement(tag, properties) {
	    var el = document.createElement(tag);

	    /* Set all properties */
	    if (properties) {
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = Object.keys(properties)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var _attr = _step.value;

	          el.setAttribute(_attr, properties[_attr]);
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    } /* Iterate child nodes */
	    var iterateChildNodes = function iterateChildNodes(nodes) {
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = nodes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var node = _step2.value;


	          /* Directly append text content */
	          if (typeof node === "string" || typeof node === "number") {
	            el.textContent += node;

	            /* Recurse, if we got an array */
	          } else if (Array.isArray(node)) {
	            iterateChildNodes(node);

	            /* Append regular nodes */
	          } else {
	            el.appendChild(node);
	          }
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }
	    };

	    /* Iterate child nodes and return element */

	    for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	      children[_key - 2] = arguments[_key];
	    }

	    iterateChildNodes(children);
	    return el;
	  }
	};
	module.exports = exports["default"];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Nav = __webpack_require__(8);

	var _Nav2 = _interopRequireDefault(_Nav);

	var _Search = __webpack_require__(11);

	var _Search2 = _interopRequireDefault(_Search);

	var _Listener = __webpack_require__(15);

	var _Listener2 = _interopRequireDefault(_Listener);

	var _Sidebar = __webpack_require__(22);

	var _Sidebar2 = _interopRequireDefault(_Sidebar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* ----------------------------------------------------------------------------
	 * Module
	 * ------------------------------------------------------------------------- */

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

	exports.default = {
	  Nav: _Nav2.default,
	  Search: _Search2.default,
	  Listener: _Listener2.default,
	  Sidebar: _Sidebar2.default
	};

	/* ----------------------------------------------------------------------------
	 * Definition
	 * ------------------------------------------------------------------------- */

	// export default class Material {
	//

	//

	//
	//   static initializeSearch() {
	//
	//   }
	//
	//   /**
	//    * Initialize all components
	//    */
	//   static initialize() {
	//
	//     const search = new Search.Lock("#search", () => {
	//       document.getElementById("query").focus()
	//     })
	//     search.listen() // TODO when this is commented out, focusing the search somehow breaks things...
	//
	//     const searchx = document.getElementById("search")
	//     const initialize = () => {
	//       const foo = new Search.Index()
	//       console.log(foo)
	//
	//       searchx.removeEventListener("change", initialize)
	//     }
	//     searchx.addEventListener("change", initialize)
	//     console.log(searchx)
	//
	//     // TODO nav bar is blurry until 959px, when expanded...
	//   }
	// }

	module.exports = exports["default"];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Blur = __webpack_require__(9);

	var _Blur2 = _interopRequireDefault(_Blur);

	var _Collapse = __webpack_require__(10);

	var _Collapse2 = _interopRequireDefault(_Collapse);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* ----------------------------------------------------------------------------
	 * Module
	 * ------------------------------------------------------------------------- */

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

	exports.default = {
	  Blur: _Blur2.default,
	  Collapse: _Collapse2.default
	};
	module.exports = exports["default"];

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

	var Blur = function () {

	  /**
	   * Blur anchors within the navigation above current page y-offset
	   *
	   * @constructor
	   * @param {(string|NodeList<HTMLElement>)} els - Selector or HTML elements
	   */
	  function Blur(els) {
	    _classCallCheck(this, Blur);

	    this.els_ = typeof els === "string" ? document.querySelectorAll(els) : els;

	    /* Initialize index and page y-offset */
	    this.index_ = 0;
	    this.offset_ = window.pageYOffset;

	    /* Index anchor nodes for fast lookup */
	    this.anchors_ = [].map.call(this.els_, function (el) {
	      return document.querySelector(el.hash);
	    });
	  }

	  /**
	   * Update anchor states
	   */


	  _createClass(Blur, [{
	    key: "update",
	    value: function update() {
	      var offset = window.pageYOffset;

	      /* Scroll direction is down */
	      if (this.offset_ <= offset) {
	        for (var i = this.index_ + 1; i < this.els_.length; i++) {
	          if (this.anchors_[i].offsetTop <= offset) {
	            if (i > 0) this.els_[i - 1].dataset.mdBlurred = "";
	            this.index_ = i;
	          } else {
	            break;
	          }
	        }

	        /* Scroll direction is up */
	      } else {
	        for (var _i = this.index_; _i >= 0; _i--) {
	          if (this.anchors_[_i].offsetTop > offset) {
	            if (_i > 0) delete this.els_[_i - 1].dataset.mdBlurred;
	          } else {
	            this.index_ = _i;
	            break;
	          }
	        }
	      }

	      /* Remember current offset for next iteration */
	      this.offset_ = offset;
	    }

	    /**
	     * Reset anchor states
	     */

	  }, {
	    key: "reset",
	    value: function reset() {
	      [].forEach.call(this.els_, function (el) {
	        delete el.dataset.mdBlurred;
	      });
	    }
	  }]);

	  return Blur;
	}();

	exports.default = Blur;
	module.exports = exports["default"];

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

	var Collapse = function () {

	  /**
	   * Expand or collapse navigation on toggle
	   *
	   * @constructor
	   * @param {(string|HTMLElement)} el - Selector or HTML element
	   */
	  function Collapse(el) {
	    _classCallCheck(this, Collapse);

	    this.el_ = typeof el === "string" ? document.querySelector(el) : el;
	  }

	  /**
	   * Make expand and collapse transition smoothly
	   */


	  _createClass(Collapse, [{
	    key: "update",
	    value: function update() {
	      var _this = this;

	      var current = this.el_.getBoundingClientRect().height;

	      /* Expanded, so collapse */
	      if (current) {
	        this.el_.style.maxHeight = current + "px";
	        requestAnimationFrame(function () {
	          _this.el_.dataset.mdAnimated = "";
	          _this.el_.style.maxHeight = "0px";
	        });

	        /* Collapsed, so expand */
	      } else {
	        (function () {
	          _this.el_.style.maxHeight = "";
	          _this.el_.dataset.mdExpanded = "";

	          /* Read height and unset pseudo-toggled state */
	          var height = _this.el_.getBoundingClientRect().height;
	          delete _this.el_.dataset.mdExpanded;

	          /* Set initial state and animate */
	          _this.el_.style.maxHeight = "0px";
	          requestAnimationFrame(function () {
	            _this.el_.dataset.mdAnimated = "";
	            _this.el_.style.maxHeight = height + "px";
	          });
	        })();
	      }

	      /* Remove state on end of transition */
	      var end = function end(ev) {
	        delete ev.target.dataset.mdAnimated;
	        ev.target.style.maxHeight = "";

	        /* Only fire once, so remove event listener again */
	        ev.target.removeEventListener("transitionend", end, false);
	      };
	      this.el_.addEventListener("transitionend", end, false);
	    }

	    /**
	     * Nothing to reset
	     */

	  }, {
	    key: "reset",
	    value: function reset() {
	      this.el_.style.maxHeight = "";
	      delete this.el_.dataset.mdToggled;
	    }
	  }]);

	  return Collapse;
	}();

	exports.default = Collapse;
	module.exports = exports["default"];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Index = __webpack_require__(12);

	var _Index2 = _interopRequireDefault(_Index);

	var _Lock = __webpack_require__(14);

	var _Lock2 = _interopRequireDefault(_Lock);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* ----------------------------------------------------------------------------
	 * Module
	 * ------------------------------------------------------------------------- */

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

	exports.default = {
	  Index: _Index2.default,
	  Lock: _Lock2.default
	};
	module.exports = exports["default"];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(JSX) {"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _lunr = __webpack_require__(13);

	var _lunr2 = _interopRequireDefault(_lunr);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /*
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

	var Index =

	/**
	 *                          // TODO: just copy+pasted
	 *
	 * @constructor
	 */
	function Index() {
	  _classCallCheck(this, Index);

	  var query = document.getElementById("query");
	  // TODO: put this in search index class...
	  // setTimeout(function() {

	  // indexed percentage!

	  fetch("/mkdocs/search_index.json") // TODO: prepend BASE URL!!!
	  .then(function (response) {
	    return response.json();
	  }).then(function (data) {

	    /* Create index */
	    var index = (0, _lunr2.default)(function () {
	      /* eslint-disable no-invalid-this, lines-around-comment */
	      this.field("title", { boost: 10 });
	      this.field("text");
	      this.ref("location");
	      /* eslint-enable no-invalid-this, lines-around-comment */
	    });

	    /* Index articles */
	    var articles = {};
	    data.docs.forEach(function (article, i) {
	      // console.log(`indexing...${i}`)
	      var meta = document.querySelector(".md-search-result__meta");
	      meta.innerHTML = "Indexing: " + (i + 1) / data.docs.length + "%";

	      // TODO: match for two whitespaces, then replace unnecessary whitespace after string
	      article.text = article.text.replace(/\s(\.,\:)\s/gi, function (string, g1) {
	        return g1 + " ";
	      });
	      // TODO: window.baseUrl sucks...
	      article.location = window.baseUrl + article.location;
	      articles[article.location] = article;
	      index.add(article);
	    });

	    /* Truncate a string after the given number of characters */
	    var truncate = function truncate(string, n) {
	      var i = n;
	      if (string.length > i) {
	        while (string[i] !== " " && --i > 0) {}
	        return string.substring(0, i) + "&hellip;";
	      }
	      return string;
	    };

	    /* Register keyhandler to execute search on key up */
	    var queryx = document.getElementById("query");
	    queryx.addEventListener("keyup", function () {
	      var container = document.querySelector(".md-search-result__list");
	      while (container.firstChild) {
	        container.removeChild(container.firstChild);
	      } // /* Abort, if the query is empty */
	      // var bar = document.querySelector('.bar.search');
	      // if (!query.value.length) {
	      //   while (meta.firstChild)
	      //     meta.removeChild(meta.firstChild);
	      //
	      //   /* Restore state */
	      //   bar.classList.remove('non-empty');
	      //   return;
	      // }

	      /* Show reset button */
	      // bar.classList.add('non-empty');

	      /* Execute search */
	      var results = index.search(query.value);
	      results.forEach(function (result) {
	        var article = articles[result.ref];

	        container.appendChild(JSX.createElement(
	          "li",
	          { "class": "md-search-result__item" },
	          JSX.createElement(
	            "a",
	            { href: article.location, title: article.title,
	              "class": "md-search-result__link" },
	            JSX.createElement(
	              "article",
	              { "class": "md-search-result__article" },
	              JSX.createElement(
	                "h1",
	                { "class": "md-search-result__title" },
	                article.title
	              ),
	              JSX.createElement(
	                "p",
	                { "class": "md-search-result__teaser" },
	                truncate(article.text, 140)
	              )
	            )
	          )
	        ));
	      });

	      /* Show number of search results */
	      // var number = document.createElement('strong');

	      var meta = document.querySelector(".md-search-result__meta");
	      meta.innerHTML = results.length + " search result" + (results.length !== 1 ? "s" : "");

	      /* Update number */
	      // while (meta.firstChild)
	      //   meta.removeChild(meta.firstChild);
	      // meta.appendChild(number);
	    });

	    // setTimeout(function() {
	    //   li.classList.remove('md-source__fact--hidden');
	    // }, 100);
	  }).catch(function () {
	    // console.log("parsing failed", ex)
	  });
	};

	exports.default = Index;
	module.exports = exports["default"];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * lunr - http://lunrjs.com - A bit like Solr, but much smaller and not as bright - 0.7.2
	 * Copyright (C) 2016 Oliver Nightingale
	 * @license MIT
	 */

	;(function () {

	  /**
	   * Convenience function for instantiating a new lunr index and configuring it
	   * with the default pipeline functions and the passed config function.
	   *
	   * When using this convenience function a new index will be created with the
	   * following functions already in the pipeline:
	   *
	   * lunr.StopWordFilter - filters out any stop words before they enter the
	   * index
	   *
	   * lunr.stemmer - stems the tokens before entering the index.
	   *
	   * Example:
	   *
	   *     var idx = lunr(function () {
	   *       this.field('title', 10)
	   *       this.field('tags', 100)
	   *       this.field('body')
	   *       
	   *       this.ref('cid')
	   *       
	   *       this.pipeline.add(function () {
	   *         // some custom pipeline function
	   *       })
	   *       
	   *     })
	   *
	   * @param {Function} config A function that will be called with the new instance
	   * of the lunr.Index as both its context and first parameter. It can be used to
	   * customize the instance of new lunr.Index.
	   * @namespace
	   * @module
	   * @returns {lunr.Index}
	   *
	   */
	  var lunr = function lunr(config) {
	    var idx = new lunr.Index();

	    idx.pipeline.add(lunr.trimmer, lunr.stopWordFilter, lunr.stemmer);

	    if (config) config.call(idx, idx);

	    return idx;
	  };

	  lunr.version = "0.7.2";
	  /*!
	   * lunr.utils
	   * Copyright (C) 2016 Oliver Nightingale
	   */

	  /**
	   * A namespace containing utils for the rest of the lunr library
	   */
	  lunr.utils = {};

	  /**
	   * Print a warning message to the console.
	   *
	   * @param {String} message The message to be printed.
	   * @memberOf Utils
	   */
	  lunr.utils.warn = function (global) {
	    return function (message) {
	      if (global.console && console.warn) {
	        console.warn(message);
	      }
	    };
	  }(this);

	  /**
	   * Convert an object to a string.
	   *
	   * In the case of `null` and `undefined` the function returns
	   * the empty string, in all other cases the result of calling
	   * `toString` on the passed object is returned.
	   *
	   * @param {Any} obj The object to convert to a string.
	   * @return {String} string representation of the passed object.
	   * @memberOf Utils
	   */
	  lunr.utils.asString = function (obj) {
	    if (obj === void 0 || obj === null) {
	      return "";
	    } else {
	      return obj.toString();
	    }
	  };
	  /*!
	   * lunr.EventEmitter
	   * Copyright (C) 2016 Oliver Nightingale
	   */

	  /**
	   * lunr.EventEmitter is an event emitter for lunr. It manages adding and removing event handlers and triggering events and their handlers.
	   *
	   * @constructor
	   */
	  lunr.EventEmitter = function () {
	    this.events = {};
	  };

	  /**
	   * Binds a handler function to a specific event(s).
	   *
	   * Can bind a single function to many different events in one call.
	   *
	   * @param {String} [eventName] The name(s) of events to bind this function to.
	   * @param {Function} fn The function to call when an event is fired.
	   * @memberOf EventEmitter
	   */
	  lunr.EventEmitter.prototype.addListener = function () {
	    var args = Array.prototype.slice.call(arguments),
	        fn = args.pop(),
	        names = args;

	    if (typeof fn !== "function") throw new TypeError("last argument must be a function");

	    names.forEach(function (name) {
	      if (!this.hasHandler(name)) this.events[name] = [];
	      this.events[name].push(fn);
	    }, this);
	  };

	  /**
	   * Removes a handler function from a specific event.
	   *
	   * @param {String} eventName The name of the event to remove this function from.
	   * @param {Function} fn The function to remove from an event.
	   * @memberOf EventEmitter
	   */
	  lunr.EventEmitter.prototype.removeListener = function (name, fn) {
	    if (!this.hasHandler(name)) return;

	    var fnIndex = this.events[name].indexOf(fn);
	    this.events[name].splice(fnIndex, 1);

	    if (!this.events[name].length) delete this.events[name];
	  };

	  /**
	   * Calls all functions bound to the given event.
	   *
	   * Additional data can be passed to the event handler as arguments to `emit`
	   * after the event name.
	   *
	   * @param {String} eventName The name of the event to emit.
	   * @memberOf EventEmitter
	   */
	  lunr.EventEmitter.prototype.emit = function (name) {
	    if (!this.hasHandler(name)) return;

	    var args = Array.prototype.slice.call(arguments, 1);

	    this.events[name].forEach(function (fn) {
	      fn.apply(undefined, args);
	    });
	  };

	  /**
	   * Checks whether a handler has ever been stored against an event.
	   *
	   * @param {String} eventName The name of the event to check.
	   * @private
	   * @memberOf EventEmitter
	   */
	  lunr.EventEmitter.prototype.hasHandler = function (name) {
	    return name in this.events;
	  };

	  /*!
	   * lunr.tokenizer
	   * Copyright (C) 2016 Oliver Nightingale
	   */

	  /**
	   * A function for splitting a string into tokens ready to be inserted into
	   * the search index. Uses `lunr.tokenizer.separator` to split strings, change
	   * the value of this property to change how strings are split into tokens.
	   *
	   * @module
	   * @param {String} obj The string to convert into tokens
	   * @see lunr.tokenizer.separator
	   * @returns {Array}
	   */
	  lunr.tokenizer = function (obj) {
	    if (!arguments.length || obj == null || obj == undefined) return [];
	    if (Array.isArray(obj)) return obj.map(function (t) {
	      return lunr.utils.asString(t).toLowerCase();
	    });

	    // TODO: This exists so that the deprecated property lunr.tokenizer.seperator can still be used. By
	    // default it is set to false and so the correctly spelt lunr.tokenizer.separator is used unless
	    // the user is using the old property to customise the tokenizer.
	    //
	    // This should be removed when version 1.0.0 is released.
	    var separator = lunr.tokenizer.seperator || lunr.tokenizer.separator;

	    return obj.toString().trim().toLowerCase().split(separator);
	  };

	  /**
	   * This property is legacy alias for lunr.tokenizer.separator to maintain backwards compatability.
	   * When introduced the token was spelt incorrectly. It will remain until 1.0.0 when it will be removed,
	   * all code should use the correctly spelt lunr.tokenizer.separator property instead.
	   *
	   * @static
	   * @see lunr.tokenizer.separator
	   * @deprecated since 0.7.2 will be removed in 1.0.0
	   * @private
	   * @see lunr.tokenizer
	   */
	  lunr.tokenizer.seperator = false;

	  /**
	   * The sperator used to split a string into tokens. Override this property to change the behaviour of
	   * `lunr.tokenizer` behaviour when tokenizing strings. By default this splits on whitespace and hyphens.
	   *
	   * @static
	   * @see lunr.tokenizer
	   */
	  lunr.tokenizer.separator = /[\s\-]+/;

	  /**
	   * Loads a previously serialised tokenizer.
	   *
	   * A tokenizer function to be loaded must already be registered with lunr.tokenizer.
	   * If the serialised tokenizer has not been registered then an error will be thrown.
	   *
	   * @param {String} label The label of the serialised tokenizer.
	   * @returns {Function}
	   * @memberOf tokenizer
	   */
	  lunr.tokenizer.load = function (label) {
	    var fn = this.registeredFunctions[label];

	    if (!fn) {
	      throw new Error('Cannot load un-registered function: ' + label);
	    }

	    return fn;
	  };

	  lunr.tokenizer.label = 'default';

	  lunr.tokenizer.registeredFunctions = {
	    'default': lunr.tokenizer
	  };

	  /**
	   * Register a tokenizer function.
	   *
	   * Functions that are used as tokenizers should be registered if they are to be used with a serialised index.
	   *
	   * Registering a function does not add it to an index, functions must still be associated with a specific index for them to be used when indexing and searching documents.
	   *
	   * @param {Function} fn The function to register.
	   * @param {String} label The label to register this function with
	   * @memberOf tokenizer
	   */
	  lunr.tokenizer.registerFunction = function (fn, label) {
	    if (label in this.registeredFunctions) {
	      lunr.utils.warn('Overwriting existing tokenizer: ' + label);
	    }

	    fn.label = label;
	    this.registeredFunctions[label] = fn;
	  };
	  /*!
	   * lunr.Pipeline
	   * Copyright (C) 2016 Oliver Nightingale
	   */

	  /**
	   * lunr.Pipelines maintain an ordered list of functions to be applied to all
	   * tokens in documents entering the search index and queries being ran against
	   * the index.
	   *
	   * An instance of lunr.Index created with the lunr shortcut will contain a
	   * pipeline with a stop word filter and an English language stemmer. Extra
	   * functions can be added before or after either of these functions or these
	   * default functions can be removed.
	   *
	   * When run the pipeline will call each function in turn, passing a token, the
	   * index of that token in the original list of all tokens and finally a list of
	   * all the original tokens.
	   *
	   * The output of functions in the pipeline will be passed to the next function
	   * in the pipeline. To exclude a token from entering the index the function
	   * should return undefined, the rest of the pipeline will not be called with
	   * this token.
	   *
	   * For serialisation of pipelines to work, all functions used in an instance of
	   * a pipeline should be registered with lunr.Pipeline. Registered functions can
	   * then be loaded. If trying to load a serialised pipeline that uses functions
	   * that are not registered an error will be thrown.
	   *
	   * If not planning on serialising the pipeline then registering pipeline functions
	   * is not necessary.
	   *
	   * @constructor
	   */
	  lunr.Pipeline = function () {
	    this._stack = [];
	  };

	  lunr.Pipeline.registeredFunctions = {};

	  /**
	   * Register a function with the pipeline.
	   *
	   * Functions that are used in the pipeline should be registered if the pipeline
	   * needs to be serialised, or a serialised pipeline needs to be loaded.
	   *
	   * Registering a function does not add it to a pipeline, functions must still be
	   * added to instances of the pipeline for them to be used when running a pipeline.
	   *
	   * @param {Function} fn The function to check for.
	   * @param {String} label The label to register this function with
	   * @memberOf Pipeline
	   */
	  lunr.Pipeline.registerFunction = function (fn, label) {
	    if (label in this.registeredFunctions) {
	      lunr.utils.warn('Overwriting existing registered function: ' + label);
	    }

	    fn.label = label;
	    lunr.Pipeline.registeredFunctions[fn.label] = fn;
	  };

	  /**
	   * Warns if the function is not registered as a Pipeline function.
	   *
	   * @param {Function} fn The function to check for.
	   * @private
	   * @memberOf Pipeline
	   */
	  lunr.Pipeline.warnIfFunctionNotRegistered = function (fn) {
	    var isRegistered = fn.label && fn.label in this.registeredFunctions;

	    if (!isRegistered) {
	      lunr.utils.warn('Function is not registered with pipeline. This may cause problems when serialising the index.\n', fn);
	    }
	  };

	  /**
	   * Loads a previously serialised pipeline.
	   *
	   * All functions to be loaded must already be registered with lunr.Pipeline.
	   * If any function from the serialised data has not been registered then an
	   * error will be thrown.
	   *
	   * @param {Object} serialised The serialised pipeline to load.
	   * @returns {lunr.Pipeline}
	   * @memberOf Pipeline
	   */
	  lunr.Pipeline.load = function (serialised) {
	    var pipeline = new lunr.Pipeline();

	    serialised.forEach(function (fnName) {
	      var fn = lunr.Pipeline.registeredFunctions[fnName];

	      if (fn) {
	        pipeline.add(fn);
	      } else {
	        throw new Error('Cannot load un-registered function: ' + fnName);
	      }
	    });

	    return pipeline;
	  };

	  /**
	   * Adds new functions to the end of the pipeline.
	   *
	   * Logs a warning if the function has not been registered.
	   *
	   * @param {Function} functions Any number of functions to add to the pipeline.
	   * @memberOf Pipeline
	   */
	  lunr.Pipeline.prototype.add = function () {
	    var fns = Array.prototype.slice.call(arguments);

	    fns.forEach(function (fn) {
	      lunr.Pipeline.warnIfFunctionNotRegistered(fn);
	      this._stack.push(fn);
	    }, this);
	  };

	  /**
	   * Adds a single function after a function that already exists in the
	   * pipeline.
	   *
	   * Logs a warning if the function has not been registered.
	   *
	   * @param {Function} existingFn A function that already exists in the pipeline.
	   * @param {Function} newFn The new function to add to the pipeline.
	   * @memberOf Pipeline
	   */
	  lunr.Pipeline.prototype.after = function (existingFn, newFn) {
	    lunr.Pipeline.warnIfFunctionNotRegistered(newFn);

	    var pos = this._stack.indexOf(existingFn);
	    if (pos == -1) {
	      throw new Error('Cannot find existingFn');
	    }

	    pos = pos + 1;
	    this._stack.splice(pos, 0, newFn);
	  };

	  /**
	   * Adds a single function before a function that already exists in the
	   * pipeline.
	   *
	   * Logs a warning if the function has not been registered.
	   *
	   * @param {Function} existingFn A function that already exists in the pipeline.
	   * @param {Function} newFn The new function to add to the pipeline.
	   * @memberOf Pipeline
	   */
	  lunr.Pipeline.prototype.before = function (existingFn, newFn) {
	    lunr.Pipeline.warnIfFunctionNotRegistered(newFn);

	    var pos = this._stack.indexOf(existingFn);
	    if (pos == -1) {
	      throw new Error('Cannot find existingFn');
	    }

	    this._stack.splice(pos, 0, newFn);
	  };

	  /**
	   * Removes a function from the pipeline.
	   *
	   * @param {Function} fn The function to remove from the pipeline.
	   * @memberOf Pipeline
	   */
	  lunr.Pipeline.prototype.remove = function (fn) {
	    var pos = this._stack.indexOf(fn);
	    if (pos == -1) {
	      return;
	    }

	    this._stack.splice(pos, 1);
	  };

	  /**
	   * Runs the current list of functions that make up the pipeline against the
	   * passed tokens.
	   *
	   * @param {Array} tokens The tokens to run through the pipeline.
	   * @returns {Array}
	   * @memberOf Pipeline
	   */
	  lunr.Pipeline.prototype.run = function (tokens) {
	    var out = [],
	        tokenLength = tokens.length,
	        stackLength = this._stack.length;

	    for (var i = 0; i < tokenLength; i++) {
	      var token = tokens[i];

	      for (var j = 0; j < stackLength; j++) {
	        token = this._stack[j](token, i, tokens);
	        if (token === void 0 || token === '') break;
	      };

	      if (token !== void 0 && token !== '') out.push(token);
	    };

	    return out;
	  };

	  /**
	   * Resets the pipeline by removing any existing processors.
	   *
	   * @memberOf Pipeline
	   */
	  lunr.Pipeline.prototype.reset = function () {
	    this._stack = [];
	  };

	  /**
	   * Returns a representation of the pipeline ready for serialisation.
	   *
	   * Logs a warning if the function has not been registered.
	   *
	   * @returns {Array}
	   * @memberOf Pipeline
	   */
	  lunr.Pipeline.prototype.toJSON = function () {
	    return this._stack.map(function (fn) {
	      lunr.Pipeline.warnIfFunctionNotRegistered(fn);

	      return fn.label;
	    });
	  };
	  /*!
	   * lunr.Vector
	   * Copyright (C) 2016 Oliver Nightingale
	   */

	  /**
	   * lunr.Vectors implement vector related operations for
	   * a series of elements.
	   *
	   * @constructor
	   */
	  lunr.Vector = function () {
	    this._magnitude = null;
	    this.list = undefined;
	    this.length = 0;
	  };

	  /**
	   * lunr.Vector.Node is a simple struct for each node
	   * in a lunr.Vector.
	   *
	   * @private
	   * @param {Number} The index of the node in the vector.
	   * @param {Object} The data at this node in the vector.
	   * @param {lunr.Vector.Node} The node directly after this node in the vector.
	   * @constructor
	   * @memberOf Vector
	   */
	  lunr.Vector.Node = function (idx, val, next) {
	    this.idx = idx;
	    this.val = val;
	    this.next = next;
	  };

	  /**
	   * Inserts a new value at a position in a vector.
	   *
	   * @param {Number} The index at which to insert a value.
	   * @param {Object} The object to insert in the vector.
	   * @memberOf Vector.
	   */
	  lunr.Vector.prototype.insert = function (idx, val) {
	    this._magnitude = undefined;
	    var list = this.list;

	    if (!list) {
	      this.list = new lunr.Vector.Node(idx, val, list);
	      return this.length++;
	    }

	    if (idx < list.idx) {
	      this.list = new lunr.Vector.Node(idx, val, list);
	      return this.length++;
	    }

	    var prev = list,
	        next = list.next;

	    while (next != undefined) {
	      if (idx < next.idx) {
	        prev.next = new lunr.Vector.Node(idx, val, next);
	        return this.length++;
	      }

	      prev = next, next = next.next;
	    }

	    prev.next = new lunr.Vector.Node(idx, val, next);
	    return this.length++;
	  };

	  /**
	   * Calculates the magnitude of this vector.
	   *
	   * @returns {Number}
	   * @memberOf Vector
	   */
	  lunr.Vector.prototype.magnitude = function () {
	    if (this._magnitude) return this._magnitude;
	    var node = this.list,
	        sumOfSquares = 0,
	        val;

	    while (node) {
	      val = node.val;
	      sumOfSquares += val * val;
	      node = node.next;
	    }

	    return this._magnitude = Math.sqrt(sumOfSquares);
	  };

	  /**
	   * Calculates the dot product of this vector and another vector.
	   *
	   * @param {lunr.Vector} otherVector The vector to compute the dot product with.
	   * @returns {Number}
	   * @memberOf Vector
	   */
	  lunr.Vector.prototype.dot = function (otherVector) {
	    var node = this.list,
	        otherNode = otherVector.list,
	        dotProduct = 0;

	    while (node && otherNode) {
	      if (node.idx < otherNode.idx) {
	        node = node.next;
	      } else if (node.idx > otherNode.idx) {
	        otherNode = otherNode.next;
	      } else {
	        dotProduct += node.val * otherNode.val;
	        node = node.next;
	        otherNode = otherNode.next;
	      }
	    }

	    return dotProduct;
	  };

	  /**
	   * Calculates the cosine similarity between this vector and another
	   * vector.
	   *
	   * @param {lunr.Vector} otherVector The other vector to calculate the
	   * similarity with.
	   * @returns {Number}
	   * @memberOf Vector
	   */
	  lunr.Vector.prototype.similarity = function (otherVector) {
	    return this.dot(otherVector) / (this.magnitude() * otherVector.magnitude());
	  };
	  /*!
	   * lunr.SortedSet
	   * Copyright (C) 2016 Oliver Nightingale
	   */

	  /**
	   * lunr.SortedSets are used to maintain an array of uniq values in a sorted
	   * order.
	   *
	   * @constructor
	   */
	  lunr.SortedSet = function () {
	    this.length = 0;
	    this.elements = [];
	  };

	  /**
	   * Loads a previously serialised sorted set.
	   *
	   * @param {Array} serialisedData The serialised set to load.
	   * @returns {lunr.SortedSet}
	   * @memberOf SortedSet
	   */
	  lunr.SortedSet.load = function (serialisedData) {
	    var set = new this();

	    set.elements = serialisedData;
	    set.length = serialisedData.length;

	    return set;
	  };

	  /**
	   * Inserts new items into the set in the correct position to maintain the
	   * order.
	   *
	   * @param {Object} The objects to add to this set.
	   * @memberOf SortedSet
	   */
	  lunr.SortedSet.prototype.add = function () {
	    var i, element;

	    for (i = 0; i < arguments.length; i++) {
	      element = arguments[i];
	      if (~this.indexOf(element)) continue;
	      this.elements.splice(this.locationFor(element), 0, element);
	    }

	    this.length = this.elements.length;
	  };

	  /**
	   * Converts this sorted set into an array.
	   *
	   * @returns {Array}
	   * @memberOf SortedSet
	   */
	  lunr.SortedSet.prototype.toArray = function () {
	    return this.elements.slice();
	  };

	  /**
	   * Creates a new array with the results of calling a provided function on every
	   * element in this sorted set.
	   *
	   * Delegates to Array.prototype.map and has the same signature.
	   *
	   * @param {Function} fn The function that is called on each element of the
	   * set.
	   * @param {Object} ctx An optional object that can be used as the context
	   * for the function fn.
	   * @returns {Array}
	   * @memberOf SortedSet
	   */
	  lunr.SortedSet.prototype.map = function (fn, ctx) {
	    return this.elements.map(fn, ctx);
	  };

	  /**
	   * Executes a provided function once per sorted set element.
	   *
	   * Delegates to Array.prototype.forEach and has the same signature.
	   *
	   * @param {Function} fn The function that is called on each element of the
	   * set.
	   * @param {Object} ctx An optional object that can be used as the context
	   * @memberOf SortedSet
	   * for the function fn.
	   */
	  lunr.SortedSet.prototype.forEach = function (fn, ctx) {
	    return this.elements.forEach(fn, ctx);
	  };

	  /**
	   * Returns the index at which a given element can be found in the
	   * sorted set, or -1 if it is not present.
	   *
	   * @param {Object} elem The object to locate in the sorted set.
	   * @returns {Number}
	   * @memberOf SortedSet
	   */
	  lunr.SortedSet.prototype.indexOf = function (elem) {
	    var start = 0,
	        end = this.elements.length,
	        sectionLength = end - start,
	        pivot = start + Math.floor(sectionLength / 2),
	        pivotElem = this.elements[pivot];

	    while (sectionLength > 1) {
	      if (pivotElem === elem) return pivot;

	      if (pivotElem < elem) start = pivot;
	      if (pivotElem > elem) end = pivot;

	      sectionLength = end - start;
	      pivot = start + Math.floor(sectionLength / 2);
	      pivotElem = this.elements[pivot];
	    }

	    if (pivotElem === elem) return pivot;

	    return -1;
	  };

	  /**
	   * Returns the position within the sorted set that an element should be
	   * inserted at to maintain the current order of the set.
	   *
	   * This function assumes that the element to search for does not already exist
	   * in the sorted set.
	   *
	   * @param {Object} elem The elem to find the position for in the set
	   * @returns {Number}
	   * @memberOf SortedSet
	   */
	  lunr.SortedSet.prototype.locationFor = function (elem) {
	    var start = 0,
	        end = this.elements.length,
	        sectionLength = end - start,
	        pivot = start + Math.floor(sectionLength / 2),
	        pivotElem = this.elements[pivot];

	    while (sectionLength > 1) {
	      if (pivotElem < elem) start = pivot;
	      if (pivotElem > elem) end = pivot;

	      sectionLength = end - start;
	      pivot = start + Math.floor(sectionLength / 2);
	      pivotElem = this.elements[pivot];
	    }

	    if (pivotElem > elem) return pivot;
	    if (pivotElem < elem) return pivot + 1;
	  };

	  /**
	   * Creates a new lunr.SortedSet that contains the elements in the intersection
	   * of this set and the passed set.
	   *
	   * @param {lunr.SortedSet} otherSet The set to intersect with this set.
	   * @returns {lunr.SortedSet}
	   * @memberOf SortedSet
	   */
	  lunr.SortedSet.prototype.intersect = function (otherSet) {
	    var intersectSet = new lunr.SortedSet(),
	        i = 0,
	        j = 0,
	        a_len = this.length,
	        b_len = otherSet.length,
	        a = this.elements,
	        b = otherSet.elements;

	    while (true) {
	      if (i > a_len - 1 || j > b_len - 1) break;

	      if (a[i] === b[j]) {
	        intersectSet.add(a[i]);
	        i++, j++;
	        continue;
	      }

	      if (a[i] < b[j]) {
	        i++;
	        continue;
	      }

	      if (a[i] > b[j]) {
	        j++;
	        continue;
	      }
	    };

	    return intersectSet;
	  };

	  /**
	   * Makes a copy of this set
	   *
	   * @returns {lunr.SortedSet}
	   * @memberOf SortedSet
	   */
	  lunr.SortedSet.prototype.clone = function () {
	    var clone = new lunr.SortedSet();

	    clone.elements = this.toArray();
	    clone.length = clone.elements.length;

	    return clone;
	  };

	  /**
	   * Creates a new lunr.SortedSet that contains the elements in the union
	   * of this set and the passed set.
	   *
	   * @param {lunr.SortedSet} otherSet The set to union with this set.
	   * @returns {lunr.SortedSet}
	   * @memberOf SortedSet
	   */
	  lunr.SortedSet.prototype.union = function (otherSet) {
	    var longSet, shortSet, unionSet;

	    if (this.length >= otherSet.length) {
	      longSet = this, shortSet = otherSet;
	    } else {
	      longSet = otherSet, shortSet = this;
	    }

	    unionSet = longSet.clone();

	    for (var i = 0, shortSetElements = shortSet.toArray(); i < shortSetElements.length; i++) {
	      unionSet.add(shortSetElements[i]);
	    }

	    return unionSet;
	  };

	  /**
	   * Returns a representation of the sorted set ready for serialisation.
	   *
	   * @returns {Array}
	   * @memberOf SortedSet
	   */
	  lunr.SortedSet.prototype.toJSON = function () {
	    return this.toArray();
	  };
	  /*!
	   * lunr.Index
	   * Copyright (C) 2016 Oliver Nightingale
	   */

	  /**
	   * lunr.Index is object that manages a search index.  It contains the indexes
	   * and stores all the tokens and document lookups.  It also provides the main
	   * user facing API for the library.
	   *
	   * @constructor
	   */
	  lunr.Index = function () {
	    this._fields = [];
	    this._ref = 'id';
	    this.pipeline = new lunr.Pipeline();
	    this.documentStore = new lunr.Store();
	    this.tokenStore = new lunr.TokenStore();
	    this.corpusTokens = new lunr.SortedSet();
	    this.eventEmitter = new lunr.EventEmitter();
	    this.tokenizerFn = lunr.tokenizer;

	    this._idfCache = {};

	    this.on('add', 'remove', 'update', function () {
	      this._idfCache = {};
	    }.bind(this));
	  };

	  /**
	   * Bind a handler to events being emitted by the index.
	   *
	   * The handler can be bound to many events at the same time.
	   *
	   * @param {String} [eventName] The name(s) of events to bind the function to.
	   * @param {Function} fn The serialised set to load.
	   * @memberOf Index
	   */
	  lunr.Index.prototype.on = function () {
	    var args = Array.prototype.slice.call(arguments);
	    return this.eventEmitter.addListener.apply(this.eventEmitter, args);
	  };

	  /**
	   * Removes a handler from an event being emitted by the index.
	   *
	   * @param {String} eventName The name of events to remove the function from.
	   * @param {Function} fn The serialised set to load.
	   * @memberOf Index
	   */
	  lunr.Index.prototype.off = function (name, fn) {
	    return this.eventEmitter.removeListener(name, fn);
	  };

	  /**
	   * Loads a previously serialised index.
	   *
	   * Issues a warning if the index being imported was serialised
	   * by a different version of lunr.
	   *
	   * @param {Object} serialisedData The serialised set to load.
	   * @returns {lunr.Index}
	   * @memberOf Index
	   */
	  lunr.Index.load = function (serialisedData) {
	    if (serialisedData.version !== lunr.version) {
	      lunr.utils.warn('version mismatch: current ' + lunr.version + ' importing ' + serialisedData.version);
	    }

	    var idx = new this();

	    idx._fields = serialisedData.fields;
	    idx._ref = serialisedData.ref;

	    idx.tokenizer(lunr.tokenizer.load(serialisedData.tokenizer));
	    idx.documentStore = lunr.Store.load(serialisedData.documentStore);
	    idx.tokenStore = lunr.TokenStore.load(serialisedData.tokenStore);
	    idx.corpusTokens = lunr.SortedSet.load(serialisedData.corpusTokens);
	    idx.pipeline = lunr.Pipeline.load(serialisedData.pipeline);

	    return idx;
	  };

	  /**
	   * Adds a field to the list of fields that will be searchable within documents
	   * in the index.
	   *
	   * An optional boost param can be passed to affect how much tokens in this field
	   * rank in search results, by default the boost value is 1.
	   *
	   * Fields should be added before any documents are added to the index, fields
	   * that are added after documents are added to the index will only apply to new
	   * documents added to the index.
	   *
	   * @param {String} fieldName The name of the field within the document that
	   * should be indexed
	   * @param {Number} boost An optional boost that can be applied to terms in this
	   * field.
	   * @returns {lunr.Index}
	   * @memberOf Index
	   */
	  lunr.Index.prototype.field = function (fieldName, opts) {
	    var opts = opts || {},
	        field = { name: fieldName, boost: opts.boost || 1 };

	    this._fields.push(field);
	    return this;
	  };

	  /**
	   * Sets the property used to uniquely identify documents added to the index,
	   * by default this property is 'id'.
	   *
	   * This should only be changed before adding documents to the index, changing
	   * the ref property without resetting the index can lead to unexpected results.
	   *
	   * The value of ref can be of any type but it _must_ be stably comparable and
	   * orderable.
	   *
	   * @param {String} refName The property to use to uniquely identify the
	   * documents in the index.
	   * @param {Boolean} emitEvent Whether to emit add events, defaults to true
	   * @returns {lunr.Index}
	   * @memberOf Index
	   */
	  lunr.Index.prototype.ref = function (refName) {
	    this._ref = refName;
	    return this;
	  };

	  /**
	   * Sets the tokenizer used for this index.
	   *
	   * By default the index will use the default tokenizer, lunr.tokenizer. The tokenizer
	   * should only be changed before adding documents to the index. Changing the tokenizer
	   * without re-building the index can lead to unexpected results.
	   *
	   * @param {Function} fn The function to use as a tokenizer.
	   * @returns {lunr.Index}
	   * @memberOf Index
	   */
	  lunr.Index.prototype.tokenizer = function (fn) {
	    var isRegistered = fn.label && fn.label in lunr.tokenizer.registeredFunctions;

	    if (!isRegistered) {
	      lunr.utils.warn('Function is not a registered tokenizer. This may cause problems when serialising the index');
	    }

	    this.tokenizerFn = fn;
	    return this;
	  };

	  /**
	   * Add a document to the index.
	   *
	   * This is the way new documents enter the index, this function will run the
	   * fields from the document through the index's pipeline and then add it to
	   * the index, it will then show up in search results.
	   *
	   * An 'add' event is emitted with the document that has been added and the index
	   * the document has been added to. This event can be silenced by passing false
	   * as the second argument to add.
	   *
	   * @param {Object} doc The document to add to the index.
	   * @param {Boolean} emitEvent Whether or not to emit events, default true.
	   * @memberOf Index
	   */
	  lunr.Index.prototype.add = function (doc, emitEvent) {
	    var docTokens = {},
	        allDocumentTokens = new lunr.SortedSet(),
	        docRef = doc[this._ref],
	        emitEvent = emitEvent === undefined ? true : emitEvent;

	    this._fields.forEach(function (field) {
	      var fieldTokens = this.pipeline.run(this.tokenizerFn(doc[field.name]));

	      docTokens[field.name] = fieldTokens;

	      for (var i = 0; i < fieldTokens.length; i++) {
	        var token = fieldTokens[i];
	        allDocumentTokens.add(token);
	        this.corpusTokens.add(token);
	      }
	    }, this);

	    this.documentStore.set(docRef, allDocumentTokens);

	    for (var i = 0; i < allDocumentTokens.length; i++) {
	      var token = allDocumentTokens.elements[i];
	      var tf = 0;

	      for (var j = 0; j < this._fields.length; j++) {
	        var field = this._fields[j];
	        var fieldTokens = docTokens[field.name];
	        var fieldLength = fieldTokens.length;

	        if (!fieldLength) continue;

	        var tokenCount = 0;
	        for (var k = 0; k < fieldLength; k++) {
	          if (fieldTokens[k] === token) {
	            tokenCount++;
	          }
	        }

	        tf += tokenCount / fieldLength * field.boost;
	      }

	      this.tokenStore.add(token, { ref: docRef, tf: tf });
	    };

	    if (emitEvent) this.eventEmitter.emit('add', doc, this);
	  };

	  /**
	   * Removes a document from the index.
	   *
	   * To make sure documents no longer show up in search results they can be
	   * removed from the index using this method.
	   *
	   * The document passed only needs to have the same ref property value as the
	   * document that was added to the index, they could be completely different
	   * objects.
	   *
	   * A 'remove' event is emitted with the document that has been removed and the index
	   * the document has been removed from. This event can be silenced by passing false
	   * as the second argument to remove.
	   *
	   * @param {Object} doc The document to remove from the index.
	   * @param {Boolean} emitEvent Whether to emit remove events, defaults to true
	   * @memberOf Index
	   */
	  lunr.Index.prototype.remove = function (doc, emitEvent) {
	    var docRef = doc[this._ref],
	        emitEvent = emitEvent === undefined ? true : emitEvent;

	    if (!this.documentStore.has(docRef)) return;

	    var docTokens = this.documentStore.get(docRef);

	    this.documentStore.remove(docRef);

	    docTokens.forEach(function (token) {
	      this.tokenStore.remove(token, docRef);
	    }, this);

	    if (emitEvent) this.eventEmitter.emit('remove', doc, this);
	  };

	  /**
	   * Updates a document in the index.
	   *
	   * When a document contained within the index gets updated, fields changed,
	   * added or removed, to make sure it correctly matched against search queries,
	   * it should be updated in the index.
	   *
	   * This method is just a wrapper around `remove` and `add`
	   *
	   * An 'update' event is emitted with the document that has been updated and the index.
	   * This event can be silenced by passing false as the second argument to update. Only
	   * an update event will be fired, the 'add' and 'remove' events of the underlying calls
	   * are silenced.
	   *
	   * @param {Object} doc The document to update in the index.
	   * @param {Boolean} emitEvent Whether to emit update events, defaults to true
	   * @see Index.prototype.remove
	   * @see Index.prototype.add
	   * @memberOf Index
	   */
	  lunr.Index.prototype.update = function (doc, emitEvent) {
	    var emitEvent = emitEvent === undefined ? true : emitEvent;

	    this.remove(doc, false);
	    this.add(doc, false);

	    if (emitEvent) this.eventEmitter.emit('update', doc, this);
	  };

	  /**
	   * Calculates the inverse document frequency for a token within the index.
	   *
	   * @param {String} token The token to calculate the idf of.
	   * @see Index.prototype.idf
	   * @private
	   * @memberOf Index
	   */
	  lunr.Index.prototype.idf = function (term) {
	    var cacheKey = "@" + term;
	    if (Object.prototype.hasOwnProperty.call(this._idfCache, cacheKey)) return this._idfCache[cacheKey];

	    var documentFrequency = this.tokenStore.count(term),
	        idf = 1;

	    if (documentFrequency > 0) {
	      idf = 1 + Math.log(this.documentStore.length / documentFrequency);
	    }

	    return this._idfCache[cacheKey] = idf;
	  };

	  /**
	   * Searches the index using the passed query.
	   *
	   * Queries should be a string, multiple words are allowed and will lead to an
	   * AND based query, e.g. `idx.search('foo bar')` will run a search for
	   * documents containing both 'foo' and 'bar'.
	   *
	   * All query tokens are passed through the same pipeline that document tokens
	   * are passed through, so any language processing involved will be run on every
	   * query term.
	   *
	   * Each query term is expanded, so that the term 'he' might be expanded to
	   * 'hello' and 'help' if those terms were already included in the index.
	   *
	   * Matching documents are returned as an array of objects, each object contains
	   * the matching document ref, as set for this index, and the similarity score
	   * for this document against the query.
	   *
	   * @param {String} query The query to search the index with.
	   * @returns {Object}
	   * @see Index.prototype.idf
	   * @see Index.prototype.documentVector
	   * @memberOf Index
	   */
	  lunr.Index.prototype.search = function (query) {
	    var queryTokens = this.pipeline.run(this.tokenizerFn(query)),
	        queryVector = new lunr.Vector(),
	        documentSets = [],
	        fieldBoosts = this._fields.reduce(function (memo, f) {
	      return memo + f.boost;
	    }, 0);

	    var hasSomeToken = queryTokens.some(function (token) {
	      return this.tokenStore.has(token);
	    }, this);

	    if (!hasSomeToken) return [];

	    queryTokens.forEach(function (token, i, tokens) {
	      var tf = 1 / tokens.length * this._fields.length * fieldBoosts,
	          self = this;

	      var set = this.tokenStore.expand(token).reduce(function (memo, key) {
	        var pos = self.corpusTokens.indexOf(key),
	            idf = self.idf(key),
	            similarityBoost = 1,
	            set = new lunr.SortedSet();

	        // if the expanded key is not an exact match to the token then
	        // penalise the score for this key by how different the key is
	        // to the token.
	        if (key !== token) {
	          var diff = Math.max(3, key.length - token.length);
	          similarityBoost = 1 / Math.log(diff);
	        }

	        // calculate the query tf-idf score for this token
	        // applying an similarityBoost to ensure exact matches
	        // these rank higher than expanded terms
	        if (pos > -1) queryVector.insert(pos, tf * idf * similarityBoost);

	        // add all the documents that have this key into a set
	        // ensuring that the type of key is preserved
	        var matchingDocuments = self.tokenStore.get(key),
	            refs = Object.keys(matchingDocuments),
	            refsLen = refs.length;

	        for (var i = 0; i < refsLen; i++) {
	          set.add(matchingDocuments[refs[i]].ref);
	        }

	        return memo.union(set);
	      }, new lunr.SortedSet());

	      documentSets.push(set);
	    }, this);

	    var documentSet = documentSets.reduce(function (memo, set) {
	      return memo.intersect(set);
	    });

	    return documentSet.map(function (ref) {
	      return { ref: ref, score: queryVector.similarity(this.documentVector(ref)) };
	    }, this).sort(function (a, b) {
	      return b.score - a.score;
	    });
	  };

	  /**
	   * Generates a vector containing all the tokens in the document matching the
	   * passed documentRef.
	   *
	   * The vector contains the tf-idf score for each token contained in the
	   * document with the passed documentRef.  The vector will contain an element
	   * for every token in the indexes corpus, if the document does not contain that
	   * token the element will be 0.
	   *
	   * @param {Object} documentRef The ref to find the document with.
	   * @returns {lunr.Vector}
	   * @private
	   * @memberOf Index
	   */
	  lunr.Index.prototype.documentVector = function (documentRef) {
	    var documentTokens = this.documentStore.get(documentRef),
	        documentTokensLength = documentTokens.length,
	        documentVector = new lunr.Vector();

	    for (var i = 0; i < documentTokensLength; i++) {
	      var token = documentTokens.elements[i],
	          tf = this.tokenStore.get(token)[documentRef].tf,
	          idf = this.idf(token);

	      documentVector.insert(this.corpusTokens.indexOf(token), tf * idf);
	    };

	    return documentVector;
	  };

	  /**
	   * Returns a representation of the index ready for serialisation.
	   *
	   * @returns {Object}
	   * @memberOf Index
	   */
	  lunr.Index.prototype.toJSON = function () {
	    return {
	      version: lunr.version,
	      fields: this._fields,
	      ref: this._ref,
	      tokenizer: this.tokenizerFn.label,
	      documentStore: this.documentStore.toJSON(),
	      tokenStore: this.tokenStore.toJSON(),
	      corpusTokens: this.corpusTokens.toJSON(),
	      pipeline: this.pipeline.toJSON()
	    };
	  };

	  /**
	   * Applies a plugin to the current index.
	   *
	   * A plugin is a function that is called with the index as its context.
	   * Plugins can be used to customise or extend the behaviour the index
	   * in some way. A plugin is just a function, that encapsulated the custom
	   * behaviour that should be applied to the index.
	   *
	   * The plugin function will be called with the index as its argument, additional
	   * arguments can also be passed when calling use. The function will be called
	   * with the index as its context.
	   *
	   * Example:
	   *
	   *     var myPlugin = function (idx, arg1, arg2) {
	   *       // `this` is the index to be extended
	   *       // apply any extensions etc here.
	   *     }
	   *
	   *     var idx = lunr(function () {
	   *       this.use(myPlugin, 'arg1', 'arg2')
	   *     })
	   *
	   * @param {Function} plugin The plugin to apply.
	   * @memberOf Index
	   */
	  lunr.Index.prototype.use = function (plugin) {
	    var args = Array.prototype.slice.call(arguments, 1);
	    args.unshift(this);
	    plugin.apply(this, args);
	  };
	  /*!
	   * lunr.Store
	   * Copyright (C) 2016 Oliver Nightingale
	   */

	  /**
	   * lunr.Store is a simple key-value store used for storing sets of tokens for
	   * documents stored in index.
	   *
	   * @constructor
	   * @module
	   */
	  lunr.Store = function () {
	    this.store = {};
	    this.length = 0;
	  };

	  /**
	   * Loads a previously serialised store
	   *
	   * @param {Object} serialisedData The serialised store to load.
	   * @returns {lunr.Store}
	   * @memberOf Store
	   */
	  lunr.Store.load = function (serialisedData) {
	    var store = new this();

	    store.length = serialisedData.length;
	    store.store = Object.keys(serialisedData.store).reduce(function (memo, key) {
	      memo[key] = lunr.SortedSet.load(serialisedData.store[key]);
	      return memo;
	    }, {});

	    return store;
	  };

	  /**
	   * Stores the given tokens in the store against the given id.
	   *
	   * @param {Object} id The key used to store the tokens against.
	   * @param {Object} tokens The tokens to store against the key.
	   * @memberOf Store
	   */
	  lunr.Store.prototype.set = function (id, tokens) {
	    if (!this.has(id)) this.length++;
	    this.store[id] = tokens;
	  };

	  /**
	   * Retrieves the tokens from the store for a given key.
	   *
	   * @param {Object} id The key to lookup and retrieve from the store.
	   * @returns {Object}
	   * @memberOf Store
	   */
	  lunr.Store.prototype.get = function (id) {
	    return this.store[id];
	  };

	  /**
	   * Checks whether the store contains a key.
	   *
	   * @param {Object} id The id to look up in the store.
	   * @returns {Boolean}
	   * @memberOf Store
	   */
	  lunr.Store.prototype.has = function (id) {
	    return id in this.store;
	  };

	  /**
	   * Removes the value for a key in the store.
	   *
	   * @param {Object} id The id to remove from the store.
	   * @memberOf Store
	   */
	  lunr.Store.prototype.remove = function (id) {
	    if (!this.has(id)) return;

	    delete this.store[id];
	    this.length--;
	  };

	  /**
	   * Returns a representation of the store ready for serialisation.
	   *
	   * @returns {Object}
	   * @memberOf Store
	   */
	  lunr.Store.prototype.toJSON = function () {
	    return {
	      store: this.store,
	      length: this.length
	    };
	  };

	  /*!
	   * lunr.stemmer
	   * Copyright (C) 2016 Oliver Nightingale
	   * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
	   */

	  /**
	   * lunr.stemmer is an english language stemmer, this is a JavaScript
	   * implementation of the PorterStemmer taken from http://tartarus.org/~martin
	   *
	   * @module
	   * @param {String} str The string to stem
	   * @returns {String}
	   * @see lunr.Pipeline
	   */
	  lunr.stemmer = function () {
	    var step2list = {
	      "ational": "ate",
	      "tional": "tion",
	      "enci": "ence",
	      "anci": "ance",
	      "izer": "ize",
	      "bli": "ble",
	      "alli": "al",
	      "entli": "ent",
	      "eli": "e",
	      "ousli": "ous",
	      "ization": "ize",
	      "ation": "ate",
	      "ator": "ate",
	      "alism": "al",
	      "iveness": "ive",
	      "fulness": "ful",
	      "ousness": "ous",
	      "aliti": "al",
	      "iviti": "ive",
	      "biliti": "ble",
	      "logi": "log"
	    },
	        step3list = {
	      "icate": "ic",
	      "ative": "",
	      "alize": "al",
	      "iciti": "ic",
	      "ical": "ic",
	      "ful": "",
	      "ness": ""
	    },
	        c = "[^aeiou]",
	        // consonant
	    v = "[aeiouy]",
	        // vowel
	    C = c + "[^aeiouy]*",
	        // consonant sequence
	    V = v + "[aeiou]*",
	        // vowel sequence

	    mgr0 = "^(" + C + ")?" + V + C,
	        // [C]VC... is m>0
	    meq1 = "^(" + C + ")?" + V + C + "(" + V + ")?$",
	        // [C]VC[V] is m=1
	    mgr1 = "^(" + C + ")?" + V + C + V + C,
	        // [C]VCVC... is m>1
	    s_v = "^(" + C + ")?" + v; // vowel in stem

	    var re_mgr0 = new RegExp(mgr0);
	    var re_mgr1 = new RegExp(mgr1);
	    var re_meq1 = new RegExp(meq1);
	    var re_s_v = new RegExp(s_v);

	    var re_1a = /^(.+?)(ss|i)es$/;
	    var re2_1a = /^(.+?)([^s])s$/;
	    var re_1b = /^(.+?)eed$/;
	    var re2_1b = /^(.+?)(ed|ing)$/;
	    var re_1b_2 = /.$/;
	    var re2_1b_2 = /(at|bl|iz)$/;
	    var re3_1b_2 = new RegExp("([^aeiouylsz])\\1$");
	    var re4_1b_2 = new RegExp("^" + C + v + "[^aeiouwxy]$");

	    var re_1c = /^(.+?[^aeiou])y$/;
	    var re_2 = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;

	    var re_3 = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;

	    var re_4 = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
	    var re2_4 = /^(.+?)(s|t)(ion)$/;

	    var re_5 = /^(.+?)e$/;
	    var re_5_1 = /ll$/;
	    var re3_5 = new RegExp("^" + C + v + "[^aeiouwxy]$");

	    var porterStemmer = function porterStemmer(w) {
	      var stem, suffix, firstch, re, re2, re3, re4;

	      if (w.length < 3) {
	        return w;
	      }

	      firstch = w.substr(0, 1);
	      if (firstch == "y") {
	        w = firstch.toUpperCase() + w.substr(1);
	      }

	      // Step 1a
	      re = re_1a;
	      re2 = re2_1a;

	      if (re.test(w)) {
	        w = w.replace(re, "$1$2");
	      } else if (re2.test(w)) {
	        w = w.replace(re2, "$1$2");
	      }

	      // Step 1b
	      re = re_1b;
	      re2 = re2_1b;
	      if (re.test(w)) {
	        var fp = re.exec(w);
	        re = re_mgr0;
	        if (re.test(fp[1])) {
	          re = re_1b_2;
	          w = w.replace(re, "");
	        }
	      } else if (re2.test(w)) {
	        var fp = re2.exec(w);
	        stem = fp[1];
	        re2 = re_s_v;
	        if (re2.test(stem)) {
	          w = stem;
	          re2 = re2_1b_2;
	          re3 = re3_1b_2;
	          re4 = re4_1b_2;
	          if (re2.test(w)) {
	            w = w + "e";
	          } else if (re3.test(w)) {
	            re = re_1b_2;w = w.replace(re, "");
	          } else if (re4.test(w)) {
	            w = w + "e";
	          }
	        }
	      }

	      // Step 1c - replace suffix y or Y by i if preceded by a non-vowel which is not the first letter of the word (so cry -> cri, by -> by, say -> say)
	      re = re_1c;
	      if (re.test(w)) {
	        var fp = re.exec(w);
	        stem = fp[1];
	        w = stem + "i";
	      }

	      // Step 2
	      re = re_2;
	      if (re.test(w)) {
	        var fp = re.exec(w);
	        stem = fp[1];
	        suffix = fp[2];
	        re = re_mgr0;
	        if (re.test(stem)) {
	          w = stem + step2list[suffix];
	        }
	      }

	      // Step 3
	      re = re_3;
	      if (re.test(w)) {
	        var fp = re.exec(w);
	        stem = fp[1];
	        suffix = fp[2];
	        re = re_mgr0;
	        if (re.test(stem)) {
	          w = stem + step3list[suffix];
	        }
	      }

	      // Step 4
	      re = re_4;
	      re2 = re2_4;
	      if (re.test(w)) {
	        var fp = re.exec(w);
	        stem = fp[1];
	        re = re_mgr1;
	        if (re.test(stem)) {
	          w = stem;
	        }
	      } else if (re2.test(w)) {
	        var fp = re2.exec(w);
	        stem = fp[1] + fp[2];
	        re2 = re_mgr1;
	        if (re2.test(stem)) {
	          w = stem;
	        }
	      }

	      // Step 5
	      re = re_5;
	      if (re.test(w)) {
	        var fp = re.exec(w);
	        stem = fp[1];
	        re = re_mgr1;
	        re2 = re_meq1;
	        re3 = re3_5;
	        if (re.test(stem) || re2.test(stem) && !re3.test(stem)) {
	          w = stem;
	        }
	      }

	      re = re_5_1;
	      re2 = re_mgr1;
	      if (re.test(w) && re2.test(w)) {
	        re = re_1b_2;
	        w = w.replace(re, "");
	      }

	      // and turn initial Y back to y

	      if (firstch == "y") {
	        w = firstch.toLowerCase() + w.substr(1);
	      }

	      return w;
	    };

	    return porterStemmer;
	  }();

	  lunr.Pipeline.registerFunction(lunr.stemmer, 'stemmer');
	  /*!
	   * lunr.stopWordFilter
	   * Copyright (C) 2016 Oliver Nightingale
	   */

	  /**
	   * lunr.generateStopWordFilter builds a stopWordFilter function from the provided
	   * list of stop words.
	   *
	   * The built in lunr.stopWordFilter is built using this generator and can be used
	   * to generate custom stopWordFilters for applications or non English languages.
	   *
	   * @module
	   * @param {Array} token The token to pass through the filter
	   * @returns {Function}
	   * @see lunr.Pipeline
	   * @see lunr.stopWordFilter
	   */
	  lunr.generateStopWordFilter = function (stopWords) {
	    var words = stopWords.reduce(function (memo, stopWord) {
	      memo[stopWord] = stopWord;
	      return memo;
	    }, {});

	    return function (token) {
	      if (token && words[token] !== token) return token;
	    };
	  };

	  /**
	   * lunr.stopWordFilter is an English language stop word list filter, any words
	   * contained in the list will not be passed through the filter.
	   *
	   * This is intended to be used in the Pipeline. If the token does not pass the
	   * filter then undefined will be returned.
	   *
	   * @module
	   * @param {String} token The token to pass through the filter
	   * @returns {String}
	   * @see lunr.Pipeline
	   */
	  lunr.stopWordFilter = lunr.generateStopWordFilter(['a', 'able', 'about', 'across', 'after', 'all', 'almost', 'also', 'am', 'among', 'an', 'and', 'any', 'are', 'as', 'at', 'be', 'because', 'been', 'but', 'by', 'can', 'cannot', 'could', 'dear', 'did', 'do', 'does', 'either', 'else', 'ever', 'every', 'for', 'from', 'get', 'got', 'had', 'has', 'have', 'he', 'her', 'hers', 'him', 'his', 'how', 'however', 'i', 'if', 'in', 'into', 'is', 'it', 'its', 'just', 'least', 'let', 'like', 'likely', 'may', 'me', 'might', 'most', 'must', 'my', 'neither', 'no', 'nor', 'not', 'of', 'off', 'often', 'on', 'only', 'or', 'other', 'our', 'own', 'rather', 'said', 'say', 'says', 'she', 'should', 'since', 'so', 'some', 'than', 'that', 'the', 'their', 'them', 'then', 'there', 'these', 'they', 'this', 'tis', 'to', 'too', 'twas', 'us', 'wants', 'was', 'we', 'were', 'what', 'when', 'where', 'which', 'while', 'who', 'whom', 'why', 'will', 'with', 'would', 'yet', 'you', 'your']);

	  lunr.Pipeline.registerFunction(lunr.stopWordFilter, 'stopWordFilter');
	  /*!
	   * lunr.trimmer
	   * Copyright (C) 2016 Oliver Nightingale
	   */

	  /**
	   * lunr.trimmer is a pipeline function for trimming non word
	   * characters from the begining and end of tokens before they
	   * enter the index.
	   *
	   * This implementation may not work correctly for non latin
	   * characters and should either be removed or adapted for use
	   * with languages with non-latin characters.
	   *
	   * @module
	   * @param {String} token The token to pass through the filter
	   * @returns {String}
	   * @see lunr.Pipeline
	   */
	  lunr.trimmer = function (token) {
	    return token.replace(/^\W+/, '').replace(/\W+$/, '');
	  };

	  lunr.Pipeline.registerFunction(lunr.trimmer, 'trimmer');
	  /*!
	   * lunr.stemmer
	   * Copyright (C) 2016 Oliver Nightingale
	   * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
	   */

	  /**
	   * lunr.TokenStore is used for efficient storing and lookup of the reverse
	   * index of token to document ref.
	   *
	   * @constructor
	   */
	  lunr.TokenStore = function () {
	    this.root = { docs: {} };
	    this.length = 0;
	  };

	  /**
	   * Loads a previously serialised token store
	   *
	   * @param {Object} serialisedData The serialised token store to load.
	   * @returns {lunr.TokenStore}
	   * @memberOf TokenStore
	   */
	  lunr.TokenStore.load = function (serialisedData) {
	    var store = new this();

	    store.root = serialisedData.root;
	    store.length = serialisedData.length;

	    return store;
	  };

	  /**
	   * Adds a new token doc pair to the store.
	   *
	   * By default this function starts at the root of the current store, however
	   * it can start at any node of any token store if required.
	   *
	   * @param {String} token The token to store the doc under
	   * @param {Object} doc The doc to store against the token
	   * @param {Object} root An optional node at which to start looking for the
	   * correct place to enter the doc, by default the root of this lunr.TokenStore
	   * is used.
	   * @memberOf TokenStore
	   */
	  lunr.TokenStore.prototype.add = function (token, doc, root) {
	    var root = root || this.root,
	        key = token.charAt(0),
	        rest = token.slice(1);

	    if (!(key in root)) root[key] = { docs: {} };

	    if (rest.length === 0) {
	      root[key].docs[doc.ref] = doc;
	      this.length += 1;
	      return;
	    } else {
	      return this.add(rest, doc, root[key]);
	    }
	  };

	  /**
	   * Checks whether this key is contained within this lunr.TokenStore.
	   *
	   * By default this function starts at the root of the current store, however
	   * it can start at any node of any token store if required.
	   *
	   * @param {String} token The token to check for
	   * @param {Object} root An optional node at which to start
	   * @memberOf TokenStore
	   */
	  lunr.TokenStore.prototype.has = function (token) {
	    if (!token) return false;

	    var node = this.root;

	    for (var i = 0; i < token.length; i++) {
	      if (!node[token.charAt(i)]) return false;

	      node = node[token.charAt(i)];
	    }

	    return true;
	  };

	  /**
	   * Retrieve a node from the token store for a given token.
	   *
	   * By default this function starts at the root of the current store, however
	   * it can start at any node of any token store if required.
	   *
	   * @param {String} token The token to get the node for.
	   * @param {Object} root An optional node at which to start.
	   * @returns {Object}
	   * @see TokenStore.prototype.get
	   * @memberOf TokenStore
	   */
	  lunr.TokenStore.prototype.getNode = function (token) {
	    if (!token) return {};

	    var node = this.root;

	    for (var i = 0; i < token.length; i++) {
	      if (!node[token.charAt(i)]) return {};

	      node = node[token.charAt(i)];
	    }

	    return node;
	  };

	  /**
	   * Retrieve the documents for a node for the given token.
	   *
	   * By default this function starts at the root of the current store, however
	   * it can start at any node of any token store if required.
	   *
	   * @param {String} token The token to get the documents for.
	   * @param {Object} root An optional node at which to start.
	   * @returns {Object}
	   * @memberOf TokenStore
	   */
	  lunr.TokenStore.prototype.get = function (token, root) {
	    return this.getNode(token, root).docs || {};
	  };

	  lunr.TokenStore.prototype.count = function (token, root) {
	    return Object.keys(this.get(token, root)).length;
	  };

	  /**
	   * Remove the document identified by ref from the token in the store.
	   *
	   * By default this function starts at the root of the current store, however
	   * it can start at any node of any token store if required.
	   *
	   * @param {String} token The token to get the documents for.
	   * @param {String} ref The ref of the document to remove from this token.
	   * @param {Object} root An optional node at which to start.
	   * @returns {Object}
	   * @memberOf TokenStore
	   */
	  lunr.TokenStore.prototype.remove = function (token, ref) {
	    if (!token) return;
	    var node = this.root;

	    for (var i = 0; i < token.length; i++) {
	      if (!(token.charAt(i) in node)) return;
	      node = node[token.charAt(i)];
	    }

	    delete node.docs[ref];
	  };

	  /**
	   * Find all the possible suffixes of the passed token using tokens
	   * currently in the store.
	   *
	   * @param {String} token The token to expand.
	   * @returns {Array}
	   * @memberOf TokenStore
	   */
	  lunr.TokenStore.prototype.expand = function (token, memo) {
	    var root = this.getNode(token),
	        docs = root.docs || {},
	        memo = memo || [];

	    if (Object.keys(docs).length) memo.push(token);

	    Object.keys(root).forEach(function (key) {
	      if (key === 'docs') return;

	      memo.concat(this.expand(token + key, memo));
	    }, this);

	    return memo;
	  };

	  /**
	   * Returns a representation of the token store ready for serialisation.
	   *
	   * @returns {Object}
	   * @memberOf TokenStore
	   */
	  lunr.TokenStore.prototype.toJSON = function () {
	    return {
	      root: this.root,
	      length: this.length
	    };
	  }

	  /**
	   * export the module via AMD, CommonJS or as a browser global
	   * Export code from https://github.com/umdjs/umd/blob/master/returnExports.js
	   */
	  ;(function (root, factory) {
	    if (true) {
	      // AMD. Register as an anonymous module.
	      !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
	      /**
	       * Node. Does not work with strict CommonJS, but
	       * only CommonJS-like enviroments that support module.exports,
	       * like Node.
	       */
	      module.exports = factory();
	    } else {
	      // Browser globals (root is window)
	      root.lunr = factory();
	    }
	  })(this, function () {
	    /**
	     * Just return a value to define the module export.
	     * This example returns an object, but the module
	     * can return a function as the exported value.
	     */
	    return lunr;
	  });
	})();

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

	var Lock = function () {

	  /**
	   * Lock body for full-screen search bar
	   *
	   * @constructor
	   * @param {(string|HTMLElement)} el - Selector or HTML element
	   * @param {Function} handler - Callback to execute in active search mode
	   */
	  function Lock(el, handler) {
	    var _this = this;

	    _classCallCheck(this, Lock);

	    this.el_ = typeof el === "string" ? document.querySelector(el) : el;

	    /* Initialize page y-offset and callback */
	    this.offset_ = 0;
	    this.handler_ = handler;

	    /* Dispatch update on next repaint */
	    this.handler_ = function (ev) {
	      _this.update(ev);
	    };
	  }

	  /**
	   * Update state
	   *
	   * @param {Event} ev - Event
	   */


	  _createClass(Lock, [{
	    key: "update",
	    value: function update(ev) {
	      var _this2 = this;

	      /* Entering search mode */
	      if (ev.target.checked) {
	        this.offset_ = window.scrollY;

	        /* First timeout: scroll to top after transition, to omit flickering */
	        setTimeout(function () {
	          window.scrollTo(0, 0);
	        }, 400);

	        /* Second timeout: Lock body after finishing transition and scrolling
	           to top and focus input field. Sadly, the focus event is not dispatched
	           on iOS Safari and there's nothing we can do about it. */
	        setTimeout(function () {

	          /* This additional check is necessary to handle fast subsequent clicks
	             on the toggle and the timeout to lock the body must be cancelled */
	          if (ev.target.checked) {
	            document.body.dataset.mdLocked = "";
	            setTimeout(_this2.handler_, 200);
	          }
	        }, 400);

	        /* Exiting search mode */
	      } else {
	        delete document.body.dataset.mdLocked;

	        /* Scroll to former position, but wait for 100ms to prevent flashes on
	           iOS. A short timeout seems to do the trick */
	        setTimeout(function () {
	          window.scrollTo(0, _this2.offset_);
	        }, 100);
	      }
	    }

	    /**
	     * Reset state
	     *
	     * @param {Event} ev - Event
	     */

	  }, {
	    key: "reset",
	    value: function reset() {
	      delete document.body.dataset.mdLocked;
	      window.scrollTo(0, this.offset_);
	    }

	    /**
	     * Register listener for all relevant events
	     */

	  }, {
	    key: "listen",
	    value: function listen() {
	      var _this3 = this;

	      ["change"].forEach(function (name) {
	        _this3.el_.addEventListener(name, _this3.handler_, false);
	      });
	    }

	    /**
	     * Unregister listener for all relevant events
	     */

	  }, {
	    key: "unlisten",
	    value: function unlisten() {
	      var _this4 = this;

	      ["change"].forEach(function (name) {
	        _this4.el_.removeEventListener(name, _this4.handler_, false);
	      });

	      /* Final reset */
	      this.reset();
	    }
	  }]);

	  return Lock;
	}();

	exports.default = Lock;
	module.exports = exports["default"];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Toggle = __webpack_require__(16);

	var _Toggle2 = _interopRequireDefault(_Toggle);

	var _Viewport = __webpack_require__(18);

	var _Viewport2 = _interopRequireDefault(_Viewport);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* ----------------------------------------------------------------------------
	 * Module
	 * ------------------------------------------------------------------------- */

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

	exports.default = {
	  Toggle: _Toggle2.default,
	  Viewport: _Viewport2.default
	};
	module.exports = exports["default"];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Abstract2 = __webpack_require__(17);

	var _Abstract3 = _interopRequireDefault(_Abstract2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
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

	var Toggle = function (_Abstract) {
	  _inherits(Toggle, _Abstract);

	  /**
	   * Listener which monitors state changes of a toggle
	   *
	   * @constructor
	   * @param {(string|HTMLElement)} el - Selector or HTML element
	   * @param {Function} handler - Event handler to execute
	   */
	  function Toggle(el, handler) {
	    _classCallCheck(this, Toggle);

	    return _possibleConstructorReturn(this, (Toggle.__proto__ || Object.getPrototypeOf(Toggle)).call(this, el, ["click"], handler));
	  }

	  return Toggle;
	}(_Abstract3.default);

	exports.default = Toggle;
	module.exports = exports["default"];

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

	var Abstract = function () {

	  /**
	   * Abstract listener
	   *
	   * @constructor
	   * @param {(string|HTMLElement)} el - Selector or HTML element
	   * @param {Array.<string>} events - Event names to listen on
	   * @param {Function} handler - Event handler to execute
	   */
	  function Abstract(el, events, handler) {
	    _classCallCheck(this, Abstract);

	    if (this === Abstract) throw new Error("Cannot construct abstract instance");

	    /* Resolve element */
	    this.el_ = typeof el === "string" ? document.querySelector(el) : el;

	    /* Set event names and handler */
	    this.events_ = events;
	    this.handler_ = handler;
	  }

	  /**
	   * Register listener for all relevant events
	   */


	  _createClass(Abstract, [{
	    key: "listen",
	    value: function listen() {
	      var _this = this;

	      this.events_.forEach(function (name) {
	        _this.el_.addEventListener(name, _this.handler_, false);
	      });
	    }

	    /**
	     * Unregister listener for all relevant events
	     */

	  }, {
	    key: "unlisten",
	    value: function unlisten() {
	      var _this2 = this;

	      this.events_.forEach(function (name) {
	        _this2.el_.removeEventListener(name, _this2.handler_, false);
	      });
	    }
	  }]);

	  return Abstract;
	}();

	exports.default = Abstract;
	module.exports = exports["default"];

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Media = __webpack_require__(19);

	var _Media2 = _interopRequireDefault(_Media);

	var _Offset = __webpack_require__(20);

	var _Offset2 = _interopRequireDefault(_Offset);

	var _Resize = __webpack_require__(21);

	var _Resize2 = _interopRequireDefault(_Resize);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* ----------------------------------------------------------------------------
	 * Module
	 * ------------------------------------------------------------------------- */

	exports.default = {
	  Media: _Media2.default,
	  Offset: _Offset2.default,
	  Resize: _Resize2.default
	}; /*
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

	module.exports = exports["default"];

/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

	var Media = function () {

	  /**
	   * Listener which checks for media queries on dimension changes
	   *
	   * @constructor
	   * @param {string} query - Media query
	   * @param {Function} handler - Event handler to execute
	   */
	  function Media(query, handler) {
	    _classCallCheck(this, Media);

	    this.media_ = window.matchMedia(query);
	    this.handler_ = function (media) {
	      handler(media);
	    };
	  }

	  /**
	   * Register listener for media query check
	   */


	  _createClass(Media, [{
	    key: "listen",
	    value: function listen() {
	      this.media_.addListener(this.handler_);
	      this.handler_(this.media_);
	    }

	    /**
	     * Unregister listener for media query check
	     */

	  }, {
	    key: "unlisten",
	    value: function unlisten() {
	      this.media_.removeListener(this.handler_);
	    }
	  }]);

	  return Media;
	}();

	exports.default = Media;
	module.exports = exports["default"];

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Abstract2 = __webpack_require__(17);

	var _Abstract3 = _interopRequireDefault(_Abstract2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
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

	var Offset = function (_Abstract) {
	  _inherits(Offset, _Abstract);

	  /**
	   * Listener which monitors changes to the offset of the viewport
	   *
	   * @constructor
	   * @param {Function} handler - Event handler to execute
	   */
	  function Offset(handler) {
	    _classCallCheck(this, Offset);

	    return _possibleConstructorReturn(this, (Offset.__proto__ || Object.getPrototypeOf(Offset)).call(this, window, ["scroll"], handler));
	  }

	  return Offset;
	}(_Abstract3.default);

	exports.default = Offset;
	module.exports = exports["default"];

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Abstract2 = __webpack_require__(17);

	var _Abstract3 = _interopRequireDefault(_Abstract2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
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

	var Resize = function (_Abstract) {
	  _inherits(Resize, _Abstract);

	  /**
	   * Listener which monitors changes to the dimensions of the viewport
	   *
	   * @constructor
	   * @param {Function} handler - Event handler to execute
	   */
	  function Resize(handler) {
	    _classCallCheck(this, Resize);

	    return _possibleConstructorReturn(this, (Resize.__proto__ || Object.getPrototypeOf(Resize)).call(this, window, ["resize", "orientationchange"], handler));
	  }

	  return Resize;
	}(_Abstract3.default);

	exports.default = Resize;
	module.exports = exports["default"];

/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

	var Sidebar = function () {

	  /**
	   * Set sidebars to locked state and limit height to parent node
	   *
	   * @constructor
	   * @param {(string|HTMLElement)} el - Selector or HTML element
	   */
	  function Sidebar(el) {
	    _classCallCheck(this, Sidebar);

	    this.el_ = typeof el === "string" ? document.querySelector(el) : el;

	    /* Index inner and outer container */
	    var inner = this.el_.parentNode;
	    var outer = this.el_.parentNode.parentNode;

	    /* Get top and bottom bounds */
	    this.offset_ = outer.offsetTop;
	    this.bounds_ = {
	      top: inner.offsetTop,
	      bottom: inner.offsetTop + inner.offsetHeight
	    };

	    /* Initialize current height */
	    this.height_ = 0;
	  }

	  /**
	   * Update locked state and height
	   */


	  _createClass(Sidebar, [{
	    key: "update",
	    value: function update() {
	      var scroll = window.pageYOffset;
	      var expand = window.innerHeight;

	      /* Calculate new bounds */
	      var offset = this.bounds_.top - scroll;
	      var height = expand - Math.max(0, scroll + expand - this.bounds_.bottom) - Math.max(offset, this.offset_);

	      /* If height changed, update element */
	      if (height !== this.height_) this.el_.style.height = (this.height_ = height) + "px";

	      /* Sidebar should be locked, as we're below parent offset */
	      if (offset < this.offset_) {
	        if (!this.el_.dataset.mdLocked) this.el_.dataset.mdLocked = "";

	        /* Sidebar should be unlocked, if locked */
	      } else if (typeof this.el_.dataset.mdLocked === "string") {
	        delete this.el_.dataset.mdLocked;
	      }
	    }

	    /**
	     * Reset locked state and height
	     */

	  }, {
	    key: "reset",
	    value: function reset() {
	      delete this.el_.dataset.mdLocked;
	      this.el_.style.height = "";
	      this.height_ = 0;
	    }
	  }]);

	  return Sidebar;
	}();

	exports.default = Sidebar;
	module.exports = exports["default"];

/***/ }
/******/ ]);