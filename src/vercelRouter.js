import { HTTPMethod } from './constants/methods.js';
import { safeJSONParse } from './utils.js';

const processedContentTypes = {
  'text/html': (text) => text,
  'text/plain': (text) => text,
  'application/json': (json) => safeJSONParse(json, {}),
  'application/x-www-form-urlencoded': (data) =>
    Object.fromEntries(new URLSearchParams(data)),
};

export class VercelRouter {
  constructor(base) {
    this.base = base;
    this.routes = {};
  }

  use(method, route, ...handlers) {
    if (!handlers.length) {
      throw new Error('Handlers must be implemented');
    }
    const url = this.base.concat(route);

    if (!this.routes[url]?.[method]) {
      const existingHandlers = this.routes[url] || {};
      this.routes[url] = { ...existingHandlers, [method]: handlers };
    } else {
      this.routes[url][method] = handlers;
    }
  }

  async handle(req, res) {
    const { url, method } = req;
    let payload = {},
      rawRequest = '';
    for await (const chunk of req) {
      rawRequest += chunk;
    }
    console.log(this.routes, '\n', req, '\n', method);
    const methodHandlers = this.routes[url][method];
    if (!methodHandlers) {
      throw new Error('Handlers are not implemented');
    }
    if (req.headers['content-type']) {
      const contentType = req.headers['content-type'].split(';')[0];
      if (processedContentTypes[contentType]) {
        payload = processedContentTypes[contentType](rawRequest);
      }
    }
    for (const handler of methodHandlers) {
      await handler(req, res, payload);
    }
    res.end();
  }

  delete(route, ...handlers) {
    this.use(HTTPMethod.DELETE, route, ...handlers);
  }

  get(route, ...handlers) {
    this.use(HTTPMethod.GET, route, ...handlers);
  }

  patch(route, ...handlers) {
    this.use(HTTPMethod.PATCH, route, ...handlers);
  }

  post(route, ...handlers) {
    this.use(HTTPMethod.POST, route, ...handlers);
  }
}
