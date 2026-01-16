import { motion } from "framer-motion";

import styleItem from "../styles/matchItem.module.css";

const MotionLi = motion.li;
const MotionButton = motion.button;

export default function MatchItem({ match, index, onDelete }) {
  return (
    <>
      <MotionLi
        className={styleItem["matchItem"]}
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        whileHover={{ scale: 1.02, boxShadow: "0 6px 20px rgba(0,0,0,0.12)" }}
        transition={{ duration: 0.3 }}
      >
        <strong>{match.player1}</strong> vs <strong>{match.player2}</strong>
        <br />
        Punteggio: {match.score} – Data: {new Date(match.date).toLocaleDateString("it-IT", { day: '2-digit', month: 'long', year: 'numeric' })}
        <br />
        <MotionButton
          className={styleItem["deleteButton"]}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onDelete(index)}
        >
          Elimina
        </MotionButton>
      </MotionLi>
    </>
  );
}
