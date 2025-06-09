import { Request, Response } from 'express';
import { processJourneys } from '../services/journeyService';

export async function getJourneys(req: Request, res: Response) {
  //Requisição para obter jornadas
  try {
    const data = await processJourneys();
    res.json(data);
  } catch (error) {
    console.error("Erro ao processar jornadas:", error);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
}
