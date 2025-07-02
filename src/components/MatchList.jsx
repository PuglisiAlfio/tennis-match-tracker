import MatchItem from "./MatchItem";
import styleList from "../styles/matchList.module.css";

export default function MatchList({ matches, onSetMatches }) {
  const handleDelete = (indexToRemove) => {
    const updated = matches.filter((_, index) => index !== indexToRemove);
    onSetMatches(updated);
    localStorage.setItem("matches", JSON.stringify(updated));
  };

  return (
    <>
      <div className={styleList["match-list"]}>
        <h2>Partite salvate</h2>
        {matches.length === 0 ? (
          <p className={styleList["no-match-found"]}>
            Nessuna partita trovata.
          </p>
        ) : (
          <ul>
            {matches.map((match, index) => (
              <MatchItem match={match} index={index} onDelete={handleDelete} key={index}/>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
