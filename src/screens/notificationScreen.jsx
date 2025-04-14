//import "@screens/css/notificationScreen.css";
import "@components/mailBox/css/mailBoxLayout.css";
import MenuBar from "../components/menu/menuBar";
import { useMenuStore } from "../store";

const NotificationScreen = () => {
  const isMenuBarOpen = useMenuStore((state) => state.isMenuBarOpen);

  return (
    <div className="mailBoxLayout-wrapper">
      <MenuBar />
      <div
        className={`mailBoxLayout-container ${
          isMenuBarOpen ? "menuBar-open" : ""
        }`}
      >
        <div className="mailBoxLayout-common">notification</div>
      </div>
    </div>
  );
};
export default NotificationScreen;
