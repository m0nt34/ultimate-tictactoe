import { create } from "zustand";

export const useBoard = create((set) => ({
  board: Array.from({ length: 9 }, (_) => ({
    value: null,
    miniBoard: Array(9).fill(null),
  })),
  updateCell: (miniBoardIndex, cellIndex, value) =>
    set((state) => {
      const newBoard = [...state.board];
      newBoard[miniBoardIndex].miniBoard[cellIndex] = value;
      return { board: newBoard };
    }),
  updateMiniBoardValue: (miniBoardIndex, value) =>
    set((state) => {
      const newBoard = [...state.board];
      newBoard[miniBoardIndex].value = value;
      return { board: newBoard };
    }),
  setToDefault: () =>
    set({
      board: Array.from({ length: 9 }, (_) => ({
        value: null,
        miniBoard: Array(9).fill(null),
      })),
    }),
}));
