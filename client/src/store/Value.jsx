import { create } from "zustand";

export const useValue = create((set) => ({
  value: null,
  setValue: (newValue) => set({ value: newValue }),
}));
