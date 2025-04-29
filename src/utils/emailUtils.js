import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);
dayjs.locale("ko");

/**
 * 이메일 수신/발신 날짜를 포맷하는 함수
 * - 오늘/어제 등 가까우면 상대 시간
 * - 멀면 날짜+시간 포맷
 * @param {string} isoDate - 예: "2025-02-24T19:30:00.622589"
 * @returns {string}
 */
export const formatRelativeDate = (isoDate) => {
  if (!isoDate) return "";

  const parsed = dayjs(isoDate);
  if (!parsed.isValid()) return "";

  const now = dayjs();
  const diffInDays = now.diff(parsed, "day");

  // 오늘, 어제, 2일 전까지는 상대 시간으로 표시
  if (diffInDays < 3) {
    return parsed.fromNow(); // ex: "5시간 전", "어제"
  }

  // 그 외는 날짜로 표시
  return parsed.format("YYYY.M.D");
};

/**
 * 이메일 수신/발신 날짜를 포맷하는 함수
 * @param {string} isoDate - 예: "2025-02-24T19:30:00.622589"
 * @returns {string} - 예: "2025.2.24 19:30"
 */
export const formatReceiveDate = (isoDate) => {
  if (!isoDate) return "";
  const parsed = dayjs(isoDate);
  if (!parsed.isValid()) return "";
  return parsed.format("YYYY.M.D H:mm");
};

/**
 * 수신자/발신자 문자열에서 이름만 추출하는 함수
 * @param {string} rawSender
 * @returns {string} 이름 부분만 추출된 문자열
 */
export const extractSenderName = (rawSender) => {
  if (!rawSender) return null;

  // "이름" <이메일> 형식
  if (/^".*"\s*<.*>$/.test(rawSender)) {
    return rawSender.replace(/^"(.*)"\s*<.*>$/, "$1").trim();
  }

  // 이름 <이메일> 형식
  if (/^.*<.*>$/.test(rawSender)) {
    return rawSender.replace(/^(.*?)\s*<.*>$/, "$1").trim();
  }

  // 그냥 이메일 또는 이름인 경우
  return rawSender.trim();
};

/**
 * 수신자/발신자 문자열에서 이메일 주소만 추출하는 함수
 * @param {string} rawSender
 * @returns {string | null} 추출된 이메일 주소
 */
export const extractEmailAddress = (rawSender) => {
  if (!rawSender) return null;

  const match = rawSender.match(/<([^>]+)>/);
  if (match && match[1]) {
    return match[1].trim();
  }

  // 꺾쇠 괄호가 없는 경우에도 이메일 형식이면 그대로 반환
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawSender.trim())) {
    return rawSender.trim();
  }

  return null;
};
