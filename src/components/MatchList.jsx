import { useState } from "react";
import MatchItem from "./MatchItem";
import MatchFilter from "./MatchFilter";
import styleList from "../styles/matchList.module.css";

export default function MatchList({ matches, onSetMatches }) {
  const [query, setQuery] = useState("");
  const handleDelete = (id) => {
    const updated = matches.filter(match => match.id !== id);
    onSetMatches(updated);
    localStorage.setItem("matches", JSON.stringify(updated));
  };

  const filteredMatches = matches.filter(match =>
    match.player1.toLowerCase().includes(query.toLowerCase()) ||
    match.player2.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={styleList["match-list"]}>
      <h2>Partite salvate</h2>

      <MatchFilter query={query} onChange={setQuery} />

      {filteredMatches.length === 0 ? (
        <p className={styleList["no-match-found"]}>
          Nessuna partita trovata.
        </p>
      ) : (
        <ul>
          {filteredMatches.map(match => (
            <MatchItem
              key={match.id}
              match={match}
              onDelete={() => handleDelete(match.id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
