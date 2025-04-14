import "@screens/css/profileScreen.css";
import "@components/mailBox/css/mailBoxLayout.css";
import MenuBar from "../components/menu/menuBar";
import { useMenuStore } from "../store";

const ProfileScreen = () => {
  const isMenuBarOpen = useMenuStore((state) => state.isMenuBarOpen);

  return (
    <div className="mailBoxLayout-wrapper">
      <MenuBar />
      <div
        className={`mailBoxLayout-container ${
          isMenuBarOpen ? "menuBar-open" : ""
        }`}
      >
        <div className="mailBoxLayout-common">profile</div>
      </div>
    </div>
  );
};
export default ProfileScreen;
