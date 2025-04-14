import { create } from "zustand";

export const useMenuStore = create((set) => ({
  isMenuBarOpen: false, // 메뉴바 열림 여부

  // 메뉴바 열림/닫힘 액션
  toggleMenuBar: () =>
    set((state) => ({
      isMenuBarOpen: !state.isMenuBarOpen,
    })),
}));
