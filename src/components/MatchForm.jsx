import { useReducer } from "react";
import { initialState, formReducer } from "../reducers/matchReducer.js";

import styleForm from "../styles/matchForm.module.css";

export default function MatchForm({ matches, onSetMatches }) {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const isValidScore = (punteggioStr) => {
    const pattern = /^(\d{1,2}-\d{1,2})(\s\d{1,2}-\d{1,2})*$/;
    return pattern.test(punteggioStr.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidScore(state.punteggio)) {
      dispatch({
        type: "SET_ERROR",
        error: "Inserisci un punteggio valido (es: 6-3 4-6 7-5)",
      });
      return;
    }

    const match = {
      player1: state.giocatore1,
      player2: state.giocatore2,
      score: state.punteggio,
      date: state.data,
    };

    const updatedMatches = [...matches, match];
    onSetMatches(updatedMatches);
    localStorage.setItem("matches", JSON.stringify(updatedMatches));

    dispatch({ type: "RESET" });
  };

  return (
    <div className={styleForm}>
      <form onSubmit={handleSubmit}>
        <h2>Inserisci una partita</h2>
        <input
          type="text"
          placeholder="Giocatore 1"
          required
          value={state.giocatore1}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "giocatore1",
              value: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="Giocatore 2"
          required
          value={state.giocatore2}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "giocatore2",
              value: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="Punteggio es: 6-3 3-6 7-5"
          value={state.punteggio}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "punteggio",
              value: e.target.value,
            })
          }
        />
        {state.error && (
          <p style={{ color: "red", marginBottom: "1rem" }}>{state.error}</p>
        )}
        <input
          type="date"
          required
          value={state.data}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "data",
              value: e.target.value,
            })
          }
        />
        <button type="submit">Salva Partita</button>
      </form>
    </div>
  );
}
