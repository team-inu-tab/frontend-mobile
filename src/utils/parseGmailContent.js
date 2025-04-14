import { api } from "@/hooks/useMailApi";
import DOMPurify from "dompurify";

/**
 * Gmail API로 받은 메일 content 구조를 HTML 문자열로 변환
 * 이미지가 본문에 포함된 경우 data:image 로 치환
 * 첨부파일은 별도 추출
 *
 * @param {Object} content - Gmail MIME 구조의 content
 * @param {string} messageId - 메일 메시지 ID (이미지 요청 시 필요)
 * @returns {Promise<{ html: string, attachments: Array }>}
 */
export const parseGmailContent = async (content, messageId) => {
  if (!content) return { html: "", attachments: [] };

  const parts = flattenParts(content);

  const htmlPart = parts.find((p) => p.mimeType === "text/html");
  const plainPart = parts.find((p) => p.mimeType === "text/plain");

  // HTML 또는 텍스트 기반 본문 추출
  let html = decodePartData(
    htmlPart?.body?.data || plainPart?.body?.data || ""
  );

  const cidMap = {};
  const attachments = [];

  for (const part of parts) {
    const cidHeader = part.headers?.find(
      (h) => h.name.toLowerCase() === "content-id"
    );
    const dispHeader = part.headers?.find(
      (h) => h.name.toLowerCase() === "content-disposition"
    );

    // 본문 이미지 (Content-ID 존재하고 inline으로 설정된 경우)
    if (cidHeader && dispHeader?.value?.includes("inline")) {
      const cid = cidHeader.value.replace(/[<>]/g, "");
      cidMap[cid] = part.body.attachmentId;
    }

    // 일반 첨부파일
    if (dispHeader?.value?.includes("attachment") && part.filename) {
      attachments.push({
        filename: part.filename,
        attachmentId: part.body.attachmentId,
      });
    }
  }

  // cid → data:image 치환
  for (const [cid, attachmentId] of Object.entries(cidMap)) {
    try {
      const res = await api.get(
        `/gmail/v1/users/me/messages/${messageId}/attachments/${attachmentId}`
      );
      const base64 = res.data.data;
      html = html.replace(
        new RegExp(`cid:${cid}`, "g"),
        `data:image/png;base64,${base64}`
      );
    } catch (e) {
      console.warn(`CID 이미지 치환 실패: ${cid}`, e);
    }
  }

  // DOMPurify를 이용해 XSS 보안 필터링
  const safeHtml = DOMPurify.sanitize(html);

  return { html: safeHtml, attachments };
};

// 내부 파트를 평탄화해서 배열로 반환
const flattenParts = (part) => {
  const result = [];
  const recurse = (p) => {
    if (p.parts) p.parts.forEach(recurse);
    else result.push(p);
  };
  recurse(part);
  return result;
};

// Base64 디코딩 유틸
const decodePartData = (data) => {
  try {
    if (!data) return "";
    const fixed = data.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = atob(fixed);
    const byteArray = new Uint8Array(decoded.length);
    for (let i = 0; i < decoded.length; i++) {
      byteArray[i] = decoded.charCodeAt(i);
    }
    return new TextDecoder("utf-8").decode(byteArray);
  } catch (e) {
    console.error("본문 디코딩 실패:", e);
    return "";
  }
};
