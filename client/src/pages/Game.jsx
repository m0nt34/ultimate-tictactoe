import React, { useEffect } from "react";

import Board from "../components/Board";
import GameHeader from "../components/GameHeader";
import { useGameStarted } from "../store/gameStarted";
import StartMenu from "../components/startMenu/StartMenu";
import { listenToEvent, removeListener } from "../services/socket";
import { useRoom } from "../store/room";
import { useTurn } from "../store/Turn";
import { useValue } from "../store/Value";
import { checkMiniBoardWinner } from "../utils/checkMiniBoardWinner";
import { useBoard } from "../store/board";
import { useAllowedMiniBoard } from "../store/allowedMiniBoard";

const Game = () => {
  const { gameStarted, setGameStarted } = useGameStarted();
  const { setRoom } = useRoom();
  const { setTurn, setTurnToOpposite } = useTurn();
  const { setValue } = useValue();
  const { updateCell } = useBoard();
  const { setAllowedMiniBoard } = useAllowedMiniBoard();
  useEffect(() => {
    listenToEvent("room_assigned", ({ room, turn }) => {
      setRoom(room);

      setTurn("x");
      turn ? setValue("x") : setValue("o");
      setGameStarted(true);
    });

    listenToEvent("opponent_move", ({ miniBoardIndex, cellIndex, value }) => {
      updateCell(miniBoardIndex, cellIndex, value);
      checkMiniBoardWinner(miniBoardIndex);
      setAllowedMiniBoard(cellIndex);
      setTurnToOpposite();
    });

    return () => {
      removeListener("room_assigned");
      removeListener("opponent_move");
    };
  });
  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-background">
      {gameStarted ? (
        <div className="flex flex-col gap-5 w-fit">
          <GameHeader />
          <Board />
        </div>
      ) : (
        <StartMenu />
      )}
    </div>
  );
};

export default Game;
