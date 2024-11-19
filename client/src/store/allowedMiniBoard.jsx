import { create } from "zustand";

export const useAllowedMiniBoard = create((set) => ({
  allowedMiniBoard: null,
  setAllowedMiniBoard: (newAllowedMiniBoard) =>
    set({ allowedMiniBoard: newAllowedMiniBoard }),
}));
