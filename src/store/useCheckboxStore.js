import { create } from "zustand";

export const useCheckboxStore = create((set, get) => ({
  // 메일함별로 선택된 메일 ID들을 저장
  checkedByBox: {
    receive: new Set(),
    important: new Set(),
    deleted: new Set(),
    draft: new Set(),
    scheduled: new Set(),
    selfsent: new Set(),
    sent: new Set(),
    spam: new Set(),
  },

  // 특정 메일 선택
  check: (boxType, mailId) =>
    set((state) => {
      const updated = new Set(state.checkedByBox[boxType]);
      updated.add(mailId);
      return {
        checkedByBox: { ...state.checkedByBox, [boxType]: updated },
      };
    }),

  // 특정 메일 선택 해제
  uncheck: (boxType, mailId) =>
    set((state) => {
      const updated = new Set(state.checkedByBox[boxType]);
      updated.delete(mailId);
      return {
        checkedByBox: { ...state.checkedByBox, [boxType]: updated },
      };
    }),

  // 전체 메일 선택
  checkAll: (boxType, mailIds) =>
    set((state) => {
      return {
        checkedByBox: {
          ...state.checkedByBox,
          [boxType]: new Set(mailIds),
        },
      };
    }),

  // 전체 선택 해제
  uncheckAll: (boxType) =>
    set((state) => {
      return {
        checkedByBox: {
          ...state.checkedByBox,
          [boxType]: new Set(),
        },
      };
    }),

  // 체크 여부 확인
  isChecked: (boxType, mailId) => {
    return get().checkedByBox[boxType]?.has(mailId) || false;
  },

  // 모든 메일이 선택됐는지 확인
  isAllChecked: (boxType, mailIds) => {
    const checkedSet = get().checkedByBox[boxType];
    return mailIds.length > 0 && mailIds.every((id) => checkedSet.has(id));
  },

  // 현재 선택된 메일 ID들 반환
  getCheckedIds: (boxType) => {
    return Array.from(get().checkedByBox[boxType]);
  },
  // 스토어 초기화
  reset: () =>
    set(() => ({
      checkedByBox: {
        receive: new Set(),
        sent: new Set(),
        draft: new Set(),
        important: new Set(),
        deleted: new Set(),
        scheduled: new Set(),
        selfsent: new Set(),
        spam: new Set(),
      },
    })),
}));
