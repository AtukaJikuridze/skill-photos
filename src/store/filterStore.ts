import { create } from "zustand";
import type { PhotoFilters } from "../types/filters";

interface FilterStore {
  isFilterModalOpen: boolean;
  filters: PhotoFilters;
  openFilterModal: () => void;
  closeFilterModal: () => void;
  setFilters: (filters: PhotoFilters) => void;
}

export const useFilterStore = create<FilterStore>((set: any) => ({
  isFilterModalOpen: false,
  filters: {},
  openFilterModal: () => set({ isFilterModalOpen: true }),
  closeFilterModal: () => set({ isFilterModalOpen: false }),
  setFilters: (filters: PhotoFilters) => set({ filters }),
}));
