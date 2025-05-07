import React from 'react';
import '@components/common/css/aiLoding.css';
import generateImg from "@assets/icons/ai.svg";

function AiLoding({ className }) {
  return (
    <div className={`aiLoadingContainer ${className}`}>
        <div className="lodingWrapper">
            <img src={generateImg} className='aiLodingLogo'/>
            <span className="loadingText1">G</span>
            <span className="loadingText2">e</span>
            <span className="loadingText3">n</span>
            <span className="loadingText4">e</span>
            <span className="loadingText5">r</span>
            <span className="loadingText6">a</span>
            <span className="loadingText7">t</span>
            <span className="loadingText8">i</span>
            <span className="loadingText9">n</span>
            <span className="loadingText10">g</span>
        </div>
    </div>
  );
}

export default AiLoding;