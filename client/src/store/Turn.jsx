import { create } from "zustand";

export const useTurn = create((set) => ({
  turn: "x",
  setTurn: (newTurn) => set({ turn: newTurn }),
  setTurnToOpposite: () =>
    set((state) => ({ turn: state.turn === "x" ? "o" : "x" })),
}));
