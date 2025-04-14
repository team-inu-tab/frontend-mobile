import symbolLogo from "@assets/images/symbolLogo.svg";
import "@screens/css/landingScreen.css";
import landingAI from "@assets/icons/landingAI.svg";
import serviceStartButton from "@assets/icons/serviceStartButton.svg";
import function1 from "@assets/icons/function1.svg";
import function2 from "@assets/icons/function2.svg";
import function3 from "@assets/icons/function3.svg";
import functionState1 from "@assets/images/functionState1.svg";
import functionState2 from "@assets/images/functionState2.svg";
import functionState3 from "@assets/images/functionState3.svg";
import { useEffect } from "react";

function Landing() {
  useEffect(() => {
    // 컴포넌트가 마운트될 때 overflow를 auto로 변경
    document.body.style.overflow = "auto";

    // 컴포넌트가 언마운트될 때 overflow를 hidden으로 복원
    return () => {
      document.body.style.overflow = "hidden";
    };
  }, []);

  const handleLogin = () => {
    window.location.href =
      "http://maeilmail.co.kr/api/oauth2/authorization/google";
  };

  return (
    <div className="landingBackground">
      <img src={symbolLogo} className="landingSymbolLogo" />
      <p className="serviceText">Maeil, MAIL.</p>
      <img src={landingAI} className="landingAILogo"></img>
      <p className="introText">생성형 AI를 이용한 메일 자동 교정 서비스</p>

      <button className="serviceStartButton" onClick={handleLogin}>
        <img src={serviceStartButton} className='buttonImg'alt="서비스 시작하기" />
      </button>
  

      <p className="catchphraseShadow">Type less, let Tab do the rest.</p>
      <p className="catchphrase1">Type less, let Tab do the rest.</p>
      <p className="catchphrase2">타이핑은 최소로, 완성은 탭으로.</p>

      <div className="functionContainer">
        <p className="subState">Tab AI가 당신의 메일을 분석합니다.</p>
        <div className="function1Wrapper">
          <img src={function1} className="function1"></img>
          <p className="functionIntro1">Type</p>
          <img src={functionState1} className="funcState1"></img>
      </div>

        <div className="function2Wrapper">
          <img src={function2} className="function2"></img>
          <p className="functionIntro2">Tab AI</p>
          <img src={functionState2} className="funcState2"></img>
        </div>

        <div className="function3Wrapper">
          <img src={function3} className="function3"></img>
          <p className="functionIntro3">UX/UI</p>
          <img src={functionState3} className="funcState3"></img>
        </div>
      </div>
    </div>
  );
}

export default Landing;
