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
    <div className="grid grid-cols-3 gap-4">
      {board.map((miniBoard, i) => {
        return (
          <div
            key={i}
            className={`grid w-fit gap-[5px] transition-opacity ${
              miniBoard.value ? null : "grid-cols-3"
            } ${
              turn === value &&
              (allowedMiniBoard === i ||
                allowedMiniBoard === null ||
                board[allowedMiniBoard].value)
                ? "pointer-events-auto"
                : "pointer-events-none opacity-45"
            }`}
          >
            {miniBoard.value ? (
              <div className="flex items-center justify-center bg-light_background w-[202px] h-[214px] rounded-lg border-b-4 border-dark_background">
                {miniBoard.value === "x" ? (
                  <Xmark className="h-[55%] w-[55%]" />
                ) : (
                  <Omark className="h-[55%] w-[55%]" />
                )}
              </div>
            ) : (
              miniBoard.miniBoard.map((cell, j) => {
                return (
                  <div
                    className={`flex items-center justify-center bg-light_background h-[68px] w-16 rounded-lg hover:bg-[#284452] cursor-pointer border-b-4 border-dark_background ${
                      cell ? "pointer-events-none" : null
                    }`}
                    key={`${i}-${j}`}
                    onClick={() => handleMove(i, j)}
                  >
                    {cell ? (
                      cell === "x" ? (
                        <Xmark className="h-[55%] aspect-square" />
                      ) : (
                        <Omark className="h-[55%] aspect-square" />
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
