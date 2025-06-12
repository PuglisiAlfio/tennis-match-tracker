import { useEffect, useState } from "react";

//Inizio componente MatchList per commit su branch feature/match-list
export default function MatchList() {
  const [matches, setMatches] = useState([]);
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("matches")) || [];
    setMatches(saved);
  }, []);

  const clearMatches = () => {
    localStorage.removeItem("matches");
    setMatches([]);
  };

  const handleRemoveMatch = (indexMatch) => {
    const updateMatches = matches.filter((_, index) => index !== indexMatch);
    setMatches(updateMatches);
    localStorage.setItem("matches", JSON.stringify(updateMatches))
  }

  return (
    <div>
      <h2>Partite salvate</h2>
      {matches.length === 0 ? (
        <p>Nessuna partita trovata.</p>
      ) : (
        <ul>
          {matches.map((match, index) => (
            <li key={index}>
              <span>{match.giocatore1}</span> vs <span>{match.giocatore2}</span>
              <br />
              Punteggio: {match.punteggio} - Data: {match.data}
              <button onClick={()=>handleRemoveMatch(index)}>Elimina Partita</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={clearMatches}>Elimina Partite Salvate</button>
    </div>
  );
}
