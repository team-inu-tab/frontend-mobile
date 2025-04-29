// 각 메일함 타입별 표시할 툴바 버튼 정의
export const MAIL_TOOLBAR_CONFIG = {
  receive: ["reply", "forward", "markSpam"],
  sent: ["reply", "forward"],
  important: ["reply", "forward", "markSpam"],
  deleted: ["restore", "deletePermanent", "markSpam"],
  scheduled: ["forward", "cancelSend", "reschedule"],
  selfsent: ["forward", "edit"],
  spam: ["deletePermanent", "unmarkSpam"],
};

// 버튼 키와 실제 JSX 반환 로직 매핑
const TOOLBAR_ACTIONS = {
  reply: (actions, selectedMail) => (
    <button onClick={actions.handleReply} disabled={!selectedMail}>
      답장
    </button>
  ),
  forward: (actions, selectedMail) => (
    <button onClick={actions.handleForward} disabled={!selectedMail}>
      전달
    </button>
  ),
  markSpam: (actions) => (
    <button onClick={actions.handleMarkSpam}>스팸차단</button>
  ),
  unmarkSpam: (actions) => (
    <button onClick={actions.handleUnmarkSpam}>스팸해제</button>
  ),
  deletePermanent: (actions) => (
    <button onClick={actions.handleDeletePermanent}>영구삭제</button>
  ),
  restore: () => <button>복원</button>,
  cancelSend: () => <button>보내기취소</button>,
  reschedule: () => <button>시간변경</button>,
  edit: () => <button>수정</button>,
};

/**
 * 메일함 경로(pathname)를 기준으로 boxType, 메일 목록, 정렬 옵션 여부, 툴바 구성 등을 반환하는 설정 함수
 */
export const getMailBoxConfig = ({
  pathname,
  stores,
  actions,
  selectedMail,
}) => {
  const {
    receiveMails,
    sentMails,
    draftMails,
    importantMails,
    deletedMails,
    scheduledMails,
    selfSentMails,
    spamMails,
  } = stores;

  const {
    handleReply,
    handleForward,
    handleMarkSpam,
    handleUnmarkSpam,
    handleDeletePermanent,
  } = actions;

  const pathToTypeMap = {
    receive: receiveMails,
    sent: sentMails,
    draft: draftMails,
    important: importantMails,
    deleted: deletedMails,
    scheduled: scheduledMails,
    selfsent: selfSentMails,
    spam: spamMails,
  };

  const boxType = Object.keys(pathToTypeMap).find((key) =>
    pathname.match(new RegExp(`/mail/${key}(/|$)`))
  );

  const mails = pathToTypeMap[boxType] || [];
  const toolbarKeys = MAIL_TOOLBAR_CONFIG[boxType] || [];

  const mailTools = (
    <>
      {toolbarKeys.map((key) =>
        TOOLBAR_ACTIONS[key]
          ? TOOLBAR_ACTIONS[key](
              {
                handleReply,
                handleForward,
                handleMarkSpam,
                handleUnmarkSpam,
                handleDeletePermanent,
              },
              selectedMail
            )
          : null
      )}
    </>
  );

  return {
    boxType: boxType || "",
    mails,
    isSortOption: boxType === "receive" || boxType === "sent",
    mailTools,
  };
};
