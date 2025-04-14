import compSymbolLogo from "@assets/images/symbolLogo.svg";
import Circle from "@components/signin/circle.jsx";
import Container from "@components/signin/parentContainer.jsx";
import BackGround from "@assets/images/backGround.svg";
import Check from "@assets/images/sendCompCheck.svg";
import "@screens/css/addInfoComp.css";

function AddInfoComp() {
  return (
    <Container>
      <img src={BackGround} className="backGround" />
      <Circle className="formContainer">
        <img src={compSymbolLogo} className="compSymbolLogo" />
        <img src={Check} className="check" />
        <p className="compText">가입이 완료 되었습니다!</p>
      </Circle>
    </Container>
  );
}

export default AddInfoComp;
