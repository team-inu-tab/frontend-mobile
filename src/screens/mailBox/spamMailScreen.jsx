import "@screens/mailBox/css/mailScreen.css";
import MailDetail from "../../components/mailBox/mailDetail";
import TimeSortedList from "../../components/mailBox/timeSortedList";
import { useLoadMailbox } from "../../hooks/useLoadMailbox";
import { useMailStore } from "../../store";
import { useEffect } from "react";

const SpamMailScreen = () => {
  const loadMailbox = useLoadMailbox();
  useEffect(() => {
    loadMailbox("spam");
  }, []);

  const selectedMail = useMailStore((state) => state.selectedMail);
  const spamMails = useMailStore((state) => state.spamMails);

  return (
    <div className="MailScreen-container">
      {/* 왼쪽: 메일 목록 */}
      <div className="MailScreen-list">
        <TimeSortedList mails={spamMails} />
      </div>

      {/* 오른쪽: 메일 상세 내용 */}
      <div className="MailScreen-preview">
        {selectedMail ? <MailDetail /> : null}
      </div>
    </div>
  );
};

export default SpamMailScreen;
