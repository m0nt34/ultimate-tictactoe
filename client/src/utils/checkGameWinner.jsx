import { combinations } from "../data/winningCombinations";
import { useBoard } from "../store/board";

import { useValue } from "../store/Value";
import { useWinner } from "../store/winner";

export const checkWinner = () => {
  const { board } = useBoard.getState();
  const { setWinner, setText } = useWinner.getState();


  const { value } = useValue.getState();

  for (let i = 0; i < combinations.length; i++) {
    const [a, b, c] = combinations[i];
    if (
      board[a].value &&
      board[a].value === board[b].value &&
      board[b].value === board[c].value
    ) {
      setWinner(board[a].value);
      setText(board[a].value === value ? "YOU WON!" : "YOU LOSE!");
  
      return false;
    }
  }
  return true;
};
