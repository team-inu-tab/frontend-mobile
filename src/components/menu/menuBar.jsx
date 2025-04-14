import "@components/menu/css/menuBar.css";
import SubMenu from "@components/menu/subMenu";
import MenuItem from "@components/menu/menuItem";
import { useMenuStore } from "@store";

/**
 * MenuBar - 네비게이션 메뉴바 컴포넌트
 * @returns {JSX.Element} 메뉴바 UI
 */
const MenuBar = () => {
  const isMenuBarOpen = useMenuStore((state) => state.isMenuBarOpen);
  const toggleMenuBar = useMenuStore((state) => state.toggleMenuBar);

  return (
    <div className={`menuBar-wrapper ${isMenuBarOpen ? "" : "menuBar-close"}`}>
      {/* 메뉴바 헤더 */}
      <div
        className={`menuBar-header ${isMenuBarOpen ? "" : "menuBar-close"}`}
        onClick={toggleMenuBar}
      >
        {/* 로고 이미지 */}
        <img
          className="menuBar-logo"
          src="/src/assets/images/symbolLogo.svg"
          alt="Symbol Logo"
        />
        {/* 메뉴바 열림/닫힘 화살표 */}
        <img
          className={`menuBar-arrow ${isMenuBarOpen ? "" : "menuBar-close"}`}
          src="/src/assets/icons/arrow.svg"
          alt="Arrow Icon"
        />
      </div>
      {/* "메뉴" 텍스트 */}
      <span className={`menuBar-text ${isMenuBarOpen ? "" : "menuBar-close"}`}>
        메뉴
      </span>
      {/* 메뉴 아이템 목록 컨테이너 */}
      <div
        className={`menuBar-menuContainer ${
          isMenuBarOpen ? "" : "menuBar-close"
        }`}
      >
        <MenuItem title="write" isMenuBarOpen={isMenuBarOpen} />
        <SubMenu isMenuBarOpen={isMenuBarOpen} />
        <MenuItem title="notification" isMenuBarOpen={isMenuBarOpen} />
        <MenuItem title="profile" isMenuBarOpen={isMenuBarOpen} />
        <MenuItem title="settings" isMenuBarOpen={isMenuBarOpen} />
      </div>
    </div>
  );
};

export default MenuBar;
