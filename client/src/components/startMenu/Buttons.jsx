import React, { useState } from "react";
import CustomLoader from "../customLoader";
import { emitEvent } from "../../services/socket";

const Buttons = () => {
  const [searching, setSearching] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const findPlayerFunc = () => {
    setSearching(true);
    
    emitEvent("join_queue");
  };
  const invitationFunc = () => {
    setWaiting(true);
  };
  const leaveInvitationFunc = () => {
    setWaiting(false);
  };
  const leaveQueueFunc = () => {
    setSearching(false);
  };
  return (
    <>
      {searching || waiting ? (
        searching ? (
          <div className="flex flex-col gap-4 mt-2">
            <CustomLoader />
            <span className="flex w-full items-center justify-center text-xl font-bold text-gray">
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
          <div className="flex flex-col gap-4 mt-2">
            <CustomLoader />
            <span className="flex w-full items-center justify-center text-xl font-bold text-gray">
              Waiting for a friend...
            </span>
            <button
              onClick={leaveInvitationFunc}
              className="bg-yellow py-2 font-bold text-background rounded-lg border-b-[3px] border-[#ac802e] hover:opacity-90 transition-opacity active:opacity-85"
            >
              Leave Room
            </button>
          </div>
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
