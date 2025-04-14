import "@screens/mailBox/css/mailScreen.css";
import { useMailStore } from "../../store";
import SenderGroupedList from "../../components/mailBox/senderGroupedList";
import MailPreviewContainer from "../../components/mailBox/mailPreviewContainer";
import MailDetailMax from "../../components/mailBox/mailDetailMax";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useMailApi } from "../../hooks/useMailApi";

const SearchMailScreen = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  const isExpanded = useMailStore((state) => state.isExpanded);
  const setStatus = useMailStore((state) => state.setStatus);
  const status = useMailStore((state) => state.status);
  const setGroupedMailsFromSearch = useMailStore(
    (state) => state.setGroupedMailsFromSearch
  );
  const groupedMails = useMailStore((state) => state.groupedMails);

  const { searchMailsByUserEmail } = useMailApi();

  useEffect(() => {
    if (!query) return;
    const fetchData = async () => {
      setStatus("loading");
      try {
        const res = await searchMailsByUserEmail(query);

        setGroupedMailsFromSearch(res.emails, query);
        setStatus("succeeded");
      } catch (e) {
        console.error("검색 실패", e);
        setStatus("failed");
      }
    };
    fetchData();
  }, [query]);

  if (!query) return <div>검색어를 입력해주세요.</div>;

  return (
    <div className="MailScreen-container">
      {isExpanded ? (
        <MailDetailMax />
      ) : (
        <>
          {/* 왼쪽: 메일 목록 */}
          <div className="MailScreen-list">
            {status === "loading" ? (
              <p>🔍 검색 중입니다...</p>
            ) : status === "failed" ||
              (status === "succeeded" && groupedMails.length === 0) ? (
              <p>📭 검색 결과가 없습니다.</p>
            ) : (
              <SenderGroupedList mails={groupedMails} />
            )}
          </div>

          {/* 오른쪽: 선택된 항목에 따라 변경 */}
          <div className="MailScreen-preview">
            <MailPreviewContainer />
          </div>
        </>
      )}
    </div>
  );
};

export default SearchMailScreen;
