import { useState } from "react";
import "@css/signin.css";
import symbolLogo from "@assets/images/symbolLogo.svg";
import Circle from "@components/signin/circle.jsx";
import Container from "@components/signin/parentContainer.jsx";
import CompleteButton from "@components/signin/completeButton.jsx";
import InputLine from "@assets/images/inputLine.svg";
import backGround from "@assets/images/backGround.svg";
import { useNavigate } from "react-router-dom";
import { useMailApi } from "@hooks/useMailApi.js";
import { api } from "@hooks/useMailApi";
import { use } from "react";

function Signin() {
  const [schoolName, setSchoolName] = useState("");
  const [department, setDepartment] = useState("");
  const [studentNum, setStudentNum] = useState("");
  const [studentName, setStudentName] = useState("");
  const [studentGrade, setStudentGrade] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [studentNumError, setStudentNumError] = useState("");

  const navigation = useNavigate();
  const { getToken, refresh } = useMailApi();

  const handleSubmit = async () => {
    try {
      await getToken();
      const payload = {
        studentName: studentName,
        schoolName: schoolName,
        studentDepartment: department,
        studentNum: Number(studentNum),
        studentGrade: studentGrade,
        phoneNumber: phoneNumber,
      };
      const res = await api.post("/users/info/student", payload);
      console.log("학교 정보 저장 완료:", res.data);
      navigation("/mail/receive");
    } 
    catch (error) {
      console.error("정보 전송 실패:", error);
      if (error.response?.status === 401) {
        try {
          await refresh();
          const retryRes = await api.post("/users/info/student", payload);
          if (retryRes.status === 200) {
            console.log("학교 정보 저장 완료:", retryRes.data);
            navigation("/mail/receive");
          }
        } catch (retryError) {
          console.error("정보 전송 재시도 실패:", retryError);
          alert("정보 전송에 실패했습니다. 다시 시도해주세요.");
        }
      } else {
        alert("정보 전송에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value;
    
    if (value.length < phoneNumber.length) {
      setPhoneNumber(value);
      return;
    }
    
    value = value.replace(/-/g, '');
    
    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    if (value.length > 3 && value.length <= 7) {
      value = value.slice(0, 3) + '-' + value.slice(3);
    } else if (value.length > 7) {
      value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7, 11);
    }

    setPhoneNumber(value);
  };

  const handleGradeChange = (e) => {
    let value = e.target.value;
    
    if (value.length < studentGrade.length) {
      setStudentGrade("");
      return;
    }
    
    value = value.replace(/학년$/, '');
    
    value = value.replace(/[^0-9]/g, '');
    
    if (value.length > 1) {
      value = value.slice(0, 1);
    }
    
    if (value) {
      value += '학년';
    }
    
    setStudentGrade(value);
  };

  const handleStudentNumChange = (e) => {
    let value = e.target.value;
    
    value = value.replace(/[^0-9]/g, '');
    
    if (value.length > 9) {
      value = value.slice(0, 9);
    }
    
    setStudentNum(value);
    
    if (value.length !== 9) {
      setStudentNumError("학번 9자리 모두 입력 해주세요.");
    } else {
      setStudentNumError("");
    }
  };

  const isFormComplete =
    studentName.trim() !== "" &&
    schoolName.trim() !== "" &&
    department.trim() !== "" &&
    studentNum.length === 9 &&
    studentGrade.trim() !== "" &&
    phoneNumber.trim() !== "" &&
    /^010-\d{4}-\d{4}$/.test(phoneNumber);

  return (
    <Container>
      <img src={backGround} className="backGround" />
      <Circle className="formContainer">
        <img src={symbolLogo} className="symbolLogo" />

        <span className="namePlaceHolder">이름</span>
        <input
          className="nameInput"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        ></input>
        <img src={InputLine} className="inputLine1"></img>
        <span className="schoolPlaceHolder">학교</span>
        <input
          className="affiliationInput"
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
        ></input>

        <span className="departmentPlaceHolder">학과</span>
        <img src={InputLine} className="inputLine2"></img>
        <input
          className="departmentInput"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        ></input>
        <span className="studentNumPlaceHolder">학번</span>
        <input
            className="studentNumInput"
            value={studentNum}
            onChange={handleStudentNumChange}
        ></input>
        {studentNumError && <div className="studentNumError">{studentNumError}</div>}

        <span className="gradePlaceHolder">학년</span>
        <input
          className="gradeInput"
          value={studentGrade}
          onChange={handleGradeChange}
        ></input>
        <img src={InputLine} className="inputLine3"></img>
        <span className="phoneNumPlaceHolder">연락처</span>
        <input
          className="phoneNumInput"
          value={phoneNumber}
          onChange={handlePhoneChange}
        ></input>

        <CompleteButton
          className="addInfoCompleteButton"
          text="입력완료"
          onClick={handleSubmit}
          disabled={!isFormComplete}
        ></CompleteButton>
      </Circle>
    </Container>
  );
}

export default Signin;