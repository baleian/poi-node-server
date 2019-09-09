import { Router } from 'express';
import * as Address from '../../../controllers/address';

const router = Router();

router.get('/', Address.getAddressByGps);
router.get('/gps', Address.getGpsByAddress);

export default router;
