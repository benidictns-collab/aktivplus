import { create } from "zustand";

export type PageName =
  | "home"
  | "about"
  | "objects"
  | "catalog"
  | "services"
  | "contacts"
  | "cabinet"
  | "dashboard"
  | "privacy"
  | "terms";

interface NavigationState {
  currentPage: PageName;
  selectedPropertyId: number | null;
  isPropertyModalOpen: boolean;
  navigate: (page: PageName) => void;
  openPropertyModal: (id: number) => void;
  closePropertyModal: () => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  currentPage: "home",
  selectedPropertyId: null,
  isPropertyModalOpen: false,
  navigate: (page) => {
    set({ currentPage: page });
    window.scrollTo({ top: 0, behavior: "smooth" });
  },
  openPropertyModal: (id) =>
    set({ selectedPropertyId: id, isPropertyModalOpen: true }),
  closePropertyModal: () =>
    set({ selectedPropertyId: null, isPropertyModalOpen: false }),
}));
