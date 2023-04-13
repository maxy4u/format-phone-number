import React, { useRef, useState, useLayoutEffect } from "react";

export default function App() {
  const [state, setState] = useState({ phone: "" });
  const cursorPos = useRef(null);
  const inputRef = useRef(null);
  const keyIsDelete = useRef(false);

  const handleChange = e => {
    cursorPos.current = e.target.selectionStart;
    let val = e.target.value;
    cursorPos.current -= (
      val.slice(0, cursorPos.current).match(/-/g) || []
    ).length;
    let r = /(\D+)/g,
      first3 = "",
      next3 = "",
      last4 = "";
    val = val.replace(r, "");
    let newValue;
    if (val.length > 0) {
      first3 = val.substr(0, 3);
      next3 = val.substr(3, 3);
      last4 = val.substr(6, 4);
      if (val.length > 6) {
        newValue = first3 + "-" + next3 + "-" + last4;
      } else if (val.length > 3) {
        newValue = first3 + "-" + next3;
      } else if (val.length < 4) {
        newValue = first3;
      }
    } else newValue = val;
    setState({ phone: newValue });
    for (let i = 0; i < cursorPos.current; ++i) {
      if (newValue[i] === "-") {
        ++cursorPos.current;
      }
    }
    if (newValue[cursorPos.current] === "-" && keyIsDelete.current) {
      cursorPos.current++;
    }
  };

  const handleKeyDown = e => {
    const allowedKeys = [
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Backspace",
      "Home",
      "End",
      "Enter",
      "Tab"
    ];
    if (e.key === "Delete") {
      keyIsDelete.current = true;
    } else {
      keyIsDelete.current = false;
    }
    if ("0123456789".includes(e.key) || allowedKeys.includes(e.key)) {
    } else {
      e.preventDefault();
    }
  };

  useLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.selectionStart = cursorPos.current;
      inputRef.current.selectionEnd = cursorPos.current;
    }
  });

  return (
    <div className="App">
      <input
        ref={inputRef}
        type="text"
        value={state.phone}
        placeholder="phone"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
