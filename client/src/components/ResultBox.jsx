import React from "react";
import { useWinner } from "../store/winner";
import style from "../assets/style/resultBox.module.css";
import Xmark from "../assets/icons/Xmark";
import Omark from "../assets/icons/Omark";
import { resetGame } from "../utils/resetGame";
const ResultBox = () => {
  const { winner, text } = useWinner();
  return (
    <div
      className={
        text.length !== 0 ? style.show_result_cont : style.hide_result_cont
      }
    >
      <div
        className={text.length !== 0 ? style.show_result : style.hide_result}
      >
        <header className="text-xl text-gray font-semibold whitespace-nowrap">
          {text}
        </header>
        {winner ? (
          winner === "x" ? (
            <h1 className="flex items-center justify-center whitespace-nowrap text-blue text-[44px] font-semibold gap-[15px]">
              <Xmark className="h-[56px] w-[56px]" />
              TAKES THE WIN
            </h1>
          ) : (
            <h1 className="flex items-center justify-center whitespace-nowrap text-yellow text-[44px] font-semibold gap-[15px]">
              <Omark className="h-[56px] w-[56px]" />
              TAKES THE WIN
            </h1>
          )
        ) : (
          <h1 className="flex items-center justify-center whitespace-nowrap text-gray text-[44px] font-semibold gap-[15px]">
            <Xmark className="h-[56px] w-[56px]" />
            NO WINNER THIS TIME!
            <Omark className="h-[56px] w-[56px]" />
          </h1>
        )}
        <div className="flex gap-[10PX] mt-[10px] w-[220px]">
          <button
            onClick={resetGame}
            className="flex items-center justify-center w-full text-lg bg-gray p-2 px-[20px] border-b-[3px] border-dark_gray font-semibold rounded-md hover:opacity-90 transition-opacity active:opacity-85"
          >
            QUIT
          </button>
          <button className="flex items-center justify-center w-full text-lg bg-yellow border-[#ac802e] p-2 px-[20px] border-b-[3px]  font-semibold rounded-md hover:opacity-90 transition-opacity active:opacity-85">
            REMATCH
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultBox;
