import { emitEvent } from "../services/socket";
import { useAllowedMiniBoard } from "../store/allowedMiniBoard";
import { useBoard } from "../store/board";
import { useGameStarted } from "../store/gameStarted";

import { useRoom } from "../store/room";
import { useTime } from "../store/time";
import { useWinner } from "../store/winner";

export const resetGame = (getOffer) => {
  const { setWinner, setText } = useWinner.getState();
  const { setGameStarted } = useGameStarted.getState();
  const { setToDefault } = useBoard.getState();
  const { setAllowedMiniBoard } = useAllowedMiniBoard.getState();

  const { setTime } = useTime.getState();
  const { room } = useRoom.getState();
  if (getOffer) {
    emitEvent("decline_rematch", room);
  }
  emitEvent("leave_room", room);

  setTime(0);
  setWinner("");
  setText("");
  setToDefault();
  setAllowedMiniBoard(null);
  setGameStarted(false);
};
