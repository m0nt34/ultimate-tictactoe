import { emitEvent } from "../services/socket";
import { useRoom } from "../store/room";
import { useTurn } from "../store/Turn";
import { useValue } from "../store/Value";
import { useWinner } from "../store/winner";

export const checkIfTimeOut = () => {
  const { turn } = useTurn.getState();
  const { value } = useValue.getState();
  if (value === turn) {
    const { room } = useRoom.getState();
    const { setText } = useWinner.getState();

    const { setWinner } = useWinner.getState();
    const winnerbytimeout = value === "x" ? "o" : "x";
    setWinner(winnerbytimeout);
    emitEvent("time_out", { room, winnerbytimeout });
    setText("LOST DUE TO TIMEOUT!");
  }
};
