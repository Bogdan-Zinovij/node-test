/* eslint-disable sonarjs/no-duplicate-string */
import Router from '../router.js';

const router = new Router();

router.get('/', (req, res, url) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.json({
    pathname: url.pathname,
    method: req.method,
    message: 'Hello from GET method in / pathname!',
  });
});

router.post('/', (req, res, url, payload) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.json({
    pathname: url.pathname,
    method: req.method,
    message: 'Hello from POST method in / pathname!',
    payload,
  });
});

router.delete('/delete', (req, res, url, payload) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.json({
    pathname: url.pathname,
    method: req.method,
    message: 'Hello from DELETE method in /delete pathname!',
    payload,
  });
});

router.patch('/patch', (req, res, url, payload) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.json({
    pathname: url.pathname,
    method: req.method,
    message: 'Hello from PATCH method in /patch pathname!',
    payload,
  });
});

router.options('/options', (req, res, url, payload) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.json({
    pathname: url.pathname,
    method: req.method,
    message: 'Hello from OPTIONS method in /options pathname',
    payload,
  });
});

export default router;
