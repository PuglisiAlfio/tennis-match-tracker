// Stato iniziale del form
export const initialState = {
  giocatore1: "",
  giocatore2: "",
  punteggio: "",
  data: "",
  error: "",
  success: false
};

// Funzione reducer per gestire gli aggiornamenti di stato
export function formReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_ERROR":
      return { ...state, error: action.error };
    case "RESET":
      return initialState;
    case "SET_SUCCESS":
      return { ...state, success: action.success };
    default:
      return state;
  }
}