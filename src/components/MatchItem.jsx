import { motion } from "framer-motion";

const MotionLi = motion.li;

export default function MatchItem({ match, index, onDelete }) {
  return (
    <>
      <MotionLi
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        <strong>{match.player1}</strong> vs <strong>{match.player2}</strong>
        <br />
        Punteggio: {match.score} – Data: {match.date}
        <br />
        <button onClick={() => onDelete(index)}>Elimina</button>
      </MotionLi>
    </>
  );
}
