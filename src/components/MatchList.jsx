export default function MatchList({ matches, onSetMatches }) {
  const handleDelete = (indexToRemove) => {
    const updated = matches.filter((_, index) => index !== indexToRemove);
    onSetMatches(updated);
    localStorage.setItem("matches", JSON.stringify(updated));
  };

  return (
    <div className="match-list">
      <h2>Partite salvate</h2>
      {matches.length === 0 ? (
        <p>Nessuna partita trovata.</p>
      ) : (
        <ul>
          {matches.map((match, index) => (
            <li key={index}>
              <strong>{match.player1}</strong> vs{" "}
              <strong>{match.player2}</strong>
              <br />
              Punteggio: {match.score} – Data: {match.date}
              <br />
              <button onClick={() => handleDelete(index)}>Elimina</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
