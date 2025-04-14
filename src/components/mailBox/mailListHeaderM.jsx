import "@components/mailBox/css/mailListHeaderM.css";
import { useMailStore, useMenuStore } from "../../store";
import { useLocation } from "react-router-dom";
import Menu from "@assets/icons/menu.svg?react";
import Logo from "@assets/icons/logo.svg?react";

const MailListHeaderM = () => {
  const location = useLocation();

  const setSelectedMailId = useMailStore((state) => state.setSelectedMailId);
  const setSelectedGroup = useMailStore((state) => state.setSelectedGroup);
  const toggleMenuBar = useMenuStore((state) => state.toggleMenuBar);

  // 뒤로가기 눌렀을 때 선택 초기화
  const handleBack = () => {
    setSelectedMailId(null);
    setSelectedGroup([]);
  };

  /**
   * 현재 위치에 따라 헤더 내용 동적으로 변경
   */
  const mailTitle = (() => {
    if (location.pathname.includes("/sent")) return "보낸메일함";
    if (location.pathname.includes("/deleted")) return "휴지통";
    if (location.pathname.includes("/draft")) return "임시보관함";
    if (location.pathname.includes("/receive")) return "받은메일함";
    if (location.pathname.includes("/important")) return "중요메일함";
    if (location.pathname.includes("/selfsent")) return "내게쓴메일함";
    if (location.pathname.includes("/spam")) return "스팸메일함";
    return "";
  })();

  return (
    <div className="mailListHeaderM-wrapper">
      {/* 햄버거 메뉴 */}
      <button onClick={toggleMenuBar}>
        <Menu className="mailListHeaderM-icon" />
      </button>

      {/* 메일함 타이틀 */}
      <div className="mailListHeaderM-title-wrapper">
        <Logo />
        <p className="mailListHeaderM-title">{mailTitle}</p>
      </div>
    </div>
  );
};
export default MailListHeaderM;
