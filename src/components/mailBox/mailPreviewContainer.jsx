import "@components/mailBox/css/mailPreviewContainer.css";
import MailPreviewItem from "./mailPreviewItem";
import { useMailStore } from "../../store";

/**
 * MailPreviewContainer - 메일 미리보기 목록을 감싸는 컨테이너 컴포넌트
 * @returns {JSX.Element} 메일 미리보기 리스트 UI
 */
const MailPreviewContainer = () => {
  const selectedGroup = useMailStore((state) => state.selectedGroup);

  if (!Array.isArray(selectedGroup) || selectedGroup.length === 0) {
    return null;
  }

  return (
    <div className="mailPreviewContainer-wrapper">
      {selectedGroup.map((mail) => (
        <MailPreviewItem key={mail.id} mail={mail} />
      ))}
    </div>
  );
};

export default MailPreviewContainer;
