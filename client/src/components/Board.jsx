import React from "react";
import Xmark from "../assets/icons/Xmark";
import Omark from "../assets/icons/Omark";
import { useBoard } from "../store/board";
import { handleMove } from "../utils/handleMove";
const Board = () => {
  const { board } = useBoard();
  return (
    <div className="grid grid-cols-3 gap-5">
      {board.map((miniBoard, i) => {
        return (
          <div
            key={i}
            className={`grid w-fit gap-[5px] ${
              miniBoard.value ? null : "grid-cols-3"
            }`}
          >
            {miniBoard.value ? (
              <div className="flex items-center justify-center bg-light_background w-[202px] h-full rounded-lg border-b-4 border-dark_background"></div>
            ) : (
              miniBoard.miniBoard.map((cell, j) => {
                return (
                  <div
                    className="flex items-center justify-center bg-light_background h-[68px] w-16 rounded-lg hover:bg-[#284452] cursor-pointer border-b-4 border-dark_background"
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
