import { create } from "zustand";

export const useWinner = create((set) => ({
  winner: "",
  text: "",
  setWinner: (newWinner) => set({ winner: newWinner }),
  setText: (newText) => set({ text: newText }),
}));
