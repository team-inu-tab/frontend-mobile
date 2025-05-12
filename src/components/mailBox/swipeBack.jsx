import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const SwipeBack = ({ children }) => {
  const navigate = useNavigate();
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  };

  const handleTouchEnd = (e) => {
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartX.current;
    const deltaY = touch.clientY - touchStartY.current;

    if (Math.abs(deltaX) > 70 && Math.abs(deltaY) < 50 && deltaX > 0) {
      navigate(-1);
    }
  };

  return (
    <div
      style={{ width: "100%", height: "100%" }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {children}
    </div>
  );
};

export default SwipeBack;
