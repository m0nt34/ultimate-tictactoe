import { create } from "zustand";

export const useResign = create((set) => ({
  resign: false,
  setResign: (newResign) => set({ resign: newResign }),
}));
