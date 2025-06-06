import { useEffect, useState } from "react";
import styles from "../styles/JourneyTable.module.css";

type TouchPoint = {
  utm_source: string;
  utm_campaign: string;
  utm_medium: string;
  utm_content: string;
  channel: string;
  created_at: string;
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
      .then((data) => setJourneys(data))
      .catch((err) => console.error("Erro ao buscar jornadas:", err));
  }, []);

  return (
    <div className={styles.container}>
      <h1>Jornadas de Usuário</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Session ID</th>
            <th>Jornada</th>
            <th>Touch Points</th>
          </tr>
        </thead>
        <tbody>
          {journeys.map((j) => (
            <tr key={j.sessionId}>
              <td>{j.sessionId}</td>
              <td>{j.journey.map(e => e.utm_source).join(" > ")}</td>
              <td>{j.journey.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
