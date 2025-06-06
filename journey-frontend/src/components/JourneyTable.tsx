import { useEffect, useState } from "react";
import styles from "../styles/JourneyTable.module.css";

type TouchPoint = {
  utm_source: string;
  utm_campaign: string;
  utm_medium: string;
  utm_content: string;
  channel: string;
  createdAt: string;
};

type Journey = {
  sessionId: string;
  journey: TouchPoint[];
};

export function JourneyTable() {
  const [journeys, setJourneys] = useState<Journey[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/journeys")
      .then((res) => res.json())
      .then((data) => setJourneys(formatJourneys(data)))
      .catch((err) => console.error("Erro ao buscar jornadas:", err));
  }, []);

  const formatJourneys = (journeys: Journey[]): Journey[] => {
    const journeysFormatted: Journey[] = [];
    for (const j of journeys) {
      const lastJourney = j.journey[j.journey.length - 1];
      j.journey = j.journey.filter((jf, i) => {
        const lastJourneySource = j.journey[j.journey.length - 1].utm_source;

        if (lastJourneySource && jf.utm_source === lastJourneySource) {
          if (i === j.journey.length - 1) return true; // Mantém o último
          return false; // Remove intermediários com a mesma fonte
        }

        return j.journey.findIndex((h) => h.utm_source === jf.utm_source) === i;
      });

      if (lastJourney) j.journey.push(lastJourney);
      journeysFormatted.push(j);
    }

    return journeysFormatted;
  };

  return (
    <div className={styles.container}>
      <h1>Jornadas de Usuário</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Session ID</th>
            <th>Jornada</th>
            <th>Touch Points</th>
            <th>Data Inicial</th>
          </tr>
        </thead>

        <tbody>
          {journeys.map((j) => (
            <tr key={j.sessionId}>
              <td>{j.sessionId}</td>
              <td>{j.journey.map((e) => e.utm_source).join(" > ")}</td>
              <td>{j.journey.length}</td>
              <td>
                {new Date(j.journey[0]?.createdAt).toLocaleDateString("pt-BR")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}