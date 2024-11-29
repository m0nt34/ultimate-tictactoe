import { useEffect } from "react";
import Game from "./pages/Game";
import { connectSocket, disconnectSocket } from "./services/socket";
import { BrowserRouter } from "react-router-dom";
function App() {
  useEffect(() => {
    connectSocket();
    return () => {
      disconnectSocket();
    };
  }, []);
  return (
    <BrowserRouter>
      <Game />
    </BrowserRouter>
  );
}

export default App;
