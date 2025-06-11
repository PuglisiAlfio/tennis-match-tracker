import { useState } from "react";

//inizio componente MatchForm per commit su branch feature/match-form
export default function MatchForm() {
  const [giocatore1, setGiocatore1] = useState("");
  const [giocatore2, setGiocatore2] = useState("");
  const [punteggio, setPunteggio] = useState("");
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  const isValidScore = (punteggioStr) => {
    const pattern = /^(\d{1,2}-\d{1,2})(\s\d{1,2}-\d{1,2})*$/;
    return pattern.test(punteggioStr.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidScore(punteggio)) {
      setError("Inserisci un punteggio valido (es: 6-3 4-6 7-5)");
      return;
    }
    const match = { giocatore1, giocatore2, punteggio, data };
    console.log("Match salvato:", match);
    setGiocatore1("");
    setGiocatore2("");
    setPunteggio("");
    setData("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Inserisci una partita</h2>
        <input
          type="text"
          placeholder="Giocatore 1"
          value={giocatore1}
          onChange={(e) => setGiocatore1(e.target.value)}
        />
        <input
          type="text"
          placeholder="Giocatore 2"
          value={giocatore2}
          onChange={(e) => setGiocatore2(e.target.value)}
        />
        <input
          type="text"
          placeholder="Punteggio es 6-3; 3-6; 7-6"
          value={punteggio}
          onChange={(e) => setPunteggio(e.target.value)}
        />
        {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}
        <input
          type="date"
          placeholder="Data"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <button type="submit">Salva Partita</button>
      </form>
    </div>
  );
}
