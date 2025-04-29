import "@components/mailBox/css/fileItem.css";
import { useMailApi } from "../../hooks/useMailApi";
import toast from "react-hot-toast";

/**
 * FileItem - 첨부 파일 항목을 표시하는 컴포넌트
 * @returns {JSX.Element} 첨부 파일 UI 컴포넌트
 */
const FileItem = ({ fileName, emailId, attachmentId, isPreview }) => {
  const { getFile } = useMailApi();

  // 첨부파일 다운로드
  const handleClick = async () => {
    try {
      await getFile({ emailId, attachmentId, fileName });
    } catch (err) {
      console.log(err);
      toast.error("파일 다운로드에 실패했습니다.");
    }
  };

  return (
    <div
      className={`fileItem-wrapper ${isPreview ? "preview" : ""}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      {/* 첨부 파일 아이콘 */}
      <img
        className="fileItem-icon"
        src="/src/assets/icons/attachment.svg"
        alt="Attachment icon for email"
      />
      {/* 첨부 파일 이름 */}
      <span className="fileItem-name">{fileName}</span>
    </div>
  );
};
export default FileItem;
