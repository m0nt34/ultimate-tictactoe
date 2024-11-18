import React, { useEffect, useState } from "react";
import { listenToEvent, removeListener } from "../../services/socket";

const OnlinePlayers = () => {
  const [users, setUsers] = useState(0);
  useEffect(() => {
    listenToEvent("users_count", (newCount) => {
      setUsers(newCount);
    });
    return ()=>{
      removeListener("users_count")
    }
  }, []);
  return (
    <span className="font-bold text-gray text-lg">Online players: {users}</span>
  );
};

export default OnlinePlayers;
