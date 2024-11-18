import { useEffect } from "react";
import Game from "./pages/Game";
import { connectSocket, disconnectSocket } from "./services/socket";

function App() {
  useEffect(()=>{
    connectSocket()
    return ()=>{
      disconnectSocket()
    }
  },[])
  return (
    <>
      <Game />
    </>
  );
}

export default App;
