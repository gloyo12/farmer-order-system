import { Router } from 'express';
import { createFertilizer, getFertilizer, deleteFertilizer } from '../controllers/fertilizerController';

const router = Router();

router.post('/', createFertilizer);
router.get('/', getFertilizer);
router.delete('/:id', deleteFertilizer);

export default router;