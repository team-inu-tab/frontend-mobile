import axios from "axios";
import useAuthStore from "../store/useAuthStore";
// import toast from "react-hot-toast";

const BASE_URL = "https://maeilmail.co.kr/api";

let isRefreshing = false;
let refreshPromise = null;

// axios 인스턴스 생성
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// 요청 인터셉터 - accessToken 자동 추가
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
});

// // 인증 실패 시 처리
// const handleAuthFailure = () => {
//   toast.error("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
//   window.location.href = "/login";
// };

export const useMailApi = () => {
  // 엑세스 토큰 가져오기/호출
  const getToken = async () => {
    let token = useAuthStore.getState().accessToken;

    if (!token) {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = refresh().finally(() => {
          isRefreshing = false;
        });
      }

      try {
        await refreshPromise;
        token = useAuthStore.getState().accessToken;

        if (!token) {
          throw new Error("토큰 획득 실패");
        }
      } catch (err) {
        console.error("getToken 실패:", err);
        throw err;
      }
    }

    return token;
  };

  // 엑세스 토큰 발급
  const refresh = async () => {
    try {
      const res = await fetch(`${BASE_URL}/oauth2/reissue`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        const accessToken = res.headers.get("Authorization");
        if (accessToken) {
          useAuthStore.getState().setAccessToken(accessToken);
          console.log("accessToken 갱신 완료");
          return accessToken;
        } else {
          console.warn("Authorization 토큰 없음");
        }
      } else {
        const errorMsg = await res.text();
        console.error("리프레시 실패 응답:", errorMsg);
      }

      // handleAuthFailure();
      throw new Error("토큰 갱신 실패");
    } catch (error) {
      console.error("refresh 중 예외:", error);
      // handleAuthFailure();
      throw error;
    }
  };

  // 받은 메일함 조회
  const fetchReceiveMails = async () => {
    await getToken();
    const res = await api.get("/mails/receive");
    return res.data;
  };

  // 보낸 메일함 조회
  const fetchSentMails = async () => {
    await getToken();
    const res = await api.get("/mails/send");
    return res.data;
  };

  // 임시 보관 메일함 조회
  const fetchDraftMails = async () => {
    await getToken();
    const res = await api.get("/mails/draft");
    return res.data;
  };

  // 중요 메일함 조회
  const fetchImportantMails = async () => {
    await getToken();
    const res = await api.get("/mails/important");
    return res.data;
  };

  // 내게 쓴 메일함 조회
  const fetchSelfSentMails = async () => {
    await getToken();
    const res = await api.get("/mails/self");
    return res.data;
  };

  // 스팸 메일함 조회
  const fetchSpamMails = async () => {
    await getToken();
    const res = await api.get("/mails/spam");
    return res.data;
  };

  // 휴지통 메일함 조회
  const fetchDeletedMails = async () => {
    await getToken();
    const res = await api.get("/mails/trash");
    return res.data;
  };

  const getMimeType = (fileName) => {
    const ext = fileName.split(".").pop()?.toLowerCase();
    switch (ext) {
      case "pdf":
        return "application/pdf";
      case "xlsx":
        return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      case "xls":
        return "application/vnd.ms-excel";
      case "pptx":
        return "application/vnd.openxmlformats-officedocument.presentationml.presentation";
      case "ppt":
        return "application/vnd.ms-powerpoint";
      case "docx":
        return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
      case "doc":
        return "application/msword";
      case "png":
        return "image/png";
      case "jpg":
      case "jpeg":
        return "image/jpeg";
      case "txt":
        return "text/plain";
      default:
        return "application/octet-stream"; // fallback
    }
  };

  // 파일 상세 보기 - 첨부파일 다운로드
  const getFile = async ({ emailId, attachmentId, fileName }) => {
    await getToken();

    const res = await api.get(`/mails/${emailId}/file/${attachmentId}`, {
      responseType: "arraybuffer",
    });

    const mimeType = getMimeType(fileName);

    const blob = new Blob([res.data], { type: mimeType });
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  };

  // 스팸 차단
  const markAsSpam = async (mailId) => {
    await getToken();
    const res = await api.post(`/mails/spam/${mailId}`);
    return res.data;
  };

  // 스팸 해제
  const unmarkAsSpam = async (mailId) => {
    await getToken();
    const res = await api.delete(`/mails/spam/${mailId}`);
    return res.data;
  };

  // 메일 임시 삭제
  const deleteTemporaryMails = async (selectedMailIds) => {
    await getToken();
    const res = await api.delete("/mails/trash/temporary", {
      data: {
        selectedMailIds,
      },
    });
    return res.data;
  };

  // 메일 영구 삭제
  const deletePermanentMails = async (selectedMailIds) => {
    await getToken();
    const res = await api.delete("/mails/trash/permanent", {
      data: {
        selectedMailIds,
      },
    });
    return res.data;
  };

  // 특정 사용자와 주고받은 메일 조회
  const searchMailsByUserEmail = async (userEmail, pageToken = "") => {
    await getToken();
    const res = await api.post(
      `/mails/search/userEmail?pageToken=${pageToken}`,
      {
        userEmail,
      }
    );
    return res.data;
  };

  // 임시 메일 수정
  const updateDraftMail = async ({ draftId, toEmail, subject, body }) => {
    await getToken();
    const res = await api.patch("/mails/draft", {
      draftId,
      toEmail,
      subject,
      body,
    });
    return res.data;
  };

  // 지정된 메일 조회
  const getMailById = async (mailId) => {
    await getToken();
    const res = await api.get(`/mails/send/${mailId}`);
    return res.data;
  };

  // chatGPT AI
  const getChatGpt = async (message) => {
    await getToken();
    const res = await api.post("/api/gpt", {
      message,
    });
    return res.data;
  };

  // 임시 저장
  const updateTemporary = async ({ toEmail, subject, body }) => {
    await getToken();
    const res = await api.post("/mails/draft", {
      toEmail,
      subject,
      body,
    });
    return res.data;
  };

  // 로그아웃
  const logout = async () => {
    await getToken();
    const res = await api.post("/oauth2/logout");
    return res.data;
  };

  return {
    getToken,
    refresh,
    fetchReceiveMails,
    fetchSentMails,
    fetchDraftMails,
    fetchImportantMails,
    fetchSelfSentMails,
    fetchSpamMails,
    fetchDeletedMails,
    markAsSpam,
    unmarkAsSpam,
    getFile,
    deleteTemporaryMails,
    deletePermanentMails,
    searchMailsByUserEmail,
    updateDraftMail,
    getMailById,
    getChatGpt,
    updateTemporary,
    logout,
  };
};

export { api };
