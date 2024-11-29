import React, { useState } from "react";
import CustomLoader from "../customLoader";
import { emitEvent } from "../../services/socket";
import Waiting from "./Waiting";
import { useTime } from "../../store/time";
import { useRoom } from "../../store/room";

const Buttons = () => {
  const [searching, setSearching] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const { setTime } = useTime();
  const { setRoom, room } = useRoom();

  const findPlayerFunc = () => {
    setSearching(true);

    emitEvent("join_queue");
  };
  const leaveQueueFunc = () => {
    setSearching(false);
    emitEvent("leave_queue");
  };
  const invitationFunc = () => {
    setWaiting(true);
    emitEvent("create_private_room");
  };
  const leaveInvitationFunc = () => {
    emitEvent("delete_private_room", room);
    setWaiting(false);
    setTime(0);
    setRoom(null);
  };
  return (
    <>
      {searching || waiting ? (
        searching ? (
          <div className="flex flex-col gap-4 sm400:gap-3 mt-2">
            <CustomLoader />
            <span className="flex w-full items-center justify-center text-xl sm400:text-lg font-bold text-gray">
              looking for players...
            </span>
            <button
              onClick={leaveQueueFunc}
              className="bg-yellow py-2 font-bold text-background rounded-lg border-b-[3px] border-[#ac802e] hover:opacity-90 transition-opacity active:opacity-85"
            >
              Leave Queue
            </button>
          </div>
        ) : (
          <Waiting leaveInvitationFunc={leaveInvitationFunc} />
        )
      ) : (
        <div className="flex flex-col gap-2">
          <button
            onClick={findPlayerFunc}
            className="flex items-center justify-center font-bold text-background py-2 pb-[10px] rounded-lg w-full bg-blue border-b-[3px] border-[#258b88] hover:opacity-90 transition-opacity active:opacity-85"
          >
            Find Player
          </button>
          <button
            onClick={invitationFunc}
            className="flex items-center justify-center font-bold text-background py-2 pb-[10px] rounded-lg w-full bg-yellow border-b-[3px] border-[#ac802e] hover:opacity-90 transition-opacity active:opacity-85"
          >
            Invite A Friend
          </button>
        </div>
      )}
    </>
  );
};

export default Buttons;
