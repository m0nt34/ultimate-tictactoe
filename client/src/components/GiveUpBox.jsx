import React from "react";
import { useResign } from "../store/resign";
import style from "../assets/style/resignBox.module.css";
import { useRoom } from "../store/room";
import { emitEvent } from "../services/socket";
import { useBoard } from "../store/board";
import { useGameStarted } from "../store/gameStarted";
const GiveUpBox = () => {
  const { resign, setResign } = useResign();
  const { room } = useRoom();
  const { setToDefault } = useBoard();
  const { setGameStarted } = useGameStarted();
  const handleResign = () => {
    emitEvent("resign", room);
    setGameStarted(false);
    setToDefault();
    setResign(false);
  };
  return (
    <div className={resign ? style.show_resign_cont : style.hide_resign_cont}>
      <div className={resign ? style.show_resign : style.hide_resign}>
        <h1 className="flex items-center justify-center whitespace-nowrap text-gray text-[44px] font-semibold gap-[15px]">
          THINKING ABOUT RESIGNING?
        </h1>
        <div className={style.buttons_cont}>
          <button
            onClick={() => setResign(false)}
            className="flex whitespace-nowrap items-center justify-center w-full text-lg bg-gray p-2 px-[20px] border-b-[3px] border-dark_gray font-semibold rounded-md hover:opacity-90 transition-opacity active:opacity-85"
          >
            KEEP PLAYING
          </button>

          <button
            onClick={handleResign}
            className="flex whitespace-nowrap items-center justify-center w-full text-lg bg-yellow border-[#ac802e] p-2 px-[20px] border-b-[3px] font-semibold rounded-md hover:opacity-90 transition-opacity active:opacity-85"
          >
            RESIGN ANYWAY
          </button>
        </div>
      </div>
    </div>
  );
};

export default GiveUpBox;
