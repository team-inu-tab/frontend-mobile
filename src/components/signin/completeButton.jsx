import React, {props} from 'react';
import '@components/signin/css/completeButton.css';

function CompleteButton({ className, text, onClick }) {
    return <button className={`completeButton ${className}`} onClick={onClick}>
        { text }
        </button>;
}

export default CompleteButton;