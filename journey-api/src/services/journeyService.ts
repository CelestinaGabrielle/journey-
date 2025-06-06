import { parseExcel } from '../utils/xlsxParser';

type JourneyEvent = {
  sessionId: string;
  channel: string;
  created_at: string;
  value: number;
};

type JourneyRow = {
  journey: string[]; 
  valorTotal: number;
  ticketMedio: number;
  vendas: number;
  quantidadeJornadas: number;
  percentualQuantidade: string;
  tempoConversao: number;
  touchpoints: number;
};

export async function processJourneys(): Promise<JourneyRow[]> {
  const rawData = parseExcel('data/journeys.xlsx') as JourneyEvent[];

  const sessions: Record<string, JourneyEvent[]> = {};

  for (const event of rawData) {
    const { sessionId } = event;
    if (!sessions[sessionId]) sessions[sessionId] = [];
    sessions[sessionId].push(event);
  }

  const journeys: { journey: string[]; value: number; created_at_first: string; created_at_last: string }[] = [];

  for (const events of Object.values(sessions)) {
  
    events.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

    const middleChannels = new Set();
    const result: JourneyEvent[] = [];

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

    journeys.push({
      journey: result.map(e => e.channel),
      value: result[result.length - 1]?.value || 0,
      created_at_first: result[0]?.created_at,
      created_at_last: result[result.length - 1]?.created_at,
    });
  }

  const journeyMap: Record<string, JourneyRow> = {};
  let totalJornadas = journeys.length;

  for (const j of journeys) {
    const key = j.journey.join(' > ');
    if (!journeyMap[key]) {
      journeyMap[key] = {
        journey: j.journey,
        valorTotal: 0,
        ticketMedio: 0,
        vendas: 0,
        quantidadeJornadas: 0,
        percentualQuantidade: '',
        tempoConversao: 0,
        touchpoints: j.journey.length,
      };
    }
    journeyMap[key].valorTotal += j.value;
    journeyMap[key].vendas += 1;
    journeyMap[key].quantidadeJornadas += 1;
    journeyMap[key].tempoConversao +=
      (new Date(j.created_at_last).getTime() - new Date(j.created_at_first).getTime()) / 60000; // minutos
  }

  const result: JourneyRow[] = Object.values(journeyMap).map(j => ({
    ...j,
    ticketMedio: j.vendas > 0 ? j.valorTotal / j.vendas : 0,
    percentualQuantidade: ((j.quantidadeJornadas / totalJornadas) * 100).toFixed(2) + '%',
    tempoConversao: Math.round(j.tempoConversao / j.quantidadeJornadas),
  }));

  result.sort((a, b) => b.vendas - a.vendas);

  return result;
}
