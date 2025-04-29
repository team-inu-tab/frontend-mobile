import "@components/mailBox/css/mailBoxLayout.css";
import MenuBar from "../menu/menuBar";
import { useMailStore, useMenuStore } from "../../store";
import { Outlet } from "react-router-dom";
import { useEffect, useRef } from "react";
import MailListHeaderM from "./mailListHeaderM";
import MailListHeader from "./mailListHeader";
import backgroundImg from "@assets/images/m_background.svg";

const MailBoxLayout = () => {
  const isMenuBarOpen = useMenuStore((state) => state.isMenuBarOpen);
  const toggleMenuBar = useMenuStore((state) => state.toggleMenuBar);
  const setSelectedMail = useMailStore((state) => state.setSelectedMail);
  const setSelectedGroup = useMailStore((state) => state.setSelectedGroup);

  const menuBarRef = useRef(null);

  useEffect(() => {
    setSelectedMail(null);
    setSelectedGroup([]);
  });

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

    // 모바일 + 데스크탑 모두 대응
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
      <MailListHeader isMain={true} />
      <div className="mailBoxLayout-common">
        <Outlet />
      </div>
    </div>
  );
};
export default MailBoxLayout;
