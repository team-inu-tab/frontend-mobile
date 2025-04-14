// hooks/useLoadMailbox.ts
import { useMailApi } from "@/hooks/useMailApi";
import { useMailStore } from "../store";

export const useLoadMailbox = () => {
  const setDraftMails = useMailStore((state) => state.setDraftMails);
  const setSelfSentMails = useMailStore((state) => state.setSelfSentMails);
  const setImportantMails = useMailStore((state) => state.setImportantMails);
  const setSpamMails = useMailStore((state) => state.setSpamMails);
  const setDeletedMails = useMailStore((state) => state.setDeletedMails);
  const setStatus = useMailStore((state) => state.setStatus);
  const setError = useMailStore((state) => state.setError);

  const {
    fetchDraftMails,
    fetchImportantMails,
    fetchSelfSentMails,
    fetchSpamMails,
    fetchDeletedMails,
  } = useMailApi();

  const loadMailbox = async (type) => {
    setStatus("loading");
    try {
      let data;

      switch (type) {
        case "draft":
          data = await fetchDraftMails();
          setDraftMails(data.emails);
          break;
        case "important":
          data = await fetchImportantMails();
          setImportantMails(data.emails);
          break;
        case "self":
          data = await fetchSelfSentMails();
          setSelfSentMails(data.emails);
          break;
        case "spam":
          data = await fetchSpamMails();
          setSpamMails(data.emails);
          break;
        case "deleted":
          data = await fetchDeletedMails();
          setDeletedMails(data.emails);
          break;
        default:
          throw new Error("메일 타입을 찾을 수 없습니다.");
      }
      setStatus("succeeded");
    } catch (err) {
      setError(err.message || "메일 불러오기 실패");
      setStatus("failed");
    }
  };

  return loadMailbox;
};
