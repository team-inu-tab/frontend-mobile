import "@components/mailBox/css/mailBoxLayout.css";
import MenuBar from "../menu/menuBar";
import { useMailStore, useMenuStore } from "../../store";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import MailListHeaderM from "./mailListHeaderM";

const MailBoxLayout = () => {
  const isMenuBarOpen = useMenuStore((state) => state.isMenuBarOpen);
  const setSelectedMail = useMailStore((state) => state.setSelectedMail);
  const setSelectedGroup = useMailStore((state) => state.setSelectedGroup);

  const location = useLocation();
  const modalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedMail(null);
    setSelectedGroup([]);
  });

  return (
    <div
      className={`mailBoxLayout-container ${
        isMenuBarOpen ? "menuBar-open" : ""
      }`}
    >
      {isMenuBarOpen && <MenuBar />}
      <MailListHeaderM />
      <div className="mailBoxLayout-common">
        <Outlet />
      </div>
    </div>
  );
};
export default MailBoxLayout;
