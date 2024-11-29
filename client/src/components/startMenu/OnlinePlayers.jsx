import React, { useEffect, useState } from "react";
import {
  emitEvent,
  listenToEvent,
  removeListener,
} from "../../services/socket";
import { useGameStarted } from "../../store/gameStarted";

const OnlinePlayers = () => {
  const [users, setUsers] = useState(0);
  const { gameStarted } = useGameStarted();
  useEffect(() => {
    listenToEvent("users_count", (newCount) => {
      setUsers(newCount);
    });
    emitEvent("get_users_count");
    return () => {
      removeListener("users_count");
    };
  }, [gameStarted]);
  return (
    <span className="flex font-bold text-gray text-lg sm460:text-base sm400:text-[15px]">
      Online<p className="pl-[6px] sm400:hidden"> players</p>: {users}
    </span>
  );
};

export default OnlinePlayers;
