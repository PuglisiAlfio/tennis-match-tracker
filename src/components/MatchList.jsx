import MatchItem from "./MatchItem";

export default function MatchList({ matches, onSetMatches }) {
  const handleDelete = (indexToRemove) => {
    const updated = matches.filter((_, index) => index !== indexToRemove);
    onSetMatches(updated);
    localStorage.setItem("matches", JSON.stringify(updated));
  };

  return (
    <>
      <div className="match-list">
        <h2>Partite salvate</h2>
        {matches.length === 0 ? (
          <p>Nessuna partita trovata.</p>
        ) : (
          <ul>
            {matches.map((match, index) => (
              <MatchItem match={match} index={index} onDelete={handleDelete}/>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
