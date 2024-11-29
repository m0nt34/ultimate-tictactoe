import { emitEvent } from "../services/socket";
import { useBoard } from "../store/board";
import { useRoom } from "../store/room";
import { useTime } from "../store/time";
import { useTurn } from "../store/Turn";
import { useValue } from "../store/Value";
import { checkMiniBoardWinner } from "./checkMiniBoardWinner";
import { resultFunction } from "./resultFunction";

export const handleMove = (i, j) => {
  const { value } = useValue.getState();
  const { updateCell } = useBoard.getState();
  const { room } = useRoom.getState();
  const { setTurnToOpposite } = useTurn.getState();
  const { restartTimer, time } = useTime.getState();

  setTurnToOpposite();
  updateCell(i, j, value);
  checkMiniBoardWinner(i);
  resultFunction();
  emitEvent("make_move", { miniBoardIndex: i, cellIndex: j, room, value });
  if (time !== 0) restartTimer();
};
