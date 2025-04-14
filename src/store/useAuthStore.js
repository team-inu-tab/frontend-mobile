import { create } from "zustand";

const useAuthStore = create((set) => ({
  accessToken: null, // 엑세스 토큰

  // 엑세스 토큰 재설정
  setAccessToken: (token) => set({ accessToken: token }),

  // 엑세스 토큰 초기화
  clearAccessToken: () => set({ accessToken: null }),
}));

export default useAuthStore;
