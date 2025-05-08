import "@components/mailBox/css/senderGroupedItem.css";
import MailListItem from "./mailListItem";
import { useMailStore } from "../../store";
import { extractSenderName } from "../../utils/emailUtils";
import { useLocation, useNavigate } from "react-router-dom";

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
  const location = useLocation();
  const navigate = useNavigate();

  const setSelectedGroup = useMailStore((state) => state.setSelectedGroup);

  // 현재 페이지의 메일함 타입을 추출
  let boxType = "";
  switch (true) {
    case location.pathname.includes("/receive"):
      boxType = "receive";
      break;
    case location.pathname.includes("/important"):
      boxType = "important";
      break;
    case location.pathname.includes("/deleted"):
      boxType = "deleted";
      break;
    case location.pathname.includes("/draft"):
      boxType = "draft";
      break;
    case location.pathname.includes("/scheduled"):
      boxType = "scheduled";
      break;
    case location.pathname.includes("/selfsent"):
      boxType = "selfsent";
      break;
    case location.pathname.includes("/sent"):
      boxType = "sent";
      break;
    case location.pathname.includes("/spam"):
      boxType = "spam";
      break;
    default:
  }

  const handleSelectGroup = (mail) => {
    navigate(`/mail/${boxType}/preview/${mail.id}`);
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
