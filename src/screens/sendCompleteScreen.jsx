import { useEffect } from "react";
import sendComplete from "@assets/icons/sendComplete.svg";
import "@screens/css/sendCompleteScreen.css";
import { useNavigate } from "react-router-dom";
import { useWriteStore } from "../store/useWriteStore";

const SendComplete = () => {
  const navigate = useNavigate();
  const setWriteModalOpen = useWriteStore((state) => state.setWriteModalOpen);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWriteModalOpen(false);
      navigate(-1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [setWriteModalOpen, navigate]);

  return (
    <div className="completeBackground">
      <img src={sendComplete} className="sendCompleteIcon" alt="전송 완료" />
    </div>
  );
};

export default SendComplete;
