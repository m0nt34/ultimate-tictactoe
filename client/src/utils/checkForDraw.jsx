import { useBoard } from "../store/board";
import { useWinner } from "../store/winner";

export const checkForDraw = () => {
  const { board } = useBoard.getState();
  const { setText } = useWinner.getState();

  const isDraw = board.every((cell) => {
    return (
      cell.value !== null ||
      cell.miniBoard.every((miniCell) => miniCell !== null)
    );
  });

  if (isDraw) {
    setText("DRAW!");
  }
};
