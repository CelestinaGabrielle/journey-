import { Request, Response } from 'express';
import { processJourneys } from '../services/journeyService';

export async function getJourneys(req: Request, res: Response) {
  const data = await processJourneys();
  res.json(data);
}
