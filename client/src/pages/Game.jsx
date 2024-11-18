import React, { useEffect } from "react";

import Board from "../components/Board";
import GameHeader from "../components/GameHeader";
import { useGameStarted } from "../store/gameStarted";
import StartMenu from "../components/startMenu/StartMenu";
import { listenToEvent, removeListener } from "../services/socket";
import { useRoom } from "../store/room";
import { useTurn } from "../store/Turn";
import { useValue } from "../store/Value";

const Game = () => {
  const { gameStarted, setGameStarted } = useGameStarted();
  const { setRoom } = useRoom();
  const { setTurn } = useTurn();
  const { setValue } = useValue();
  useEffect(() => {
    listenToEvent("room_assigned", ({ room, turn }) => {
      setRoom(room);
      setTurn(turn);
      console.log(room);

      turn ? setValue("x") : setValue("o");
      setGameStarted(true);
    });
    return () => {
      removeListener("room_assigned");
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
