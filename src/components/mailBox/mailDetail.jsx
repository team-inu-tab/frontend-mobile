import "@components/mailBox/css/mailDetail.css";
import { useMailStore } from "../../store";
import FileItem from "./fileItem";
import { useEffect, useState } from "react";
import { formatReceiveDate } from "../../utils/emailUtils";
import { parseGmailContent } from "../../utils/parseGmailContent";

/**
 * MailDetail - 선택된 메일의 상세 내용을 표시하는 컴포넌트
 * @returns {JSX.Element | null} 메일 상세 정보 UI (선택된 메일이 없으면 null 반환)
 */
const MailDetail = () => {
  const selectedMail = useMailStore((state) => state.selectedMail); // 현재 선택된 메일 가져오기

  const [decodedBody, setDecodedBody] = useState("");

  // content 파싱 및 이미지 포함 본문, 첨부파일 렌더링
  useEffect(() => {
    const load = async () => {
      if (selectedMail?.content) {
        const { html } = await parseGmailContent(
          selectedMail.content,
          selectedMail.id
        );
        setDecodedBody(html);
      }
    };
    load();
  }, [selectedMail]);

  if (!selectedMail?.id) {
    return null;
  }

  // 중요 메일, 휴지통 메일함 mailType 구분
  if (selectedMail.mailType === "received") selectedMail.receiver = null;
  else if (selectedMail.mailType === "sent") selectedMail.sender = null;

  return (
    <div className="mailDetail-wrapper">
      <div className="mailDetail-container">
        {/* 메일 정보 */}
        <div className="mailDetail-header">
          {/* 메일 제목 */}
          <span className="mailDetail-title">{selectedMail.title}</span>
          {/* 메일 수신자 및 발신자 */}
          {selectedMail.sender && (
            <span className="mailDetail-sender">
              보낸사람: {selectedMail.sender}
            </span>
          )}
          {selectedMail.receiver && (
            <span className="mailDetail-sender">
              받는사람: {selectedMail.receiver}
            </span>
          )}
          {/* 메일 수신 및 발신 시간 */}
          <span className="mailDetail-receiveAt">
            {formatReceiveDate(selectedMail.receiveAt ?? selectedMail.sendAt)}
          </span>
        </div>

        {/* 첨부 파일 */}
        {selectedMail?.fileNameList?.length > 0 && (
          <div className="mailDetail-files">
            <span className="mailDetail-files-title">
              첨부파일 {selectedMail.fileNameList.length}개
            </span>
            <div className="mailDetail-files-list">
              {selectedMail.fileNameList.map((file) => (
                <FileItem
                  key={file.attachmentId}
                  fileName={file.fileName}
                  emailId={selectedMail.id}
                  attachmentId={file.attachmentId}
                  isPreview={false}
                />
              ))}
            </div>
          </div>
        )}

        {/* 메일 본문 내용 */}
        <div
          className="mailDetail-content"
          dangerouslySetInnerHTML={{ __html: decodedBody }}
        />
      </div>
    </div>
  );
};
export default MailDetail;
