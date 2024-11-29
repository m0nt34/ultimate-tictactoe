import React from "react";
import Xmark from "../../assets/icons/Xmark";
import Omark from "../../assets/icons/Omark";
import OnlinePlayers from "./OnlinePlayers";
import Buttons from "./Buttons";

const StartMenu = () => {
  return (
    <div className="flex items-center justify-center flex-col gap-5  max-w-[400px] w-full">
      <header className="flex gap-2">
        <Xmark className="h-10 w-10" />
        <Omark className="h-10 w-10" />
      </header>
      <div className="flex flex-col gap-5 sm600:gap-4 sm460:gap-3 sm400:gap-2 bg-light_background max-w-[400px] w-full p-5 pb-6 rounded-lg border-b-4 border-dark_background">
        <header className="flex justify-between w-full">
          <span className="font-bold text-gray text-lg sm460:text-base sm400:text-[15px] whitespace-nowrap">
            Ultimate tic tac toe
          </span>
          <OnlinePlayers />
        </header>
        <Buttons />
      </div>
    </div>
  );
};

export default StartMenu;
