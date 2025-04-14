import React from 'react';
import '@components/signin/css/textInput.css';

function TextInputBottom({ className, placeholder }) {
    return <input className={`inputBottom ${className}`} placeholder={placeholder} />;
}

export default TextInputBottom;