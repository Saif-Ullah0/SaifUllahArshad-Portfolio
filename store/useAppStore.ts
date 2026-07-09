import { create } from "zustand";

type AppStore = {
  isLoaded: boolean;
  setIsLoaded: (loaded: boolean) => void;

  activeSection: string;
  setActiveSection: (section: string) => void;

  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
};

export const useAppStore = create<AppStore>((set) => ({
  isLoaded: false,
  setIsLoaded: (loaded) => set({ isLoaded: loaded }),

  activeSection: "hero",
  setActiveSection: (section) => set({ activeSection: section }),

  menuOpen: false,
  setMenuOpen: (open) => set({ menuOpen: open }),
}));