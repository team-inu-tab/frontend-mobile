import { create } from "zustand";

export const useMenuStore = create((set) => ({
  isMenuBarOpen: false, // 메뉴바 열림 여부

  isMobileMenuOpen: false, // 모바일 햄버거 메뉴 열림 여부

  // 메뉴바 열림/닫힘 액션
  toggleMenuBar: () =>
    set((state) => ({
      isMenuBarOpen: !state.isMenuBarOpen,
    })),

  // 모바일 햄버거 메뉴 액션
  toggleMobileMenu: () =>
    set((state) => ({
      isMobileMenuOpen: !state.isMobileMenuOpen,
      isMenuBarOpen: true,
    })),
}));
