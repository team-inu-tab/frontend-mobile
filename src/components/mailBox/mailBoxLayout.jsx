import "@components/mailBox/css/mailBoxLayout.css";
import MenuBar from "../menu/menuBar";
import { useMailStore, useMenuStore } from "../../store";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import MailListHeaderM from "./mailListHeaderM";
import MailListHeader from "./mailListHeader";
import backgroundImg from "@assets/images/m_background.svg";

const MailBoxLayout = () => {
  const isMenuBarOpen = useMenuStore((state) => state.isMenuBarOpen);
  const toggleMenuBar = useMenuStore((state) => state.toggleMenuBar);
  const selectedMail = useMailStore((state) => state.selectedMail);
  const setSelectedMail = useMailStore((state) => state.setSelectedMail);
  const setSelectedGroup = useMailStore((state) => state.setSelectedGroup);

  const menuBarRef = useRef(null);

  const location = useLocation();
  const isComposePage = location.pathname.includes("compose");

  useEffect(() => {
    //setSelectedMail(null);
    setSelectedGroup([]);
  });

  // 메뉴바 외부 클릭 시 메뉴바 닫기
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        isMenuBarOpen &&
        menuBarRef.current &&
        !menuBarRef.current.contains(e.target)
      ) {
        toggleMenuBar(false);
      }
    };

    document.addEventListener("touchstart", handleOutsideClick);
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("touchstart", handleOutsideClick);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMenuBarOpen, toggleMenuBar]);

  return (
    <div
      className={`mailBoxLayout-container ${
        isMenuBarOpen ? "menuBar-open" : ""
      }`}
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {isMenuBarOpen && <MenuBar ref={menuBarRef} />}
      <MailListHeaderM />
      {!isComposePage &&
        (selectedMail ? <MailListHeader /> : <MailListHeader isMain={true} />)}
      <div className="mailBoxLayout-common">
        <Outlet />
      </div>
    </div>
  );
};
export default MailBoxLayout;
