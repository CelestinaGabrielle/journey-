import { useEffect, useState } from "react";
import styles from "../styles/JourneyTable.module.css";

//Definição dos tipos para os dados de jornada
type TouchPoint = {
  utmSource: string;
  utmCampaign: string;
  utmMedium: string;
  utmContent: string;
  channel: string;
  createdAt: string;
};

// Definição do tipo para a jornada, que contém um ID de sessão e a lista de pontos de toque
type Journey = {
  sessionId: string;
  journey: TouchPoint[];
};

export function JourneyTable() {
  const [journeys, setJourneys] = useState<Journey[]>([]);

//Montagem do componente para buscar as jornadas
  useEffect(() => {
    fetch("http://localhost:3000/journeys")
      .then((res) => res.json())
      .then((data) => setJourneys(data))
      .catch((err) => console.error("Erro ao buscar jornadas:", err));
  }, []);

  // Renderização da tabela de jornadas
  return (
    <div className={styles.container}>
     <h1 className={styles.title}>Jornadas de Usuário</h1>
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
              <td>{j.journey.map((e) => e.utmSource).join(" > ")}</td>
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
