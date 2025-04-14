import "@components/menu/css/subMenu.css";
import SubMenuItem from "@components/menu/subMenuItem.jsx";
import { useState } from "react";
import Mailbox from "@assets/icons/mailbox.svg?react";
import { useLocation } from "react-router-dom";

/**
 * SubMenu - 메일 관련 서브 메뉴 컴포넌트
 * @param {boolean} props.isMenuBarOpen - 메뉴바가 열려 있는지 여부
 * @returns {JSX.Element} 서브 메뉴 컴포넌트
 */
const SubMenu = ({ isMenuBarOpen }) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith("/mail/");

  const [isSubMenuOpen, setIsSubMenuOpen] = useState(true); // 서브 메뉴 열림/닫힘 상태 관리

  /**
   * 메일함 카테고리 목록
   */
  const mailBox = [
    "receiveMail",
    "sentMail",
    "selfSentMail",
    "importantMail",
    // "scheduledMail",
    "draftMail",
    "spamMail",
    "deletedMail",
  ];

  /**
   * 서브 메뉴의 열림/닫힘 상태를 변경하는 함수
   */
  const toggleSubMenu = () => setIsSubMenuOpen((prev) => !prev);

  return (
    <div className={`subMenu-wrapper ${isMenuBarOpen ? "" : "subMenu-close"}`}>
      {/* 마우스 hover 시 나타나는 왼쪽 바 (선택 강조 효과) */}
      <div
        className={`subMenu-leftBar ${isMenuBarOpen ? "" : "subMenu-close"}`}
      />

      {/* 서브 메뉴 제목 및 클릭 시 확장/축소 기능 */}
      <div
        className={`subMenu-container ${isMenuBarOpen ? "" : "subMenu-close"} ${
          isSubMenuOpen ? "subMenu-subMenuOpen" : ""
        } ${isActive ? "active" : ""}`}
        onClick={toggleSubMenu}
      >
        {/* 서브 메뉴 아이콘 및 제목 */}
        <div
          className={`subMenu-textContainer ${
            isMenuBarOpen ? "" : "subMenu-close"
          }`}
        >
          <Mailbox
            className={`subMenu-icon ${isMenuBarOpen ? "" : "subMenu-close"}`}
          />
          <span
            className={`subMenu-text ${isMenuBarOpen ? "" : "subMenu-close"}`}
          >
            메일함
          </span>
        </div>

        {/* 서브 메뉴 열림/닫힘 화살표 아이콘 */}
        <img
          className={`subMenu-arrow ${isMenuBarOpen ? "" : "subMenu-close"} ${
            isSubMenuOpen ? "subMenu-subMenuOpen" : ""
          }`}
          src="/src/assets/icons/arrow.svg"
          alt="화살표 아이콘"
        />
      </div>

      {/* 서브 메뉴 항목 (메일함 리스트) */}
      <div
        className={`subMenu-subMenuItemsContainer ${
          isMenuBarOpen ? "" : "subMenu-close"
        } ${isSubMenuOpen ? "subMenu-subMenuOpen" : ""}`}
      >
        {mailBox.map((title) => (
          <SubMenuItem
            key={title}
            title={title}
            isMenuBarOpen={isMenuBarOpen}
          />
        ))}
      </div>
    </div>
  );
};

export default SubMenu;
