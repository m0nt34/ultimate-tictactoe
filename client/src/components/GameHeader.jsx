import React from "react";
import Xmark from "../assets/icons/Xmark";
import Omark from "../assets/icons/Omark";
import Flag from "../assets/icons/Flag";
import { useTurn } from "../store/Turn";
import { useValue } from "../store/Value";
import { useResign } from "../store/resign";
import Timer from "./Timer";

const GameHeader = () => {
  const { turn } = useTurn();
  const { value } = useValue();
  const { setResign } = useResign();
  return (
    <div className="flex items-center w-full justify-between h-16 sm600:h-[50px] sm460:h-[40px] sm400:h-[35px]">
      <div className="flex gap-2  sm600:gap-1">
        <Timer />
      </div>
      <div className="flex items-center w-fit justify-center px-4 sm600:px-3 sm460:px-[10px] sm400:px-2 gap-5 sm600:gap-3 sm460:gap-[10px] sm400:gap-2 h-full rounded-lg sm600:rounded-[6px] sm460:rounded-md bg-light_background text-2xl sm600:text-[21px] sm460:text-lg sm400:text-base font-bold text-gray whitespace-nowrap border-b-4 sm600:border-b-[3px] border-dark_background">
        {turn === "x" ? (
          <Xmark className="h-2/4 w-fit aspect-square" fill="#A8BEC9" />
        ) : (
          <Omark className="h-2/4 w-fit aspect-square" fill="#A8BEC9" />
        )}
        {turn === value ? "Your turn" : "Opponent's turn"}
      </div>
      <div
        onClick={() => setResign(true)}
        className="flex items-center justify-center bg-gray ml-[34px] sm600:ml-6 sm460:ml-5 sm400:ml-3 h-full aspect-square rounded-lg sm600:rounded-[6px] sm460:rounded-md cursor-pointer  border-b-4 sm600:border-b-[3px] border-dark_gray hover:opacity-90 transition-opacity"
      >
        <Flag className="h-2/3" />
      </div>
    </div>
  );
};

export default GameHeader;
