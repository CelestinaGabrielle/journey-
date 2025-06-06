import { parseExcel } from "../utils/xlsxParser";

export async function processJourneys() {
  const rawData = parseExcel("data/journeys.xlsx");

  const sessions: Record<string, any[]> = {};

  // Agrupar por sessionId
  for (const event of rawData as any[]) {
    const { sessionId } = event;
    if (!sessions[sessionId]) sessions[sessionId] = [];
    sessions[sessionId].push(event);
  }

  const processed = Object.entries(sessions).map(([sessionId, events]) => {
    events.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    const middleChannels = new Set();
    const result = [];

    for (let i = 0; i < events.length; i++) {
      const e = events[i];
      if (
        i === 0 ||
        i === events.length - 1 ||
        !middleChannels.has(e.channel)
      ) {
        result.push(e);
        if (i !== 0 && i !== events.length - 1) {
          middleChannels.add(e.channel);
        }
      }
    }

    return { sessionId, journey: result };
  });

  return processed;
}
