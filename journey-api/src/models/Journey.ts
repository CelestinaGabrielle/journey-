import { TouchPoint } from './TouchPoint';

export class Journey {
  sessionId: string;
  events: TouchPoint[]; //cada um representa um ponto de toque na jornada

  constructor(sessionId: string, events: TouchPoint[]) {
    this.sessionId = sessionId;
    this.events = events.sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      //Ordena os eventos pela data de criação
    );
  }

  getCleanedEvents(): TouchPoint[] {
    const middleChannels = new Set<string>();
    const result: TouchPoint[] = [];

    // Remove eventos intermediários com o mesmo canal, mantendo apenas o primeiro e o último
    for (let i = 0; i < this.events.length; i++) {
      const e = this.events[i];
      if (
        i === 0 ||
        i === this.events.length - 1 ||
        !middleChannels.has(e.channel)
      ) {
        result.push(e);
        if (i !== 0 && i !== this.events.length - 1) {
          middleChannels.add(e.channel);
        }
      }
    }

    return result;
  }
}
