export default function MatchItem({ match, index, onDelete }) {
  return (
    <>
      <li key={index}>
        <strong>{match.player1}</strong> vs <strong>{match.player2}</strong>
        <br />
        Punteggio: {match.score} – Data: {match.date}
        <br />
        <button onClick={() => onDelete(index)}>Elimina</button>
      </li>
    </>
  );
}
