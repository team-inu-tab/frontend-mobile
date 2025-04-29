import React from 'react';
import '@components/signin/css/circle.css';

function Circle({ children, className }) {
  return <div className={`circle ${className}`}>{children}</div>;
}

export default Circle;
