import "@screens/mailBox/css/mailScreen.css";
import TimeSortedList from "../../components/mailBox/timeSortedList";
import { useMailStore } from "../../store";

const ScheduledMailScreen = () => {
  const scheduledMails = useMailStore((state) => state.scheduledMails);

  return (
    <div className="MailScreen-container">
      <div className="MailScreen-list">
        <TimeSortedList mails={scheduledMails} />
      </div>
    </div>
  );
};

export default ScheduledMailScreen;
