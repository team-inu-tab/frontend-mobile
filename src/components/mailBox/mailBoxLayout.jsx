import "@components/mailBox/css/mailBoxLayout.css";
import MailListHeader from "./mailListHeader";
import MenuBar from "../menu/menuBar";
import { useMailStore, useMenuStore } from "../../store";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useWriteStore } from "../../store/useWriteStore";
import MailWriteModal from "../common/mailWriteModal";

const MailBoxLayout = () => {
  const setSelectedMail = useMailStore((state) => state.setSelectedMail);
  const setSelectedGroup = useMailStore((state) => state.setSelectedGroup);
  const isMenuBarOpen = useMenuStore((state) => state.isMenuBarOpen);
  const isWriteModalOpen = useWriteStore((state) => state.isWriteModalOpen);
  const setWriteModalOpen = useWriteStore((state) => state.setWriteModalOpen);

  const location = useLocation();
  const modalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedMail(null);
    setSelectedGroup([]);

    const isComposeRoute = location.pathname.startsWith("/mail/compose");
    setWriteModalOpen(isComposeRoute);
  }, [location.pathname]);

  // 모달 열릴 때 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = isWriteModalOpen ? "hidden" : "";
  }, [isWriteModalOpen]);

  // 모달 외부 클릭 시 url 이동으로 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        // compose일 때만 닫기 → 안전하게 처리
        if (location.pathname.startsWith("/mail/compose")) {
          navigate(-1);
        }
      }
    };
    if (isWriteModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isWriteModalOpen, location.pathname, navigate]);

  return (
    <div className="mailBoxLayout-wrapper">
      {/* 모달 조건부 렌더링 */}
      {isWriteModalOpen && (
        <>
          <div className="modal-overlay" />
          <div className="modal-wrapper" ref={modalRef}>
            {/* 모달 내부 내용 */}
            <MailWriteModal />
          </div>
        </>
      )}
      <MenuBar />
      <div
        className={`mailBoxLayout-container ${
          isMenuBarOpen ? "menuBar-open" : ""
        }`}
      >
        <MailListHeader />
        <div className="mailBoxLayout-common">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default MailBoxLayout;
