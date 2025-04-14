import "@components/mailBox/css/mailListItem.css";
import { useCheckboxStore, useMailStore } from "../../store";
import Star from "@assets/icons/star.svg?react";
import { useLocation, useNavigate } from "react-router-dom";
import { extractSenderName, formatReceiveDate } from "../../utils/emailUtils";

/**
 * MailListItem - 개별 메일 항목을 렌더링하는 컴포넌트
 * @returns {JSX.Element} 메일 리스트 항목 컴포넌트
 */
const MailListItem = ({ mail }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const check = useCheckboxStore((state) => state.check);
  const uncheck = useCheckboxStore((state) => state.uncheck);
  const setSelectedMail = useMailStore((state) => state.setSelectedMail);

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

  // 메일 클릭 핸들러
  const handleMailClick = () => {
    if (mail.draftId) {
      navigate(`/mail/compose/${mail.id}?mode=draft`); // 임시 메일 클릭 시 작성 페이지로 이동
    } else {
      setSelectedMail(mail);
    }
  };

  // 체크박스 상태 반영
  const checked = useCheckboxStore(
    (state) => state.checkedByBox[boxType]?.has(mail.id) || false
  );

  // 체크박스 상태 변경 핸들러
  const handleCheckboxChange = (e) => {
    const isCheckedNow = e.target.checked;
    if (isCheckedNow) {
      check(boxType, mail.id);
    } else {
      uncheck(boxType, mail.id);
    }
  };

  return (
    <div className="mailListItem-wrapper">
      {/* 메일 선택 체크박스 */}
      <label className="mailListItem-custom-checkBox">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleCheckboxChange}
          onClick={(e) => e.stopPropagation()} // 부모 클릭 방지
        />
        <span className="checkmark"></span>
      </label>

      {/* 중요 메일 표시 */}
      <div className="mailListItem-star-container">
        <Star
          className={`mailListItem-star ${mail.isImportant ? "important" : ""}`}
        />
      </div>

      {/* 메일 정보 (클릭 시 상세 보기) */}
      <div className="mailListItem-mailInfo" onClick={handleMailClick}>
        {/* 발신자 이름 */}
        <span
          className={`mailListItem-sender ${
            boxType === "selfsent" ? "self" : ""
          }`}
        >
          {extractSenderName(mail.sender) ?? extractSenderName(mail.receiver)}
        </span>

        <div className="mailListItem-title-container">
          {/* 첨부 파일 아이콘 */}
          {mail.fileNameList && mail.fileNameList.length > 0 && (
            <img
              src="/src/assets/icons/attachment.svg"
              alt="Attachment icon for email"
            />
          )}
          {/* 메일 제목 */}
          <span className="mailListItem-title">{mail.title}</span>
        </div>

        {/* 수신 시간 */}
        <span className="mailListItem-receiveAt">
          {formatReceiveDate(mail.receiveAt ?? mail.sendAt ?? mail.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default MailListItem;
