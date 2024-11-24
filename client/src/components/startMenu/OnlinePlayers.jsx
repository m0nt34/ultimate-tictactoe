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
    <span className="font-bold text-gray text-lg">Online players: {users}</span>
  );
};

export default OnlinePlayers;
