import "@screens/mailBox/css/mailScreen.css";
import TimeSortedList from "../../components/mailBox/timeSortedList";
import { useLoadMailbox } from "../../hooks/useLoadMailbox";
import { useMailStore } from "../../store";
import { useEffect } from "react";

const DraftMailScreen = () => {
  const loadMailbox = useLoadMailbox();
  useEffect(() => {
    loadMailbox("draft");
  }, []);

  const draftMails = useMailStore((state) => state.draftMails);

  return (
    <div className="MailScreen-container">
      <div className="MailScreen-list">
        <TimeSortedList mails={draftMails} />
      </div>
    </div>
  );
};

export default DraftMailScreen;
