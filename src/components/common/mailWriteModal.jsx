import { useState, useRef, useEffect } from "react";
import "@components/common/css/mailWriteModal.css";
import MailContainer from "@components/common/mailWriteContainer.jsx";
import ToggleSwitch from "@components/common/toggleSwitch.jsx";
import Link from "@assets/icons/link.svg";
import aiOnLogo from "@assets/icons/ai.svg";
import WriteContainer from "@components/common/mailWritingContainer.jsx";
import SendComplete from "@screens/sendCompleteScreen.jsx";
import Tagify from "@yaireo/tagify";
import "@yaireo/tagify/dist/tagify.css";
import { useMailApi } from "@hooks/useMailApi.js";
import { api } from "@hooks/useMailApi";
import { useLocation, useParams } from "react-router-dom";
import { parseGmailContent } from "../../utils/parseGmailContent";
import { extractEmailAddress } from "../../utils/emailUtils";
import toast from "react-hot-toast";
import aiApply from "@assets/icons/applyAiReference.svg";

function MailWriteModal() {
  const [isAiOn, setIsAiOn] = useState(false);
  const [mailTitle, setMailTitle] = useState("");
  const [recieverTitle, setRecieverTitle] = useState("");
  const [mailBody, setMailBody] = useState("");
  const [gptSuggestion, setGptSuggestion] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showComplete, setShowComplete] = useState(false);
  const [decodedBody, setDecodedBody] = useState("");
  const [isToMeChecked, setisToMeChecked] = useState(false);

  const gptTimer = useRef(null);
  const tagifyInputRef = useRef(null);
  const fileInputRef = useRef(null);
  const tagifyInstanceRef = useRef(null);

  const { mailId } = useParams();
  const location = useLocation();
  const mode = new URLSearchParams(location.search).get("mode");

  const { getToken, refresh, getMailById, updateTemporary, getChatGpt, getUserEmail } =
    useMailApi();

  const handleIsToMe = (e) => {
    setisToMeChecked(e.target.checked)
  };

  // 답장/전달 모드인 경우 기존 메일 정보 가져오기
  useEffect(() => {
    if (!mailId) return;

    const fetchMailDetail = async () => {
      try {
        const res = await getMailById(mailId);

        // content 파싱 및 이미지 포함 본문, 첨부파일 렌더링
        if (res?.content) {
          const { html } = await parseGmailContent(res.content, res.id);
          setDecodedBody(html);
        }

        // 답장
        if (mode === "reply") {
          setMailTitle(`RE: ${res.title}`);
          const senderEmail = extractEmailAddress(res.sender);
          setRecieverTitle(JSON.stringify([{ value: senderEmail }]));
        }

        // 전달
        if (mode === "forward") {
          setMailTitle(`FW: ${res.title}`);
          setRecieverTitle("");
        }

        // 임시 메일 수정
        if (mode === "draft") {
          setMailTitle(res.title);
          const senderEmail = extractEmailAddress(res.sender);
          setRecieverTitle(JSON.stringify([{ value: senderEmail }]));
        }
      } catch (err) {
        console.error("메일 로딩 실패:", err);
      }
    };

    fetchMailDetail();
  }, [mailId, mode]);

  useEffect(() => {
    if (tagifyInputRef.current) {
      tagifyInstanceRef.current = new Tagify(tagifyInputRef.current, {});

      tagifyInstanceRef.current.on("change", (e) => {
        setRecieverTitle(e.detail.value);
      });
    }
    return () => {
      if (tagifyInstanceRef.current) {
        tagifyInstanceRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    const tagifyInst = tagifyInstanceRef.current;
    if (!tagifyInst) return;

    if (isToMeChecked) {
      tagifyInst.removeAllTags();
  
      api
        .get("/users/info/email")
        .then((res) => {
          tagifyInst.addTags(res.data.email);
        })
        .catch((err) => {
          console.error("내게 쓰기 이메일 로드 실패:", err);
       });

    } else {
      tagifyInst.removeAllTags();
    }
  }, [isToMeChecked]);

  // ESC 키로 AI 기능 끄기
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        setIsAiOn(false);
      }
    };
    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  // 자동 임시 저장 (1분 주기)
  useEffect(() => {
    const interval = setInterval(() => {
      try {
        const saveDraft = async () => {
          const parsedToEmail = JSON.parse(recieverTitle || "[]");
          const toEmail = parsedToEmail.map((item) => item.value).join(",");

          if (!toEmail) return;

          await updateTemporary({
            toEmail,
            subject: mailTitle,
            body: mailBody,
          });

          console.log("test: 1분 간격 임시 저장 완료");
        };

        saveDraft();
      } catch (err) {
        console.error("test: 임시 저장 실패:", err);
      }
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, [mailTitle, mailBody, recieverTitle]);

  // GPT 자동 제안 호출
  useEffect(() => {
    if (!isAiOn) return;

    if (gptTimer.current) {
      clearTimeout(gptTimer.current);
    }

    if (mailBody.trim() === "") {
      setGptSuggestion("");
      return;
    }

    gptTimer.current = setTimeout(async () => {
      try {
        const result = await getChatGpt(mailBody);
        console.log(result);
        setGptSuggestion(result);
      } catch (err) {
        console.error("GPT 호출 실패:", err);
      }
    }, 3000);
    //
    return () => {
      clearTimeout(gptTimer.current);
    };
  }, [mailBody, isAiOn]);

  // Tab 키로 GPT 제안 적용
  const handleKeyDown = (e) => {
    if (e.key === "Tab" && isAiOn && gptSuggestion) {
      e.preventDefault();
      setMailBody(gptSuggestion);
      setGptSuggestion("");
    }
  };

  // 파일 선택
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // 메일 전송
  const sendMail = async () => {
    const formData = new FormData();

    const mergedBody = `
  ${mailBody}
  
  <br/><br/>
  <!-- 원문 메일 -->
  ${decodedBody || ""}
  `;

    let mailData = {
      toEmail: JSON.parse(recieverTitle),
      subject: mailTitle,
      body: mailBody,
    };

    if (decodedBody.length > 0 && ["reply", "forward"].includes(mode)) {
      mailData = {
        toEmail: JSON.parse(recieverTitle),
        subject: mailTitle,
        body: mergedBody,
      };
    }

    formData.append(
      "data",
      new Blob([JSON.stringify(mailData)], { type: "application/json" }),
      "data.json"
    );

    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      await getToken();
      const res = await api.post("mails/send", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        toast.success("메일 전송 성공");
        setShowComplete(true);
      }
    } catch (error) {
      console.error("메일 전송 중 오류 발생:", error);
      if (error.response?.status === 401) {
        try {
          await refresh();
          const retryRes = await api.post("mails/send", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (retryRes.status === 200) {
            toast.success("메일 전송 성공");
            setShowComplete(true);
          }
        } catch (retryError) {
          console.error("메일 전송 재시도 실패:", retryError);
          toast.error("메일 전송에 실패했습니다. 다시 시도해주세요.");
        }
      } else {
        toast.error("메일 전송에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  if (showComplete) {
    return <SendComplete />;
  }

  return (
    <>
      {gptSuggestion !== "" && <img src={aiApply} className="aiApplyToast"/>}
      {/* 제목 입력 */}
      <input
      className="mailTitle"
      placeholder="제목을 입력하세요."
      value={mailTitle}
      onChange={(e) => setMailTitle(e.target.value)}
      />

      {/* 받는 사람 */}
      <div className="infoContainer">
        <div className="recieverContainer">
          <div className="recieverTitleWrapper">
            <span className="recieverLabel">받는사람</span>
            <input ref={tagifyInputRef} className="recieverTitle" />
            <input
             type="checkbox" 
             className="isToMe" 
             checked={isToMeChecked} 
             onChange={handleIsToMe}/>
            <span className="toMeText">내게 쓰기</span>
          </div>
        </div>

        <div className="attachedContainer" onClick={() => fileInputRef.current.click()}>
          <input
          type="file"
          id="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
          />
          <img
            src={Link}
            className="attatchedIcon"
            alt="link icon"
          />
          <p className="attachedLabel">
            {selectedFile ? selectedFile.name : "DROP HERE!"}
          </p>
        </div>
      </div>
      
      <div className="aiContainer">
          {isAiOn && <img src={aiOnLogo} className="aiOnLogo" alt="ai on logo" />}
          <span className={`aiText ${isAiOn ? "on" : ""}`}>TabAI</span>
          <ToggleSwitch
          className="aiToggleSwitch"
          checked={isAiOn}
          onChange={() => setIsAiOn(!isAiOn)}
          />
      </div>

      <WriteContainer
        className={isAiOn ? "writeContainer on" : "writeContainer"}
        value={mailBody}
        onChange={setMailBody}
        htmlContent={decodedBody}
        onKeyDown={handleKeyDown}
        isAiOn={isAiOn}
        gptSuggestion={gptSuggestion}
      />

      <div className="buttonContainer">
        <button className="reservationButton">예약하기</button>
        <button
          className="sendButton"
          onClick={() => {
          sendMail();
          }}
        >
          전송하기
        </button>
      </div>
    </>
  );
}

export default MailWriteModal;
