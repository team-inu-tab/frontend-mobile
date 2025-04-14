import "@components/common/css/mailWritingContainer.css";

function WriteContainer({
  className,
  value,
  onChange,
  isAiOn,
  gptSuggestion,
  onKeyDown,
  htmlContent,
}) {
  return (
    <div className={`write-container-wrapper ${className}`}>
      <div className={`write-container-shadow ${className}`}></div>
      <div className={`write-container ${className}`}>
        {/* 사용자 입력 영역 */}
        <textarea
          className={`writeField ${className}`}
          placeholder="내용을 입력하세요."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
        />

        {/* AI 제안 영역 */}
        {isAiOn && gptSuggestion && (
          <div className="gptSuggestionBox">
            <p className="gptSuggestionText">{gptSuggestion}</p>
          </div>
        )}

        {/* 원문 HTML 렌더링 영역 */}
        {htmlContent.length > 0 && (
          <>
            <div
              className="writeField original-html"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default WriteContainer;
