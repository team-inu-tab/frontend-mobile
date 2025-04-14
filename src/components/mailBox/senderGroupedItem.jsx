import "@components/mailBox/css/senderGroupedItem.css";
import MailListItem from "./mailListItem";
import { useMailStore } from "../../store";
import { extractSenderName } from "../../utils/emailUtils";

/**
 * SenderGroupedItem - 발신자별로 그룹화된 메일 목록을 표시하는 컴포넌트
 * @param {string} props.sender - 메일 발신자 이름
 * @param {Array<Object>} props.mailItems - 해당 발신자가 보낸 메일 목록
 * @param {string} props.mailItems[].id - 메일 ID
 * @param {string} props.mailItems[].title - 메일 제목
 * @param {string} props.mailItems[].receiveAt - 메일 수신 시간
 * @param {boolean} props.mailItems[].isChecked - 선택 여부
 * @param {boolean} props.mailItems[].isFileExist - 첨부 파일 존재 여부
 * @returns {JSX.Element} 발신자별 메일 리스트 UI
 */
const SenderGroupedItem = ({ sender, mailItems = [] }) => {
  const setSelectedGroup = useMailStore((state) => state.setSelectedGroup);

  const handleSelectGroup = (mail) => {
    setSelectedGroup(mail);
  };

  return (
    <div
      className="senderGroupedItem-wrapper"
      onClick={() => handleSelectGroup(mailItems)}
    >
      {/* 발신자 정보 */}
      <div className="senderGroupedItem-senderContainer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="6"
          height="6"
          viewBox="0 0 6 6"
          fill="none"
        >
          <circle cx="3" cy="3" r="3" fill="#A87CF6" />
        </svg>
        {/* 발신자 이름 */}
        <span className="senderGroupedItem-sender">
          {extractSenderName(sender)}
        </span>
      </div>

      {/* 해당 발신자가 보낸 메일 목록 */}
      <div className="senderGroupedItem-Container">
        {mailItems.map((mail) => (
          <MailListItem key={mail.id} mail={mail} />
        ))}
      </div>
    </div>
  );
};

export default SenderGroupedItem;
