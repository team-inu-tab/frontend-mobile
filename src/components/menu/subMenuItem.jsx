import "@components/menu/css/subMenuItem.css";
import { Link, useLocation } from "react-router-dom";
import { useMemo } from "react";

/**
 * SubMenuItem - 서브 메뉴의 개별 항목을 렌더링하는 컴포넌트
 * @param {"receiveMail" | "sentMail"| "selfSentMail"| "importantMail"| "scheduledMail" | "draftMail"| "spamMail"| "deletedMail"} props.title - 서브 메뉴의 타입
 * @param {boolean} props.isMenuBarOpen - 메뉴바가 열려 있는지 여부
 * @returns {JSX.Element} 서브 메뉴 항목
 */
const SubMenuItem = ({ title, isMenuBarOpen }) => {
  const location = useLocation();

  /**
   * title 값에 따라 아이콘 색상 및 한글 메뉴명을 설정
   */
  const { titleName, link, fillColor } = useMemo(() => {
    switch (title) {
      case "receiveMail":
        return {
          titleName: "받은 메일함",
          link: "/mail/receive",
          fillColor: "#A87CF6",
        };
      case "sentMail":
        return {
          titleName: "보낸 메일함",
          link: "/mail/sent",
          fillColor: "#7469F7",
        };
      case "selfSentMail":
        return {
          titleName: "내게쓴 메일함",
          link: "/mail/selfsent",
          fillColor: "#FF57F1",
        };
      case "importantMail":
        return {
          titleName: "중요 메일함",
          link: "/mail/important",
          fillColor: "#38FDE6",
        };
      case "scheduledMail":
        return {
          titleName: "예약 메일함",
          link: "/mail/scheduled",
          fillColor: "#A87CF6",
        };
      case "draftMail":
        return {
          titleName: "임시 보관함",
          link: "/mail/draft",
          fillColor: "#7469F7",
        };
      case "spamMail":
        return {
          titleName: "스팸 메일함",
          link: "/mail/spam",
          fillColor: "#FF57F1",
        };
      case "deletedMail":
        return {
          titleName: "휴지통",
          link: "/mail/deleted",
          fillColor: "#38FDE6",
        };
      default:
        return {
          titleName: "기본 메일함",
          link: "/mail",
          fillColor: "#CCCCCC",
        };
    }
  }, [title]);

  const isActive = location.pathname === `${link}`;

  return (
    <Link
      to={link}
      className={`subMenuItem-wrapper ${
        isMenuBarOpen ? "" : "subMenuItem-close"
      } ${isActive ? "active" : ""}`}
    >
      {/* 서브 메뉴 아이콘 */}
      <svg
        className="subMenuItem-ellipse"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 6 6"
        width="6"
        height="6"
      >
        <circle cx="3" cy="3" r="3" fill={fillColor} />
      </svg>
      {/* 서브 메뉴 텍스트 */}
      <span
        className={`subMenuItem-text ${
          isMenuBarOpen ? "" : "subMenuItem-close"
        }`}
      >
        {titleName}
      </span>
    </Link>
  );
};

export default SubMenuItem;
