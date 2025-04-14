import { create } from "zustand";

export const SORT_OPTIONS = {
  SENDER: "sender",
  TIME: "time",
};

export const useSortStore = create((set) => ({
  sortOption: SORT_OPTIONS.TIME, // 정렬 옵션

  // 정렬 옵션 변경 (유효한 값만 허용)
  changeSortOption: (option) => {
    if (Object.values(SORT_OPTIONS).includes(option)) {
      set({ sortOption: option });
    } else {
      console.warn(`Invalid sort option: ${option}`);
    }
  },
}));