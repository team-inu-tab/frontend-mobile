import "@screens/mailBox/css/mailScreen.css";
import TimeSortedList from "../../components/mailBox/timeSortedList";
import { useLoadMailbox } from "../../hooks/useLoadMailbox";
import { useMailStore } from "../../store";
import { useEffect } from "react";

const SpamMailScreen = () => {
  const loadMailbox = useLoadMailbox();
  useEffect(() => {
    loadMailbox("spam");
  }, []);

  const spamMails = useMailStore((state) => state.spamMails);

  return (
    <div className="MailScreen-container">
      <div className="MailScreen-list">
        <TimeSortedList mails={spamMails} />
      </div>
    </div>
  );
};

export default SpamMailScreen;
