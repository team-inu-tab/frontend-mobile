import { create } from "zustand";
import { extractEmailAddress } from "../utils/emailUtils";

export const useMailStore = create((set) => ({
  // 메일 리스트 (시간순)
  receiveMails: null,
  sentMails: null,
  deletedMails: null,
  draftMails: null,
  importantMails: null,
  scheduledMails: null,
  selfSentMails: null,
  spamMails: null,

  // 메일 그룹 리스트 (받은/보낸 메일)
  groupedMails: [],

  // 상태 및 에러
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
  error: null,

  // 선택된 메일
  selectedMail: null, // 선택된 개별 메일  - mailDetail을 보여주기 위함
  selectedGroup: [], // 선택된 메일 그룹(받은사람 묶어보기 정렬) - mailPreview를 위함

  isExpanded: false, // mailDetailMax 확장 여부

  // 메일 리스트 설정 함수
  setReceivedMails: (mails) => set({ receiveMails: mails }),
  setSentMails: (mails) => set({ sentMails: mails }),
  setDeletedMails: (mails) => set({ deletedMails: mails }),
  setDraftMails: (mails) => set({ draftMails: mails }),
  setImportantMails: (mails) => set({ importantMails: mails }),
  setScheduledMails: (mails) => set({ scheduledMails: mails }),
  setSelfSentMails: (mails) => set({ selfSentMails: mails }),
  setSpamMails: (mails) => set({ spamMails: mails }),

  // 그룹화 설정 함수
  setGroupedMails: (mails) =>
    set(() => {
      const groupedMap = mails.reduce((acc, mail) => {
        const key =
          extractEmailAddress(mail.sender) ??
          extractEmailAddress(mail.receiver) ??
          "unknown";
        if (!acc[key]) acc[key] = [];
        acc[key].push(mail);
        return acc;
      }, {});

      const groupedArray = Object.entries(groupedMap)
        .map(([contact, mailItems]) => ({
          sender: contact,
          mailItems: mailItems.sort((a, b) => {
            const dateA = new Date(
              a.receiveAt ?? a.sendAt ?? "1970-01-01"
            ).getTime();
            const dateB = new Date(
              b.receiveAt ?? b.sendAt ?? "1970-01-01"
            ).getTime();
            return dateB - dateA; // 최신 순 정렬
          }),
        }))
        .sort((a, b) => {
          const firstA = a.mailItems[0]; // 최신 메일
          const firstB = b.mailItems[0];

          const dateA = new Date(
            firstA.receiveAt ?? firstA.sendAt ?? "1970-01-01"
          ).getTime();
          const dateB = new Date(
            firstB.receiveAt ?? firstB.sendAt ?? "1970-01-01"
          ).getTime();

          return dateB - dateA; // 최신 순 정렬 (그룹 자체)
        });

      return { groupedMails: groupedArray };
    }),
  setGroupedMailsFromSearch: (emails, senderEmail) =>
    set(() => {
      const sanitizedMails = emails.map((mail) => {
        if (mail.mailType === "received") {
          return { ...mail, receiver: null };
        } else if (mail.mailType === "sent") {
          return { ...mail, sender: null };
        }
        return mail;
      });

      const sortedMails = sanitizedMails.sort((a, b) => {
        const dateA = new Date(
          a.receiveAt ?? a.sendAt ?? a.createdAt ?? "1970-01-01"
        ).getTime();
        const dateB = new Date(
          b.receiveAt ?? b.sendAt ?? b.createdAt ?? "1970-01-01"
        ).getTime();
        return dateB - dateA; // 최신순 정렬
      });

      return {
        groupedMails: [
          {
            sender: senderEmail, // 검색어 이메일
            mailItems: sortedMails,
          },
        ],
      };
    }),

  // 상태 처리
  setStatus: (status) => set({ status }),
  setError: (error) => set({ error }),

  // 선택된 메일 설정 함수
  setSelectedMail: (mail) => set({ selectedMail: mail ? { ...mail } : null }),

  setSelectedGroup: (mails) =>
    set(() => {
      const updatedMails = mails.map((mail) => ({ ...mail })).reverse();

      return {
        selectedGroup: updatedMails,
      };
    }),

  // mailDetailMax 확장 여부 토글
  toggleExpanded: () => set((state) => ({ isExpanded: !state.isExpanded })),
  // 선택된 메일, 확장 여부 초기화
  reset: () => set({ selectedMail: null, isExpanded: false }),
}));
