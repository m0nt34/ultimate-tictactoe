import React from "react";
import { useResign } from "../store/resign";
import style from "../assets/style/resignBox.module.css";
import { useRoom } from "../store/room";
import { emitEvent } from "../services/socket";
import { useBoard } from "../store/board";
import { useGameStarted } from "../store/gameStarted";
import { useAllowedMiniBoard } from "../store/allowedMiniBoard";
const GiveUpBox = () => {
  const { resign, setResign } = useResign();
  const { room } = useRoom();
  const { setToDefault } = useBoard();
  const { setGameStarted } = useGameStarted();
  const { setAllowedMiniBoard } = useAllowedMiniBoard();
  const handleResign = () => {
    emitEvent("resign", room);
    emitEvent("leave_room", room);
    setGameStarted(false);
    setAllowedMiniBoard(null);
    setToDefault();
    setResign(false);
  };
  return (
    <div className={resign ? style.show_resign_cont : style.hide_resign_cont}>
      <div className={resign ? style.show_resign : style.hide_resign}>
        <h1 className="flex items-center justify-center whitespace-nowrap text-gray text-[44px] sm800:text-[40px] sm600:text-3xl sm460:text-2xl sm400:text-xl font-semibold gap-[15px]">
          THINKING ABOUT RESIGNING?
        </h1>
        <div className={style.buttons_cont}>
          <button
            onClick={() => setResign(false)}
            className="flex whitespace-nowrap items-center justify-center w-full text-lg sm600:text-base sm400:text-sm bg-gray p-2 sm800:p-[7px] sm600:p-[6px] sm460:p-[5px] sm400:p-1 px-[20px] border-b-[3px] border-dark_gray font-semibold rounded-md hover:opacity-90 transition-opacity active:opacity-85"
          >
            KEEP PLAYING
          </button>

          <button
            onClick={handleResign}
            className="flex whitespace-nowrap items-center justify-center w-full text-lg sm600:text-base sm400:text-sm bg-yellow border-[#ac802e] p-2 sm800:p-[7px] sm600:p-[6px] sm460:p-[5px] sm400:p-1 px-[20px] border-b-[3px] font-semibold rounded-md hover:opacity-90 transition-opacity active:opacity-85"
          >
            RESIGN ANYWAY
          </button>
        </div>
      </div>
    </div>
  );
};

export default GiveUpBox;
