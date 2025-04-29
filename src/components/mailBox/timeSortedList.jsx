import "@components/mailBox/css/timeSortedList.css";
import MailListItem from "./mailListItem";
import { useMailStore } from "../../store";

/**
 * TimeSortedList - 시간순 정렬된 메일 목록을 표시하는 컴포넌트
 * @returns {JSX.Element} 시간순으로 정렬된 메일 리스트 UI
 */
const TimeSortedList = ({ mails }) => {
  const status = useMailStore((state) => state.status);

  return (
    <div className="timeSortedList-wrapper">
      {/* 메일 목록 컨테이너 */}
      <div className="timeSortedList-container">
        {status === "loading" || mails == null ? (
          <p>📩 메일을 불러오는 중...</p>
        ) : mails?.length > 0 ? (
          mails.map((mail) => <MailListItem key={mail.id} mail={mail} />)
        ) : (
          <p>📩 메일이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default TimeSortedList;
