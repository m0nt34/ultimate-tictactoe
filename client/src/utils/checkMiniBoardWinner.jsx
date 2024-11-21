import { combinations } from "../data/winningCombinations";
import { useBoard } from "../store/board";
import { checkWinner } from "./checkGameWinner";
export const checkMiniBoardWinner = (miniBoardIndex) => {
  const { board, updateMiniBoardValue } = useBoard.getState();
  if (board[miniBoardIndex].value) return;
  for (let i = 0; i < combinations.length; i++) {
    const [a, b, c] = combinations[i];
    if (
      board[miniBoardIndex].miniBoard[a] &&
      board[miniBoardIndex].miniBoard[a] ===
        board[miniBoardIndex].miniBoard[b] &&
      board[miniBoardIndex].miniBoard[b] === board[miniBoardIndex].miniBoard[c]
    ) {
      updateMiniBoardValue(miniBoardIndex, board[miniBoardIndex].miniBoard[a]);
      checkWinner();
      break;
    }
  }
};
