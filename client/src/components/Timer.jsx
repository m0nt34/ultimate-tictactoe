import React, { useEffect } from "react";
import { useTime } from "../store/time";
import Xmark from "../assets/icons/Xmark";
import Omark from "../assets/icons/Omark";
import { useWinner } from "../store/winner";

const Timer = () => {
  const { time, restartTimer, countDown } = useTime();
  const { text } = useWinner();
  useEffect(() => {
    if (text.length === 0 && time !== 0) {
      restartTimer();
    }
  }, [text.length]);
  return time ? (
    <div className="flex items-center w-[98px] sm600:w-[78px] sm400:w-[50px] text-[44px] sm600:text-4xl sm460:text-3xl sm400:text-2xl text-gray font-bold">
      0:{countDown.toString().padStart(2, "0")}
    </div>
  ) : (
    <>
      <Xmark className="w-[45px] h-[45px] sm600:w-[35px] sm600:h-[35px] sm460:h-[28px] sm460:w-[28px] sm400:h-[23px] sm400:w-[23px]" />
      <Omark className="w-[45px] h-[45px] sm600:w-[35px] sm600:h-[35px] sm460:h-[28px] sm460:w-[28px] sm400:h-[23px] sm400:w-[23px]" />
    </>
  );
};

export default Timer;
