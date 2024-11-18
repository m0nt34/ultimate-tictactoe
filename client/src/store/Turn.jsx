import { create } from "zustand";

export const useTurn = create((set) => ({
  turn: false,
  setTurn: (newTurn) => set({ turn: newTurn }),
  setTurnToOpposite: () => set((state) => ({ turn: !state.turn })),
}));
