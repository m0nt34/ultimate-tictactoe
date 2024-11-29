import React from "react";
import Xmark from "../assets/icons/Xmark";
import Omark from "../assets/icons/Omark";
import { useBoard } from "../store/board";
import { handleMove } from "../utils/handleMove";
import { useTurn } from "../store/Turn";
import { useAllowedMiniBoard } from "../store/allowedMiniBoard";
import { useValue } from "../store/Value";
const Board = () => {
  const { board } = useBoard();
  const { turn } = useTurn();
  const { value } = useValue();
  const { allowedMiniBoard } = useAllowedMiniBoard();

  return (
    <div className="grid grid-cols-3 gap-4 sm600:gap-3 sm460:gap-[10px] sm400:gap-[9px] max-h-full overflow-hidden">
      {board.map((miniBoard, i) => {
        return (
          <div
            key={i}
            className={`grid max-w-[202px] w-full gap-[5px] sm600:gap-1 sm460:gap-[3px] transition-opacity ${
              miniBoard.value ? null : "grid-cols-3"
            } ${
              turn === value &&
              (allowedMiniBoard === i ||
                allowedMiniBoard === null ||
                board[allowedMiniBoard].miniBoard.every(
                  (cell) => cell !== null
                ) ||
                board[allowedMiniBoard].value)
                ? "pointer-events-auto"
                : "pointer-events-none opacity-45"
            }`}
          >
            {miniBoard.value ? (
              <div className="flex items-center justify-center bg-light_background w-full aspect-square rounded-lg border-b-4 sm460:border-b-[3px] border-dark_background">
                {miniBoard.value === "x" ? (
                  <Xmark className="h-[55%] w-[55%] max-h-full max-w-full" />
                ) : (
                  <Omark className="h-[55%] w-[55%] max-h-full max-w-full" />
                )}
              </div>
            ) : (
              miniBoard.miniBoard.map((cell, j) => {
                return (
                  <div
                    className={`flex items-center justify-center bg-light_background aspect-square h-auto w-full rounded-lg sm600:rounded-[7px] hover:bg-[#284452] cursor-pointer border-b-4 sm460:border-b-[3px] border-dark_background ${
                      cell ? "pointer-events-none" : null
                    }`}
                    key={`${i}-${j}`}
                    onClick={() => handleMove(i, j)}
                  >
                    {cell ? (
                      cell === "x" ? (
                        <Xmark className="h-[55%] w-[55%] max-h-full max-w-full" />
                      ) : (
                        <Omark className="h-[55%] w-[55%] max-h-full max-w-full" />
                      )
                    ) : null}
                  </div>
                );
              })
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
