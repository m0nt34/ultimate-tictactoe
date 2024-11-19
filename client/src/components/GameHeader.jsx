import React from "react";
import Xmark from "../assets/icons/Xmark";
import Omark from "../assets/icons/Omark";
import Flag from "../assets/icons/Flag";
import { useTurn } from "../store/Turn";
import { useValue } from "../store/Value";

const GameHeader = () => {
  const { turn } = useTurn();
  const { value } = useValue();
  return (
    <div className="flex items-center w-full justify-between h-16">
      <div className="flex gap-2">
        <Xmark className="h-[45px] w-[45px]" />
        <Omark className="h-[45px] w-[45px]" />
      </div>
      <div className="flex items-center justify-center px-4 gap-5 h-full rounded-lg bg-light_background text-2xl font-bold text-gray whitespace-nowrap border-b-4 border-dark_background">
        {turn === "x" ? (
          <Xmark className="h-2/4 w-fit aspect-square" fill="#A8BEC9" />
        ) : (
          <Omark className="h-2/4 w-fit aspect-square" fill="#A8BEC9" />
        )}
        {turn === value ? "Your turn" : "Opponent's turn"}
      </div>
      <div className="flex items-center justify-center bg-gray ml-[34px] h-full aspect-square rounded-lg cursor-pointer  border-b-4 border-dark_gray hover:opacity-90 transition-opacity">
        <Flag className="h-2/3" />
      </div>
    </div>
  );
};

export default GameHeader;
