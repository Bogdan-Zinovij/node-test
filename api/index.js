import { VercelRouter } from '../src/vercelRouter';

const jokeRouter = new VercelRouter('/api/joke');

jokeRouter.get('/', (req, res, payload) => {
  const name = payload.name;
  res.send({
    message: `A funny joke was here but ${name} has no почуття гумору(`,
  });
});

jokeRouter.delete('/', (req, res) => {
  res.send({ message: 'A funny joke was deleted' });
});

jokeRouter.post('/skeleton', (req, res) => {
  res.send({ message: 'Заходит скелет в бар. Подключается к бармену.' });
});

jokeRouter.get('/skeleton', (req, res) => {
  res.send({ message: 'Заходит скелет в бар. Заказывает пиво и швабру.' });
});

jokeRouter.delete('/skeleton', (req, res) => {
  res.send({ message: 'Заходит скелет в бар. Удаляет бар.' });
});

jokeRouter.get('/prikol', (req, res) => {
  res.send({ message: 'BLKO)))' });
});

export default async function handler(req, res) {
  try {
    await jokeRouter.handle(req, res);
  } catch (e) {
    const status = e.status ?? 500;
    res.status(status).send(
      JSON.stringify({
        errors: [{ status, title: e.message }],
      }),
    );
  }
}
