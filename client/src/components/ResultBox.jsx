import React, { useEffect, useState } from "react";
import { useWinner } from "../store/winner";
import style from "../assets/style/resultBox.module.css";
import Xmark from "../assets/icons/Xmark";
import Omark from "../assets/icons/Omark";
import { resetGame } from "../utils/resetGame";
import CustomLoader from "./customLoader";
import { useRoom } from "../store/room";
import { emitEvent, listenToEvent, removeListener } from "../services/socket";
import { useBoard } from "../store/board";
import { useAllowedMiniBoard } from "../store/allowedMiniBoard";
import { useTurn } from "../store/Turn";
import { useValue } from "../store/Value";
const ResultBox = () => {
  const [offerRematch, setOfferRematch] = useState(false);
  const [getOffer, setGetOffer] = useState(false);
  const [opponentLeft, setOpponentLeft] = useState(false);
  const { winner, setWinner, text, setText } = useWinner();
  const { room } = useRoom();
  const { setToDefault } = useBoard();
  const { setAllowedMiniBoard } = useAllowedMiniBoard();
  const { setTurn } = useTurn();
  const { value, setValue } = useValue();
  useEffect(() => {
    listenToEvent("get_rematch_offer", () => {
      setGetOffer(true);
      setText("YOU'VE GOT A REMATCH REQUEST!");
    });
    listenToEvent("get_rematch_accepted", ({ turn }) => {
      setTurn("x");
      turn ? setValue("x") : setValue("o");
      setAllowedMiniBoard(null);
      setToDefault();
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
    listenToEvent("early_resignation", (text) => {
      setOpponentLeft(true)
      setText(text);
      setWinner(value);
    });
    return () => {
      removeListener("get_rematch_offer");
      removeListener("get_rematch_accepted");
      removeListener("opponent_left");
    };
  }, []);

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
          ))}
        {offerRematch && (
          <span className={style.resultBox_loader}>
            <CustomLoader />
          </span>
        )}

        <div className={style.buttons_cont}>
          <div className="flex flex-col gap-2 w-[220px]">
            {getOffer && (
              <button
                onClick={() => emitEvent("accept_rematch", { room })}
                className="flex items-center justify-center w-full text-lg bg-yellow border-[#ac802e] p-2 px-[20px] border-b-[3px] font-semibold rounded-md hover:opacity-90 transition-opacity active:opacity-85"
              >
                ACCEPT
              </button>
            )}
            <button
              onClick={() => resetGame(getOffer)}
              className="flex items-center justify-center w-full text-lg bg-gray p-2 px-[20px] border-b-[3px] border-dark_gray font-semibold rounded-md hover:opacity-90 transition-opacity active:opacity-85"
            >
              QUIT
            </button>
          </div>
          {!offerRematch && !getOffer && !opponentLeft && (
            <button
              onClick={handleOfferRematch}
              className="flex items-center justify-center w-full text-lg bg-yellow border-[#ac802e] p-2 px-[20px] border-b-[3px] font-semibold rounded-md hover:opacity-90 transition-opacity active:opacity-85"
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
