import "@components/mailBox/css/mailBoxLayout.css";
import MenuBar from "../menu/menuBar";
import { useMailStore, useMenuStore } from "../../store";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import MailListHeaderM from "./mailListHeaderM";
import MailListHeader from "./mailListHeader";
import backgroundImg from "@assets/images/m_background.svg";

const MailBoxLayout = () => {
  const isMenuBarOpen = useMenuStore((state) => state.isMenuBarOpen);
  const setSelectedMail = useMailStore((state) => state.setSelectedMail);
  const setSelectedGroup = useMailStore((state) => state.setSelectedGroup);

  useEffect(() => {
    setSelectedMail(null);
    setSelectedGroup([]);
  });

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
      {isMenuBarOpen && <MenuBar />}
      <MailListHeaderM />
      <MailListHeader isMain={true} />
      <div className="mailBoxLayout-common">
        <Outlet />
      </div>
    </div>
  );
};
export default MailBoxLayout;
