import "@screens/css/settingScreen.css";
import "@components/mailBox/css/mailBoxLayout.css";
import MenuBar from "../components/menu/menuBar";
import { useMenuStore } from "../store";

const SettingScreen = () => {
  const isMenuBarOpen = useMenuStore((state) => state.isMenuBarOpen);

  return (
    <div className="mailBoxLayout-wrapper">
      <MenuBar />
      <div
        className={`mailBoxLayout-container ${
          isMenuBarOpen ? "menuBar-open" : ""
        }`}
      >
        <div className="mailBoxLayout-common">setting</div>
      </div>
    </div>
  );
};
export default SettingScreen;
