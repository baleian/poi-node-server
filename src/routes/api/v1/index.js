import express from 'express';
import address from './address';

const router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.use('/address', address);

export default router;