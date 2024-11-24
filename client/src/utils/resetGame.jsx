import { emitEvent } from "../services/socket";
import { useAllowedMiniBoard } from "../store/allowedMiniBoard";
import { useBoard } from "../store/board";
import { useGameStarted } from "../store/gameStarted";
import { useRoom } from "../store/room";
import { useWinner } from "../store/winner";

export const resetGame = (getOffer) => {
  const { setWinner, setText } = useWinner.getState();
  const { setGameStarted } = useGameStarted.getState();
  const { setToDefault } = useBoard.getState();
  const { setAllowedMiniBoard } = useAllowedMiniBoard.getState();
  const { room } = useRoom.getState();
  emitEvent("leave_room", room);
  if(getOffer){
    emitEvent("decline_rematch", room);

  }
  setWinner("");
  setText("");
  setToDefault();
  setAllowedMiniBoard(null);
  setGameStarted(false);
};
