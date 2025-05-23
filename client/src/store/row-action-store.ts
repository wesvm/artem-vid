import { create } from 'zustand';

export interface RowActionStore<T> {
  row: T | null;
  type: "update" | "delete" | null;
  setRowAction: (row: T, type: "update" | "delete") => void;
  clearRowAction: () => void;
}

export const createRowActionStore = <T>() => create<RowActionStore<T>>((set) => ({
  row: null,
  type: null,
  setRowAction: (row, type) => set({ row, type }),
  clearRowAction: () => set({ row: null, type: null }),
}));