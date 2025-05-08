import "@components/mailBox/css/senderGroupedList.css";
import SenderGroupedItem from "./senderGroupedItem";

/**
 * SenderGroupedList - 발신자별로 그룹화된 메일 목록을 표시하는 리스트 컴포넌트
 * @returns {JSX.Element} 발신자별로 그룹화된 메일 리스트 UI
 */
const SenderGroupedList = ({ mails }) => {
  return (
    <div className="senderGroupedList-wrapper">
      {/* 각 발신자의 메일 목록을 그룹화하여 렌더링 */}
      {mails?.length > 0 ? (
        mails.map((group, index) => (
          <SenderGroupedItem
            key={index}
            sender={group.sender ?? group.receiver}
            mailItems={group.mailItems}
          />
        ))
      ) : (
        <p>📩 메일이 없습니다.</p>
      )}
    </div>
  );
};

export default SenderGroupedList;
