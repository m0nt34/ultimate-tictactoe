import { checkForDraw } from "./checkForDraw";
import { checkWinner } from "./checkGameWinner";
export const resultFunction = () => {
  if (checkWinner()) {
    checkForDraw();
  }
};
