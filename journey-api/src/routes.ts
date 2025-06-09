import { Router } from 'express';
import { getJourneys } from './controllers/journeyController';

const router = Router();
//Definição da rota para obter jornadas
router.get('/journeys', getJourneys);

export default router;
