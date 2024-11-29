import { create } from "zustand";
import { checkIfTimeOut } from "../utils/checkIfTimeOut";

export const useTime = create((set) => ({
  time: 0,
  countDown: 0,
  intervalId: null,
  setTime: (newTime) => set({ time: newTime }),
  clearIntervalId: () =>
    set((state) => {
      if (state.intervalId) {
        clearInterval(state.intervalId);
      }
      return { intervalId: null };
    }),
  restartTimer: () => {
    set((state) => {
      if (state.intervalId) {
        clearInterval(state.intervalId);
      }

      const intervalId = setInterval(() => {
        set((state) => {
          if (state.countDown <= 0) {
            clearInterval(intervalId);
            checkIfTimeOut();
            return { countDown: 0, intervalId: null };
          }
          return { countDown: state.countDown - 1 };
        });
      }, 1000);

      return { countDown: state.time, intervalId };
    });
  },
}));
