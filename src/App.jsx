import MatchForm from "./components/MatchForm";
import MatchList from "./components/MatchList";

function App() {
  return (
    <>
      <header>
          <h1>Tennis Match Tracker 🎾</h1>
          <p>Benvenuto! Qui registrerai le tue partite.</p>
      </header>
      <main>
        <MatchForm />
        <MatchList />
      </main>
    </>
  );
}

export default App;
