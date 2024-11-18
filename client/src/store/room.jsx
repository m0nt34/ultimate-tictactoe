import { create } from "zustand";

export const useRoom = create((set) => ({
  room: null,
  setRoom: (newRoom) => set({ room: newRoom }),
}));
