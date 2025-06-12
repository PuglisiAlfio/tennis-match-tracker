import MatchList from "./components/MatchList";
import MatchForm from "./components/MatchForm";

function App() {
  return (
    <div>
      <h1>Tennis Match Tracker 🎾</h1>
      <p>Benvenuto! Qui registrerai le tue partite.</p>
      <MatchList/>
      <MatchForm/>
    </div>
  );
}

export default App;