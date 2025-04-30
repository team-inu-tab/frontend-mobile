// hooks/useInitMailbox.ts
import { useMailApi } from "@/hooks/useMailApi";
import { useMailStore } from "@/store";

export const useInitMailbox = () => {
  const { fetchReceiveMails, fetchSentMails } = useMailApi();

  const setReceivedMails = useMailStore((s) => s.setReceivedMails);
  const setSentMails = useMailStore((s) => s.setSentMails);
  const setGroupedMails = useMailStore((s) => s.setGroupedMails);
  const setStatus = useMailStore((s) => s.setStatus);
  const setError = useMailStore((s) => s.setError);

  const initMailbox = async () => {
    setStatus("loading");
    try {
      const receiveRes = await fetchReceiveMails();
      const sentRes = await fetchSentMails();

      const receiveMails = receiveRes.emails;
      const sentMails = sentRes.emails;

      Promise.all([
        setReceivedMails(receiveMails),
        setSentMails(sentMails),
        setGroupedMails([...receiveMails, ...sentMails]),
      ]).then(() => {
        setStatus("succeeded");
      });
    } catch (error) {
      console.error("메일 초기화 실패:", error);
      setError("메일함 초기화 실패");
      setStatus("failed");
      throw error;
    }
  };

  return initMailbox;
};
