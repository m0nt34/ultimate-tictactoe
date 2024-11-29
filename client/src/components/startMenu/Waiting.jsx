import React, { useEffect, useState, useRef } from "react";
import CustomLoader from "../customLoader";
import {
  emitEvent,
  listenToEvent,
  removeListener,
} from "../../services/socket";
import Copy from "../../assets/icons/Copy";
import { useRoom } from "../../store/room";
import { useTime } from "../../store/time";

const Waiting = ({ leaveInvitationFunc }) => {
  const [url, setUrl] = useState("");
  const { setRoom, room } = useRoom();
  const { setTime, time } = useTime();
  useEffect(() => {
    listenToEvent("get_privat_room_id", (id) => {
      const currentUrl = `${window.location.origin}/join?id=${id}`;
      setUrl(currentUrl);
      setRoom(id);
    });
    return () => {
      removeListener("get_privat_room_id");
    };
  }, []);
  const setTimeFunc = (newTime) => {
    if (time !== newTime) {
      setTime(newTime);
      emitEvent("change_private_room_time", { room, newTime });
    }
  };

  return (
    <div className="flex flex-col gap-4 sm400:gap-3 mt-2">
      <CustomLoader />
      <span className="flex w-full items-center justify-center text-xl sm400:text-lg font-bold text-gray">
        Waiting for a friend...
      </span>
      <div className="flex w-full  overflow-hidden ">
        <div className="w-full rounded-bl-lg rounded-tl-lg bg-background border-b-[3px] border-dark_background ">
          <input
            value={url}
            type="text"
            className="outline-none bg-transparent w-full text-gray font-semibold px-3 bg-background py-2 "
            disabled={true}
          />
        </div>
        <button
          onClick={() => navigator.clipboard.writeText(url)}
          className="flex items-center justify-center bg-blue hfull px-3 transition-opacity duration-200 hover:opacity-90 active:opacity-85 rounded-br-lg rounded-tr-lg border-b-[3px] border-[#2b9c99]"
        >
          <Copy className="text-light_background" />
        </button>
      </div>
      <div className="flex w-full gap-[10px]">
        <button
          onClick={() => setTimeFunc(0)}
          className={`w-1/3 border-b-[3px] ${
            time === 0 ? "bg-blue border-[#2b9c99]" : "bg-gray border-dark_gray"
          } rounded-lg font-semibold py-[5px] hover:opacity-90 transition active:opacity-85 duration-300`}
        >
          none
        </button>
        <button
          onClick={() => setTimeFunc(10)}
          className={`w-1/3 border-b-[3px] ${
            time === 10
              ? "bg-blue border-[#2b9c99]"
              : "bg-gray border-dark_gray"
          } rounded-lg font-semibold py-[5px] hover:opacity-90 transition active:opacity-85 duration-300`}
        >
          10s
        </button>
        <button
          onClick={() => setTimeFunc(20)}
          className={`w-1/3 border-b-[3px] ${
            time === 20
              ? "bg-blue border-[#2b9c99]"
              : "bg-gray border-dark_gray"
          } rounded-lg font-semibold py-[5px] hover:opacity-90 transition active:opacity-85 duration-300`}
        >
          20s
        </button>
      </div>
      <button
        onClick={() => leaveInvitationFunc()}
        className="bg-yellow py-2 font-bold text-background rounded-lg border-b-[3px] border-[#ac802e] hover:opacity-90 transition-opacity active:opacity-85"
      >
        Leave Room
      </button>
    </div>
  );
};
export default Waiting;
