// services/journeyService.ts
import { parseExcel } from "../utils/xlsxParser";
import { Journey } from "../models/Journey";
import { TouchPoint } from "../models/TouchPoint";

export async function processJourneys() {
  const rawData = parseExcel("data/journeys.xlsx");

  const sessions: Record<string, TouchPoint[]> = {};
  //Agrupar os pontos de toque por sessionId
  for (const event of rawData as any[]) {
    const point = new TouchPoint(
      event.utm_source,
      event.utm_campaign,
      event.utm_medium,
      event.utm_content,
      event.channel,
      event.createdAt
    );

    const sessionId = event.sessionId;
    if (!sessions[sessionId]) sessions[sessionId] = [];
    sessions[sessionId].push(point);
  }

  const processed = Object.entries(sessions).map(([sessionId, events]) => {
    const journey = new Journey(sessionId, events);
    return {
      sessionId,
      journey: journey.getCleanedEvents(),
    };
  });

  // Retorna o array de jornadas processadas
  return processed;
}
