import { useState, useEffect } from "react";
import MatchForm from "./components/MatchForm";
import MatchList from "./components/MatchList";

function App() {
  const [matches, setMatches] = useState([]);

  // Carica dal localStorage una sola volta al primo avvio
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("matches")) || [];
    setMatches(saved);
  }, []);

  return (
    <main>
      <MatchForm matches={matches} onSetMatches={setMatches} />
      <MatchList matches={matches} onSetMatches={setMatches} />
    </main>
  );
}

export default App;
