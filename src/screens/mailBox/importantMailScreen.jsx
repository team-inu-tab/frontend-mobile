import "@screens/mailBox/css/mailScreen.css";
import TimeSortedList from "../../components/mailBox/timeSortedList";
import { useLoadMailbox } from "../../hooks/useLoadMailbox";
import { useMailStore } from "../../store";
import { useEffect } from "react";

const ImportantMailScreen = () => {
  const loadMailbox = useLoadMailbox();
  useEffect(() => {
    loadMailbox("important");
  }, []);

  const importantMails = useMailStore((state) => state.importantMails);

  return (
    <div className="MailScreen-container">
      <div className="MailScreen-list">
        <TimeSortedList mails={importantMails} />
      </div>
    </div>
  );
};

export default ImportantMailScreen;
