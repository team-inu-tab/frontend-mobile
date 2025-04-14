import React from 'react';
import '@components/signin/css/textInput.css';
import InputLine from '@assets/images/inputLine.svg';

function TextInputTop({ className, placeholder }) {
    return <input className={`inputTop ${className}`} placeholder={placeholder} />;
}

export default TextInputTop;
