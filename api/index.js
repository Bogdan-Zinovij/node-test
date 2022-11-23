import { VercelRouter } from '../src/vercelRouter.js';

export const jokeRouter = new VercelRouter('/api/joke');

jokeRouter.get('/', (req, res, payload) => {
  const name = payload.name;
  res.write(
    JSON.stringify({
      message: `A funny joke was here but ${name} has no почуття гумору(`,
    }),
  );
});

jokeRouter.delete('/', (req, res) => {
  res.end({ message: 'A funny joke was deleted' });
});

jokeRouter.post('/skeleton', (req, res) => {
  res.end({ message: 'Заходит скелет в бар. Подключается к бармену.' });
});

jokeRouter.get('/skeleton', (req, res) => {
  res.end({ message: 'Заходит скелет в бар. Заказывает пиво и швабру.' });
});

jokeRouter.delete('/skeleton', (req, res) => {
  res.end({ message: 'Заходит скелет в бар. Удаляет бар.' });
});

jokeRouter.get('/prikol', (req, res) => {
  res.end({ message: 'BLKO)))' });
});
