import "@components/menu/css/menuBar.css";
import SubMenu from "@components/menu/subMenu";
import MenuItem from "@components/menu/menuItem";
import { useMenuStore } from "@store";
import { forwardRef } from "react";

/**
 * MenuBar - 네비게이션 메뉴바 컴포넌트
 * @returns {JSX.Element} 메뉴바 UI
 */
const MenuBar = forwardRef((props, ref) => {
  const isMenuBarOpen = useMenuStore((state) => state.isMenuBarOpen);

  return (
    <div
      ref={ref}
      className={`menuBar-wrapper ${isMenuBarOpen ? "" : "menuBar-close"}`}
    >
      {/* 메뉴바 헤더 */}
      <div className={`menuBar-header ${isMenuBarOpen ? "" : "menuBar-close"}`}>
        {/* 로고 이미지 */}
        <img
          className="menuBar-logo"
          src="/src/assets/images/symbolLogo.svg"
          alt="Symbol Logo"
        />
      </div>
      {/* 메뉴 아이템 목록 컨테이너 */}
      <div
        className={`menuBar-menuContainer ${
          isMenuBarOpen ? "" : "menuBar-close"
        }`}
      >
        <MenuItem title="write" isMenuBarOpen={isMenuBarOpen} />
        <SubMenu isMenuBarOpen={isMenuBarOpen} />
        <MenuItem title="profile" isMenuBarOpen={isMenuBarOpen} />
      </div>
    </div>
  );
});

MenuBar.displayName = "MenuBar";

export default MenuBar;
