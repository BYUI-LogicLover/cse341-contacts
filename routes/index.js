import { Router } from 'express';
import contactsRouter from './contacts.js';

const router = Router();

router.get('/', (req, res) => {
  res.send('Bazinga');
});

router.use('/contacts', contactsRouter);

export default router;
