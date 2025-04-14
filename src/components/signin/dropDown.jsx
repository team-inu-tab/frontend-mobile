import React, { useState, useEffect, useRef } from "react";
import "@components/signin/css/dropDown.css";

export const DropDown = ({ data = ["초기값"], onSelect }) => {
  const selectRef = useRef(null);
  const [currentValue, setCurrentValue] = useState("직업을 선택 해주세요");
  const [showOptions, setShowOptions] = useState(false);

  const handleOnChangeSelectValue = (value) => {
    setCurrentValue(value);
    if (onSelect) {
      onSelect(value);
    }
    setShowOptions(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="select-box"
      onClick={() => setShowOptions((prev) => !prev)}
      ref={selectRef}
    >
      <label className="select-label">{currentValue}</label>
      <ul className={`select-options ${showOptions ? "show" : ""}`}>
        {data.map((item, index) => (
          <li
          key={index}
          className="option"
          onClick={(e) => {
            e.stopPropagation();
            handleOnChangeSelectValue(item)}}
        >
          {item}
        </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDown;