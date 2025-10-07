// src/setupTests.js

// Polyfill for TextEncoder/TextDecoder
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Polyfill for Request API (needed for React Router v7)
if (typeof global.Request === 'undefined') {
  global.Request = class Request {
    constructor(input, options = {}) {
      this.url = input;
      this.method = options.method || 'GET';
      this.headers = new Map(Object.entries(options.headers || {}));
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
  };
}

// Setup testing library
import '@testing-library/jest-dom';
