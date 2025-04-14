import "@components/mailBox/css/mailListHeaderM.css";
import { useState } from "react";
import {
  useSortStore,
  SORT_OPTIONS,
  useMailStore,
  useMenuStore,
} from "../../store";
import { useLocation } from "react-router-dom";
import Search from "@assets/icons/search.svg?react";
import People from "@assets/icons/people.svg?react";
import Time from "@assets/icons/time.svg?react";
import Menu from "@assets/icons/menu.svg?react";
import Back from "@assets/icons/arrow_back.svg?react";
import Delete from "@assets/icons/delete.svg?react";
import More from "@assets/icons/more.svg?react";

const MailListHeaderM = () => {
  const location = useLocation();

  const sortOption = useSortStore((state) => state.sortOption);
  const changeSortOption = useSortStore((state) => state.changeSortOption);
  const selectedMailId = useMailStore((state) => state.selectedMailId);
  const selectedGroup = useMailStore((state) => state.selectedGroup);
  const setSelectedMailId = useMailStore((state) => state.setSelectedMailId);
  const setSelectedGroup = useMailStore((state) => state.setSelectedGroup);

  const [isSortOptionOpen, setIsSortOptionOpen] = useState(false); // 정렬 옵션 상태

  const toggleMobileMenu = useMenuStore((state) => state.toggleMobileMenu);

  // 정렬 옵션 열림/닫힘 상태를 토글하는 함수
  const toggleOption = () => setIsSortOptionOpen((prev) => !prev);

  // 정렬 옵션을 변경하는 함수
  const handleSortOptionClick = (option) => {
    changeSortOption(option);
    toggleOption();
  };

  // 뒤로가기 눌렀을 때 선택 초기화
  const handleBack = () => {
    setSelectedMailId(null);
    setSelectedGroup([]);
  };

  // 메일 선택 시 헤더 전환
  const isPreviewing =
    selectedMailId !== null ||
    (Array.isArray(selectedGroup) && selectedGroup.length > 0);

  /**
   * 현재 위치에 따라 헤더 내용 동적으로 변경
   */
  const mailTitle = (() => {
    if (location.pathname.includes("/sent")) return "보낸메일함";
    if (location.pathname.includes("/deleted")) return "휴지통";
    if (location.pathname.includes("/draft")) return "임시보관함";
    if (location.pathname.includes("/scheduled")) return "예약메일함";
    if (location.pathname.includes("/receive")) return "받은메일함";
    if (location.pathname.includes("/important")) return "중요메일함";
    if (location.pathname.includes("/selfsent")) return "내게쓴메일함";
    if (location.pathname.includes("/spam")) return "스팸메일함";
    return "";
  })();

  return (
    <div className="mailListHeaderM-wrapper">
      {isPreviewing ? (
        <>
          {/* 뒤로가기 */}
          <button onClick={handleBack}>
            <Back className="mailListHeaderM-icon" />
          </button>

          <div className="mailListHeaderM-right">
            {/* 삭제 */}
            <button>
              <Delete className="mailListHeaderM-icon" />
            </button>

            {/* 더보기 */}
            <button>
              <More className="mailListHeaderM-icon" />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="mailListHeaderM-left">
            {/* 햄버거 메뉴 */}
            <button onClick={toggleMobileMenu}>
              <Menu className="mailListHeaderM-icon" />
            </button>
            {/* 정렬 옵션 */}
            <div className="mailListHeaderM-sortOptions">
              <button
                className="mailListHeaderM-sortOptions-items"
                onClick={toggleOption}
              >
                {sortOption === SORT_OPTIONS.SENDER ? (
                  <People className="mailListHeaderM-icon" />
                ) : (
                  <Time className="mailListHeaderM-icon" />
                )}
              </button>

              {isSortOptionOpen && (
                <div className="mailListHeaderM-sortOptions-container">
                  <p onClick={() => handleSortOptionClick(SORT_OPTIONS.TIME)}>
                    시간순 보기
                  </p>
                  <p onClick={() => handleSortOptionClick(SORT_OPTIONS.SENDER)}>
                    받은사람 묶어보기
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 메일함 타이틀 */}
          <p className="mailListHeaderM-title">{mailTitle}</p>

          {/* 검색 아이콘 */}
          <button>
            <Search className="mailListHeaderM-icon" />
          </button>
        </>
      )}
    </div>
  );
};
export default MailListHeaderM;
