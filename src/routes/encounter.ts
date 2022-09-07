import { Router } from 'express';
import * as EncountersController from '../controllers/encounters';

const router = Router();

router.get('/', EncountersController.getEncounters);
router.get('/:encounterId', EncountersController.getEncounterById);

router.post('/', EncountersController.createEncounter);
router.post('/death', EncountersController.killEncounter);

router.put('/:encounterId', EncountersController.updateEncounter);

export const EncountersRouter = router;
