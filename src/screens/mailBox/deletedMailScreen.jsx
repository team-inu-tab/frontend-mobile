import "@screens/mailBox/css/mailScreen.css";
import TimeSortedList from "../../components/mailBox/timeSortedList";
import { useMailStore } from "../../store";
import { useLoadMailbox } from "../../hooks/useLoadMailbox";
import { useEffect } from "react";

const DeletedMailScreen = () => {
  const loadMailbox = useLoadMailbox();
  useEffect(() => {
    loadMailbox("deleted");
  }, []);

  const deletedMails = useMailStore((state) => state.deletedMails);

  return (
    <div className="MailScreen-container">
      <div className="MailScreen-list">
        <TimeSortedList mails={deletedMails} />
      </div>
    </div>
  );
};

export default DeletedMailScreen;
