// Polyfill for TextEncoder/TextDecoder
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Polyfill for AbortController (needed for React Router v7)
if (typeof global.AbortController === 'undefined') {
  global.AbortController = class AbortController {
    constructor() {
      this.signal = {
        aborted: false,
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => {},
      };
    }
    abort() {
      this.signal.aborted = true;
    }
  };
}

// Polyfill for AbortSignal
if (typeof global.AbortSignal === 'undefined') {
  global.AbortSignal = class AbortSignal {
    constructor() {
      this.aborted = false;
    }
    addEventListener() {}
    removeEventListener() {}
    dispatchEvent() {}
  };
}

// Polyfill for Request API (needed for React Router v7)
if (typeof global.Request === 'undefined') {
  global.Request = class Request {
    constructor(input, options = {}) {
      this.url = input;
      this.method = options.method || 'GET';
      this.headers = new Map(Object.entries(options.headers || {}));
      this.signal = options.signal || new AbortSignal();
    }
  };
}

// Polyfill for Response API
if (typeof global.Response === 'undefined') {
  global.Response = class Response {
    constructor(body, options = {}) {
      this.body = body;
      this.status = options.status || 200;
      this.headers = new Map(Object.entries(options.headers || {}));
    }
    
    json() {
      return Promise.resolve(this.body);
    }
    
    text() {
      return Promise.resolve(String(this.body));
    }
  };
}

// Polyfill for fetch (if needed)
if (typeof global.fetch === 'undefined') {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve({}),
      text: () => Promise.resolve(''),
    })
  );
}

// Setup testing library
import '@testing-library/jest-dom';