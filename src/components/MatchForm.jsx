import { useReducer } from "react";
import { initialState, formReducer } from "../reducers/matchReducer.js";
import { motion } from "framer-motion";
import { validateTennisScore } from "../utils/validateScore.js";

import styleForm from "../styles/matchForm.module.css";

const MotionForm = motion.form;
const MotionSuccess = motion.p;

export default function MatchForm({ matches, onSetMatches }) {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validazione punteggio tennis (best of 3 di default)
    const scoreError = validateTennisScore(state.punteggio, state.bestOf);

    if (scoreError) {
      dispatch({
        type: "SET_ERROR",
        error: scoreError,
      });
      return;
    }

    const match = {
      id: crypto.randomUUID(),
      player1: state.giocatore1,
      player2: state.giocatore2,
      score: state.punteggio,
      date: state.data,
      bestOf: state.bestOf,
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
      <label className="">
        Tipo di match:
        <select
          value={state.bestOf}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "bestOf",
              value: Number(e.target.value),
            })
          }
        >
          <option value={3}>2 su 3</option>
          <option value={5}>3 su 5</option>
        </select>
      </label>
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
