import { useReducer } from "react";
import { initialState, formReducer } from "../reducers/matchReducer.js";
import { motion } from "framer-motion";

import styleForm from "../styles/matchForm.module.css";

const MotionForm = motion.form;
const MotionSuccess = motion.p;

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

    dispatch({ type: "SET_SUCCESS", success: true });

    setTimeout(() => {
      dispatch({ type: "SET_SUCCESS", success: false });
      dispatch({ type: "RESET" });
    }, 3000);
  };

  return (
    <MotionForm
      className={styleForm}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
    >
      <h2>Inserisci una partita</h2>
      <input
        type="text"
        placeholder="Giocatore 1"
        required
        autoFocus
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
        max={new Date().toISOString().split("T")[0]}
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
      {state.success && (
        <MotionSuccess
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          style={{ color: "green", marginBottom: "1rem" }}
        >
          ✅ Partita salvata con successo!
        </MotionSuccess>
      )}
    </MotionForm>
  );
}
