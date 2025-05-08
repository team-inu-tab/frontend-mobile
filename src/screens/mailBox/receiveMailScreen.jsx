import "@screens/mailBox/css/mailScreen.css";
import TimeSortedList from "../../components/mailBox/timeSortedList";
import { useSortStore, SORT_OPTIONS, useMailStore } from "../../store";
import SenderGroupedList from "../../components/mailBox/senderGroupedList";
import { useInitMailbox } from "../../hooks/useInitMailbox";
import { useEffect } from "react";

const ReceiveMailScreen = () => {
  const initMailbox = useInitMailbox();
  useEffect(() => {
    initMailbox();
  }, []);

  const sortOption = useSortStore((state) => state.sortOption);
  const receiveMails = useMailStore((state) => state.receiveMails);
  const groupedMails = useMailStore((state) => state.groupedMails);

  return (
    <div className="MailScreen-container">
      <div className="MailScreen-list">
        {sortOption === SORT_OPTIONS.TIME ? (
          <TimeSortedList mails={receiveMails} />
        ) : (
          <SenderGroupedList mails={groupedMails} />
        )}
      </div>
    </div>
  );
};

export default ReceiveMailScreen;
