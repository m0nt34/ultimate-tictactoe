import React, { useCallback, useEffect } from "react";
import Board from "../components/Board";
import GameHeader from "../components/GameHeader";
import { useGameStarted } from "../store/gameStarted";
import StartMenu from "../components/startMenu/StartMenu";
import { emitEvent, listenToEvent, removeListener } from "../services/socket";
import { useRoom } from "../store/room";
import { useTurn } from "../store/Turn";
import { useValue } from "../store/Value";
import { checkMiniBoardWinner } from "../utils/checkMiniBoardWinner";
import { useBoard } from "../store/board";
import { useAllowedMiniBoard } from "../store/allowedMiniBoard";
import ResultBox from "../components/ResultBox";
import { resultFunction } from "../utils/resultFunction";
import GiveUpBox from "../components/GiveUpBox";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useTime } from "../store/time";

const Game = () => {
  const { gameStarted, setGameStarted } = useGameStarted();
  const { setRoom } = useRoom();
  const { setTurn, setTurnToOpposite } = useTurn();
  const { setValue } = useValue();
  const { updateCell } = useBoard();
  const { setAllowedMiniBoard } = useAllowedMiniBoard();
  const { setTime, restartTimer, time } = useTime();

  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    listenToEvent("room_assigned", ({ room, time, turn }) => {
      setRoom(room);
      time === false ? setTime(0) : setTime(time);
      setTurn("x");
      setValue(turn);

      setGameStarted(true);
    });

    listenToEvent("opponent_move", ({ miniBoardIndex, cellIndex, value }) => {
      updateCell(miniBoardIndex, cellIndex, value);
      checkMiniBoardWinner(miniBoardIndex);
      setAllowedMiniBoard(cellIndex);
      resultFunction();
      setTurnToOpposite();
      if (time !== 0) {
        restartTimer();
      }
    });
    listenToEvent("private_room_is_not_valid", () => {
      navigate("/", { replace: true });
    });
    return () => {
      removeListener("room_assigned");
      removeListener("opponent_move");
    };
  });
  const checkIfPrivate = useCallback(() => {
    return location.pathname.endsWith("/join");
  }, [location.pathname]);
  useEffect(() => {
    if (checkIfPrivate()) {
      const roomId = searchParams.get("id");
      if (performance.getEntriesByType("navigation")[0].type === "reload") {
        navigate("/", { replace: true });
      } else {
        emitEvent("check_room", roomId);
      }
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-background">
      {gameStarted ? (
        <div className="flex items-center justify-center w-full px-5">
          <div className="flex flex-col gap-5 w-full max-w-[638px]">
            <GameHeader />
            <Board />
            <ResultBox />
            <GiveUpBox />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full px-5">
          <StartMenu />
        </div>
      )}
    </div>
  );
};

export default Game;
