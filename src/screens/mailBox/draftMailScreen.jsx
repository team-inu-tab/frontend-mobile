import "@screens/mailBox/css/mailScreen.css";
import MailDetail from "../../components/mailBox/mailDetail";
import MailDetailMax from "../../components/mailBox/mailDetailMax";
import TimeSortedList from "../../components/mailBox/timeSortedList";
import { useLoadMailbox } from "../../hooks/useLoadMailbox";
import { useMailStore } from "../../store";
import { useEffect } from "react";

const DraftMailScreen = () => {
  const loadMailbox = useLoadMailbox();
  useEffect(() => {
    loadMailbox("draft");
  }, []);

  const selectedMail = useMailStore((state) => state.selectedMail);
  const isExpanded = useMailStore((state) => state.isExpanded);
  const draftMails = useMailStore((state) => state.draftMails);

  return (
    <div className="MailScreen-container">
      {isExpanded ? (
        <MailDetailMax />
      ) : (
        <>
          {/* 왼쪽: 메일 목록 */}
          <div className="MailScreen-list">
            <TimeSortedList mails={draftMails} />
          </div>

          {/* 오른쪽: 메일 상세 내용 */}
          <div className="MailScreen-preview">
            {selectedMail ? <MailDetail /> : null}
          </div>
        </>
      )}
    </div>
  );
};

export default DraftMailScreen;
