import "@screens/mailBox/css/mailScreen.css";
import SenderGroupedList from "../../components/mailBox/senderGroupedList";
import TimeSortedList from "../../components/mailBox/timeSortedList";
import { SORT_OPTIONS, useMailStore, useSortStore } from "../../store";
import { useInitMailbox } from "../../hooks/useInitMailbox";
import { useEffect } from "react";

const SentMailScreen = () => {
  const initMailbox = useInitMailbox();
  useEffect(() => {
    initMailbox();
  }, []);

  const sortOption = useSortStore((state) => state.sortOption);
  const sentMails = useMailStore((state) => state.sentMails);
  const groupedMails = useMailStore((state) => state.groupedMails);

  return (
    <div className="MailScreen-container">
      <div className="MailScreen-list">
        {sortOption === SORT_OPTIONS.TIME ? (
          <TimeSortedList mails={sentMails} />
        ) : (
          <SenderGroupedList mails={groupedMails} />
        )}
      </div>
    </div>
  );
};

export default SentMailScreen;
