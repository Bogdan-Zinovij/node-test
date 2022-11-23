import http from 'http';
import { jokeRouter } from '../api/index.js';

const PORT = 8000;

const server = http.createServer((req, res) => {
  try {
    jokeRouter.handle(req, res);
  } catch (e) {
    console.log(e);
    const status = e.status ?? 500;
    res.status(status).send(
      JSON.stringify({
        errors: [{ status, title: e.message }],
      }),
    );
  }
});

server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
