import "@screens/css/profile.css";
import { useMailApi } from "../hooks/useMailApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProfileScreen = () => {
  const { logout } = useMailApi();
  const navigate = useNavigate();

  const handleButtonClick = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("로그아웃 실패:", err);
      toast.error("로그아웃 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="ProfileScreen-container">
      <button className="ProfileScreen-button" onClick={handleButtonClick}>
        로그아웃
      </button>
    </div>
  );
};

export default ProfileScreen;
