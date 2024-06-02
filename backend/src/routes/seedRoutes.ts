import { Router } from 'express';
import { createSeed, getSeed, deleteSeed } from '../controllers/seedController';

const router = Router();

router.post('/', createSeed);
router.get('/', getSeed);
router.delete('/:id', deleteSeed);

export default router;