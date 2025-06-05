import { create } from "zustand";

// Helper function to load from localStorage
const getInitialHistory = (): string[] => {
  try {
    const stored = localStorage.getItem("searchHistory");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

interface SearchStore {
  searchHistory: string[];
  setSearchHistory: (history: string[]) => void;
  addToHistory: (term: string) => void;
  clearHistory: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  searchHistory: getInitialHistory(),
  setSearchHistory: (history: string[]) => {
    localStorage.setItem("searchHistory", JSON.stringify(history));
    set({ searchHistory: history });
  },
  addToHistory: (term: string) => {
    set((state) => {
      const newHistory = [...new Set([term, ...state.searchHistory])].slice(
        0,
        5
      );
      localStorage.setItem("searchHistory", JSON.stringify(newHistory));
      return { searchHistory: newHistory };
    });
  },

  clearHistory: () => {
    localStorage.removeItem("searchHistory");
    set({ searchHistory: [] });
  },
}));
