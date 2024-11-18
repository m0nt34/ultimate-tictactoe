import { useBoard } from "../store/board";
import { useValue } from "../store/Value";
import { checkMiniBoardWinner } from "./checkMiniBoardWinner";

export const handleMove = (i, j) => {
  const { value } = useValue.getState();
  const { updateCell } = useBoard.getState();
  updateCell(i,j,value)
  checkMiniBoardWinner(i)
};
