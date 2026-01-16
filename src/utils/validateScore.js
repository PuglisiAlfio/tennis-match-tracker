export function validateTennisScore(score, bestOf) {
  const sets = score.trim().split(" ");
  const setsToWin = Math.ceil(bestOf / 2);

  let winsP1 = 0;
  let winsP2 = 0;

  for (let i = 0; i < sets.length; i++) {
    const [a, b] = sets[i].split("-").map(Number);

    if (Number.isNaN(a) || Number.isNaN(b)) {
      return "Formato punteggio non valido";
    }

    const isValidSet =
      (a === 6 && b <= 4) ||
      (b === 6 && a <= 4) ||
      (a === 7 && (b === 5 || b === 6)) ||
      (b === 7 && (a === 5 || a === 6));

    if (!isValidSet) {
      return `Set non valido: ${a}-${b}`;
    }

    if (a > b) winsP1++;
    else winsP2++;

    // Il match era già finito, ma ci sono altri set
    if (
      (winsP1 === setsToWin || winsP2 === setsToWin) &&
      i < sets.length - 1
    ) {
      return "Il match era già concluso, non possono esserci set extra";
    }
  }

  // Alla fine deve esserci un vincitore valido
  if (winsP1 < setsToWin && winsP2 < setsToWin) {
    return "Il match non ha un vincitore valido";
  }

  return null;
}
