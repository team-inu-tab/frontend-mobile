import React from 'react';
import '@components/common/css/mailContainer.css';

function MailContainer({ children }) {
  return (
    <div className="mail-container-wrapper">
      <div className="container-shadow"></div>
      <div className="mail-container">{children}</div>
    </div>
  );
}

export default MailContainer;
