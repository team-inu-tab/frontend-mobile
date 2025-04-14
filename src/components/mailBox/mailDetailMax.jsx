import "@components/mailBox/css/mailDetailMax.css";
import { useMailStore } from "../../store";
import ExpandArrow from "@assets/icons/expandArrow.svg?react";
import FileItem from "./fileItem";
import { formatReceiveDate } from "../../utils/emailUtils";
import { useEffect, useState } from "react";
import { parseGmailContent } from "../../utils/parseGmailContent";

const MailDetailMax = () => {
  const selectedMail = useMailStore((state) => state.selectedMail); // 현재 선택된 메일 가져오기
  const toggleExpanded = useMailStore((state) => state.toggleExpanded);

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

  // 선택된 메일이 없으면 화면에 표시하지 않음
  if (!selectedMail?.id) {
    return null;
  }

  // 중요 메일, 휴지통 메일함 mailType 구분
  if (selectedMail.mailType === "received") selectedMail.receiver = null;
  else if (selectedMail.mailType === "sent") selectedMail.sender = null;

  return (
    <div className="mailDetailMax-wrapper">
      <div className="mailDetailMax-container">
        {/* 메일 제목 및 발신자 정보 */}
        <div className="mailDetailMax-header">
          <div className="mailDetailMax-header-container">
            <span className="mailDetailMax-title">{selectedMail.title}</span>
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
          </div>
          {/* 확장 버튼 */}
          <ExpandArrow className="expandArrow-icon" onClick={toggleExpanded} />
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

      {/* 메일 수신 시간 정보 */}
      <div className="mailDetailMax-footer">
        <span className="mailDetailMax-receiveAt">
          {formatReceiveDate(selectedMail.receiveAt ?? selectedMail.sendAt)}
        </span>
      </div>
    </div>
  );
};
export default MailDetailMax;
