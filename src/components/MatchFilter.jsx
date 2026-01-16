import styleFilter from "../styles/MatchFilter.module.css";

export default function MatchFilter({ query, onChange }) {
  const showReset = query.trim().length > 0;

  return (
    <div className={styleFilter.filterWrapper}>
      <input
        className={styleFilter.filterInput}
        type="text"
        placeholder="Cerca giocatore..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
      />

      {showReset && (
        <button
          type="button"
          className={styleFilter.resetButton}
          onClick={() => onChange("")}
          aria-label="Reset filtro"
        >
          ✕
        </button>
      )}
    </div>
  );
}
