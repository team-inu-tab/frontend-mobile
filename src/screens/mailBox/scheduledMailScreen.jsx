import "@screens/mailBox/css/mailScreen.css";
import MailDetail from "../../components/mailBox/mailDetail";
import TimeSortedList from "../../components/mailBox/timeSortedList";
import { useMailStore } from "../../store";

const ScheduledMailScreen = () => {
  const selectedMail = useMailStore((state) => state.selectedMail);
  const scheduledMails = useMailStore((state) => state.scheduledMails);

  return (
    <div className="MailScreen-container">
      {/* 왼쪽: 메일 목록 */}
      <div className="MailScreen-list">
        <TimeSortedList mails={scheduledMails} />
      </div>

      {/* 오른쪽: 메일 상세 내용 */}
      <div className="MailScreen-preview">
        {selectedMail ? <MailDetail /> : null}
      </div>
    </div>
  );
};

export default ScheduledMailScreen;
