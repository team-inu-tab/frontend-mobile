import "@components/mailBox/css/mailListHeader.css";
import { useEffect, useMemo, useState } from "react";
import {
  useCheckboxStore,
  useSortStore,
  SORT_OPTIONS,
  useMailStore,
} from "../../store";
import Search from "@assets/icons/search.svg?react";
import Arrow from "@assets/icons/arrow.svg?react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMailApi } from "../../hooks/useMailApi";
import { getMailBoxConfig } from "../../utils/getMailBoxConfig";
import { useLoadMailbox } from "../../hooks/useLoadMailbox";
import toast from "react-hot-toast";
import { useInitMailbox } from "../../hooks/useInitMailbox";

/**
 * MailListHeader - 메일함 목록 상단의 헤더 컴포넌트
 * @returns {JSX.Element} 메일함 헤더
 */
const MailListHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const loadMailbox = useLoadMailbox();
  const initMailbox = useInitMailbox();

  const [isSortOptionOpen, setIsSortOptionOpen] = useState(false); // 정렬 옵션 상태
  const [searchInput, setSearchInput] = useState(""); // 검색어

  const changeSortOption = useSortStore((state) => state.changeSortOption);
  const checkAll = useCheckboxStore((state) => state.checkAll);
  const uncheckAll = useCheckboxStore((state) => state.uncheckAll);
  const getCheckedIds = useCheckboxStore((state) => state.getCheckedIds);
  const setSelectedMail = useMailStore((state) => state.setSelectedMail);
  const setSelectedGroup = useMailStore((state) => state.setSelectedGroup);
  const selectedMail = useMailStore((state) => state.selectedMail);
  const receiveMails = useMailStore((state) => state.receiveMails);
  const sentMails = useMailStore((state) => state.sentMails);
  const draftMails = useMailStore((state) => state.draftMails);
  const importantMails = useMailStore((state) => state.importantMails);
  const deletedMails = useMailStore((state) => state.deletedMails);
  const scheduledMails = useMailStore((state) => state.scheduledMails);
  const selfSentMails = useMailStore((state) => state.selfSentMails);
  const spamMails = useMailStore((state) => state.spamMails);

  const {
    markAsSpam,
    unmarkAsSpam,
    deleteTemporaryMails,
    deletePermanentMails,
  } = useMailApi();

  // 정렬 옵션 열림/닫힘 상태를 토글하는 함수
  const toggleOption = () => setIsSortOptionOpen((prev) => !prev);

  // 정렬 옵션을 변경하는 함수
  const handleSortOptionClick = (option) => {
    changeSortOption(option);
    toggleOption();
  };

  // 페이지 이동할 때 검색창 초기화
  useEffect(() => {
    const isSearchPage = location.pathname.includes("/mail/search");
    if (!isSearchPage) {
      setSearchInput("");
    }
  }, [location.pathname]);

  // boxType, mails, isSortOption 먼저 가져오기
  const { boxType, mails, isSortOption } = getMailBoxConfig({
    pathname: location.pathname,
    stores: {
      receiveMails,
      sentMails,
      draftMails,
      importantMails,
      deletedMails,
      scheduledMails,
      selfSentMails,
      spamMails,
    },
    actions: {},
  });

  const mailIds = useMemo(() => mails?.map((mail) => mail.id) || [], [mails]);

  // 메일함 새로고침 함수
  const refreshMailbox = async () => {
    try {
      if (boxType === "receive" || boxType === "sent") {
        // 필요한 메일함만 초기화
        await Promise.all([
          initMailbox(boxType),
          setSelectedMail(null),
          setSelectedGroup([]),
          uncheckAll(boxType),
        ]);
      } else {
        // 특정 메일함만 로드
        await Promise.all([
          loadMailbox(boxType),
          setSelectedMail(null),
          setSelectedGroup([]),
          uncheckAll(boxType),
        ]);
      }
    } catch (err) {
      console.error("메일 새로고침 실패:", err);
    }
  };

  // 스팸 차단
  const handleMarkSpam = async () => {
    const ids = getCheckedIds(boxType);
    if (ids.length === 0) return;

    try {
      await Promise.all(ids.map((id) => markAsSpam(id)));
      await refreshMailbox();
      toast.success(`${ids.length}개의 메일이 스팸으로 분류되었습니다.`);
    } catch {
      toast.error("스팸 등록에 실패했습니다.");
    }
  };

  // 스팸 해제
  const handleUnmarkSpam = async () => {
    const ids = getCheckedIds(boxType);
    if (ids.length === 0) return;

    try {
      await Promise.all(ids.map((id) => unmarkAsSpam(id)));
      await refreshMailbox();
      toast.success(`${ids.length}개의 메일이 스팸에서 해제되었습니다.`);
    } catch {
      toast.error("스팸 해제에 실패했습니다.");
    }
  };

  // 메일 삭제 (임시)
  const handleDeleteTemporary = async () => {
    const ids = getCheckedIds(boxType);
    if (ids.length === 0) return;

    try {
      await deleteTemporaryMails(ids);
      await refreshMailbox();
      toast.success(`${ids.length}개의 메일이 휴지통으로 이동되었습니다.`);
    } catch {
      toast.error("휴지통으로 이동에 실패했습니다.");
    }
  };

  // 메일 삭제 (영구)
  const handleDeletePermanent = async () => {
    const ids = getCheckedIds(boxType);
    if (ids.length === 0) return;

    try {
      await deletePermanentMails(ids);
      await refreshMailbox();
      toast.success(`${ids.length}개의 메일이 영구 삭제되었습니다.`);
    } catch {
      toast.error("영구 삭제에 실패했습니다.");
    }
  };

  // 검색 처리 핸들러
  const handleSearch = () => {
    if (!searchInput.trim()) return;
    navigate(`/mail/search?query=${encodeURIComponent(searchInput.trim())}`);
  };

  // 답장 버튼 클릭 핸들러
  const handleReply = () => {
    navigate(`/mail/compose/${selectedMail.id}?mode=reply`);
  };

  // 전달 버튼 클릭 핸들러
  const handleForward = () => {
    navigate(`/mail/compose/${selectedMail.id}?mode=forward`);
  };

  // 메일 타입에 따라 기능 버튼들을 동적으로 생성
  const { mailTools } = getMailBoxConfig({
    pathname: location.pathname,
    stores: {
      receiveMails,
      sentMails,
      draftMails,
      importantMails,
      deletedMails,
      scheduledMails,
      selfSentMails,
      spamMails,
    },
    actions: {
      handleMarkSpam,
      handleUnmarkSpam,
      handleDeletePermanent,
      handleReply,
      handleForward,
    },
    selectedMail,
  });

  // 모든 메일이 선택됐는지 여부
  const allChecked = useCheckboxStore((s) => s.isAllChecked(boxType, mailIds));

  // 전체 선택/해제 핸들러
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      checkAll(boxType, mailIds);
    } else {
      uncheckAll(boxType);
    }
  };

  return (
    <div className="mailListHeader-wrapper">
      <div className="mailListHeader-left">
        {/* 메일 선택 및 액션 버튼 */}
        <div className="mailListHeader-mailActions">
          {/* 전체 선택 체크박스 */}
          <label className="mailListHeader-custom-checkBox">
            <input
              type="checkbox"
              checked={allChecked}
              onChange={handleSelectAll}
            />
            <span className="checkmark"></span>
          </label>

          <button className="mailActions-items">읽음</button>
          {boxType != "deleted" && boxType != "spam" && (
            <button
              className="mailActions-items"
              onClick={handleDeleteTemporary}
            >
              삭제
            </button>
          )}
        </div>

        {/* 정렬 옵션 */}
        {isSortOption && (
          <div className="mailListHeader-sortOptions">
            <button
              className="mailListHeader-sortOptions-items"
              onClick={toggleOption}
            >
              정렬
              <Arrow
                className={`mailListHeader-sortOptions-arrow ${
                  isSortOptionOpen ? "open" : ""
                }`}
              />
            </button>

            {isSortOptionOpen && (
              <div className="mailListHeader-sortOptions-container">
                <p onClick={() => handleSortOptionClick(SORT_OPTIONS.TIME)}>
                  시간순 보기
                </p>
                <p onClick={() => handleSortOptionClick(SORT_OPTIONS.SENDER)}>
                  받은사람 묶어보기
                </p>
              </div>
            )}
          </div>
        )}

        {/* 메일 기능 도구 (예: 답장, 전달 등) */}
        <div className="mailListHeader-mailTools">{mailTools}</div>
      </div>

      {/* 검색창 */}
      <div className="mailListHeader-searchBar">
        <input
          type="text"
          className="search-input"
          placeholder="이메일 검색"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <Search className="search-icon" onClick={handleSearch} />
      </div>
    </div>
  );
};
export default MailListHeader;
