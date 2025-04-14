import React, {props, useState} from "react";
import "@components/common/css/textEditor.css";
import editorOpen from "@assets/icons/textEditorArrow.svg";
function TextEditor({className}) {
    const [isEditorClick, setIsEditorClick] = useState(false);
    
    return (
        <>
            <button className={`textEditorContainer ${className}`}>
                <img src={editorOpen} className="editorOpenIcon"></img>
                <text className="textEditorMenu">TextEditor</text>
            </button>
        </>
    )
}

export default TextEditor;