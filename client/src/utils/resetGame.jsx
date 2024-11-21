import { useGameStarted } from "../store/gameStarted";
import { useWinner } from "../store/winner";

export const resetGame = () => {
  const { setWinner, setText } = useWinner.getState();
  const { setGameStarted } = useGameStarted.getState();
  setWinner("");
  setText("");
  setGameStarted(false);
};
