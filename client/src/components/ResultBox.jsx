import React, { useEffect, useRef, useState } from "react";
import { useWinner } from "../store/winner";
import style from "../assets/style/resultBox.module.css";
import Xmark from "../assets/icons/Xmark";
import Omark from "../assets/icons/Omark";
import { resetGame } from "../utils/resetGame";
import CustomLoader from "./customLoader.jsx";
import { useRoom } from "../store/room";
import { emitEvent, listenToEvent, removeListener } from "../services/socket";
import { useBoard } from "../store/board";
import { useAllowedMiniBoard } from "../store/allowedMiniBoard";
import { useTurn } from "../store/Turn";
import { useValue } from "../store/Value";
import { useTime } from "../store/time";

const ResultBox = () => {
  const [offerRematch, setOfferRematch] = useState(false);
  const [getOffer, setGetOffer] = useState(false);
  const [opponentLeft, setOpponentLeft] = useState(false);
  const matchEnded = useRef(false);
  const { winner, setWinner, text, setText } = useWinner();
  const { room } = useRoom();
  const { setToDefault } = useBoard();
  const { setAllowedMiniBoard } = useAllowedMiniBoard();
  const { setTurn } = useTurn();
  const { value, setValue } = useValue();
  const { clearIntervalId } = useTime();

  useEffect(() => {
    listenToEvent("get_rematch_offer", () => {
      setGetOffer(true);
      setText("YOU'VE GOT A REMATCH REQUEST!");
    });
    listenToEvent("get_rematch_accepted", ({ turn }) => {
      setTurn("x");
      setValue(turn);
      setAllowedMiniBoard(null);
      setToDefault();
      setWinner("");
      setText("");
      setOfferRematch(false);
      setGetOffer(false);
    });
    listenToEvent(
      "opponent_left",
      (text = "OPPONENT HAS ALREADY LEFT THE ROOM!") => {
        setText(text);
        setOfferRematch(false);
        setOpponentLeft(true);
      }
    );
    listenToEvent("early_resignation", (newText) => {
      setOpponentLeft(true);
      setOfferRematch(false);
      setText(newText);

      setWinner(value);
    });
    listenToEvent("opponent_disconected", (newText) => {
      setOpponentLeft(true);
      setOfferRematch(false);
      if (!matchEnded.current) setWinner(value);
      setText(newText);
    });
    listenToEvent("win_by_timeout", ({ text, winnerbytimeout }) => {
      setWinner(winnerbytimeout);
      setText(text);
    });

    return () => {
      removeListener("get_rematch_offer");
      removeListener("get_rematch_accepted");
      removeListener("opponent_left");
      removeListener("early_resignation");
      removeListener("opponent_disconected");
      removeListener("win_by_timeout");
    };
  }, []);
  useEffect(() => {
    if (text.length > 0) {
      clearIntervalId();
      matchEnded.current = true;
    } else {
      matchEnded.current = false;
    }
  }, [text.length]);
  const handleOfferRematch = () => {
    setOfferRematch(true);
    setText("WAITING FOR OPPONENT'S REMATCH RESPONSE!");
    emitEvent("offer_rematch", { room });
  };
  return (
    <div
      className={
        text.length !== 0 ? style.show_result_cont : style.hide_result_cont
      }
    >
      <div
        className={text.length !== 0 ? style.show_result : style.hide_result}
      >
        <header className={style.custom_header}>{text}</header>
        {!offerRematch &&
          (winner ? (
            winner === "x" ? (
              <h1 className="flex items-center justify-center whitespace-nowrap text-blue text-[44px] sm800:text-[40px] sm600:text-4xl sm460:text-3xl sm400:text-[26px] font-semibold gap-[15px] sm600:gap-3 sm460:gap-[10px] sm400:gap-2">
                <Xmark className="h-[56px] w-[56px] sm800:h-[52px] sm800:w-[52px] sm600:h-12 sm600:w-12 sm460:h-10 sm460:w-10 sm400:h-9 sm400:w-9" />
                TAKES THE WIN
              </h1>
            ) : (
              <h1 className="flex items-center justify-center whitespace-nowrap text-yellow text-[44px] sm800:text-[40px] sm600:text-4xl sm460:text-3xl sm400:text-[26px] font-semibold gap-[15px] sm600:gap-3 sm460:gap-[10px] sm400:gap-2">
                <Omark className="h-[56px] w-[56px] sm800:h-[52px] sm800:w-[52px] sm600:h-12 sm600:w-12 sm460:h-10 sm460:w-10 sm400:h-9 sm400:w-9" />
                TAKES THE WIN
              </h1>
            )
          ) : (
            <h1 className="flex items-center justify-center whitespace-nowrap text-gray text-[44px] sm800:text-[40px] sm600:text-4xl sm460:text-3xl sm400:text-[26px] font-semibold gap-[15px] sm600:gap-3 sm460:gap-[10px] sm400:gap-2">
              <Xmark className="h-[56px] w-[56px] sm800:h-[52px] sm800:w-[52px] sm600:h-12 sm600:w-12 sm460:h-10 sm460:w-10 sm400:h-9 sm400:w-9" />
              NO WINNER THIS TIME!
              <Omark className="h-[56px] w-[56px] sm800:h-[52px] sm800:w-[52px] sm600:h-12 sm600:w-12 sm460:h-10 sm460:w-10 sm400:h-9 sm400:w-9" />
            </h1>
          ))}
        {offerRematch && !opponentLeft && (
          <span className={style.resultBox_loader}>
            <CustomLoader />
          </span>
        )}

        <div className={style.buttons_cont}>
          <div className="flex flex-col gap-2 sm600:gap-[6px] sm400:gap-[5px] w-[220px] sm800:w-[210px] sm600:w-[200px] sm460:w-[190px] sm400:w-[180px]">
            {getOffer && !opponentLeft && (
              <button
                onClick={() => emitEvent("accept_rematch", { room })}
                className="flex items-center justify-center w-full text-lg sm600:text-base sm400:text-[15px] bg-yellow border-[#ac802e] p-2 sm800:p-[7px] sm600:p-[6px] sm460:p-[5px] sm400:p-1 px-[20px] border-b-[3px] font-semibold rounded-md hover:opacity-90 transition-opacity active:opacity-85"
              >
                ACCEPT
              </button>
            )}
            <button
              onClick={() => resetGame(getOffer)}
              className="flex items-center justify-center w-full text-lg sm600:text-base sm400:text-[15px] bg-gray p-2 sm800:p-[7px] sm600:p-[6px] sm460:p-[5px] sm400:p-1 px-[20px] border-b-[3px] border-dark_gray font-semibold rounded-md hover:opacity-90 transition-opacity active:opacity-85"
            >
              QUIT
            </button>
          </div>
          {!offerRematch && !getOffer && !opponentLeft && (
            <button
              onClick={handleOfferRematch}
              className="flex items-center justify-center w-full text-lg sm600:text-base sm400:text-[15px] bg-yellow border-[#ac802e] p-2 sm800:p-[7px] sm600:p-[6px] sm460:p-[5px] sm400:p-1 px-[20px] border-b-[3px] font-semibold rounded-md hover:opacity-90 transition-opacity active:opacity-85"
            >
              REMATCH
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultBox;
