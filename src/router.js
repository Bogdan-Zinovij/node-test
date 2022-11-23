import helpers from './lib/helpers.js';
import { METHODS } from './lib/methods.js';
import { processedContentTypes } from './lib/contentTypes.js';

class Router {
  constructor() {
    this.routes = new Map();
    this.get = this.createMethod(METHODS.GET);
    this.post = this.createMethod(METHODS.POST);
    this.delete = this.createMethod(METHODS.DELETE);
    this.patch = this.createMethod(METHODS.PATCH);
    this.options = this.createMethod(METHODS.OPTIONS);
  }

  createMethod(method) {
    return (pathname, handler) => {
      this.routes.set(pathname, {
        ...this.routes.get(pathname),
        [method]: handler,
      });
    };
  }

  async handle(req, res, router) {
    const url = new URL(req.url || '/', `https://${req.headers.host}`);
    const routeModule = router.routes.get(url.pathname) ?? {};
    const handler = routeModule[req?.method] ?? this.defaultHandler;

    let payload = {};
    let rawRequest = '';
    for await (const chunk of req) {
      rawRequest += chunk;
    }
    if (req.headers['content-type']) {
      const contentType = req.headers['content-type'].split(';')[0];
      if (processedContentTypes[contentType]) {
        payload = processedContentTypes[contentType](rawRequest);
      }
    }

    try {
      handler(req, Object.assign(res, helpers), url, payload, rawRequest);
    } catch (e) {
      res.statusCode = 500;
      res.end(process.env.NODE_ENV === 'production' ? 'internal error' : e);
    }
  }

  // default handler
  defaultHandler(req, res, url) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.json({
      pathname: url.pathname,
      method: req.method,
      message: 'This method was not implemented!',
    });
  }
}

export default Router;
