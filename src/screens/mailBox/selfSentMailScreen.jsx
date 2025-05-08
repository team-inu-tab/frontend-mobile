import "@screens/mailBox/css/mailScreen.css";
import TimeSortedList from "../../components/mailBox/timeSortedList";
import { useLoadMailbox } from "../../hooks/useLoadMailbox";
import { useMailStore } from "../../store";
import { useEffect } from "react";

const SelfSentMailScreen = () => {
  const loadMailbox = useLoadMailbox();
  useEffect(() => {
    loadMailbox("self");
  }, []);

  const selfSentMails = useMailStore((state) => state.selfSentMails);

  return (
    <div className="MailScreen-container">
      <div className="MailScreen-list">
        <TimeSortedList mails={selfSentMails} />
      </div>
    </div>
  );
};

export default SelfSentMailScreen;
